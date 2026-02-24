// Revenue Forecasting Tool - Main JavaScript
class RevenueForecastingTool {
    constructor() {
        this.chart = null;
        this.currentData = null;
        this.scenarios = this.loadScenarios();
        
        this.initializeEventListeners();
        this.initializeTooltips();
        this.loadScenarioOptions();
        this.updateSensitivityLabels();
    }

    initializeEventListeners() {
        // Main calculation button
        document.getElementById('calculateBtn').addEventListener('click', () => this.calculateForecast());

        // Sensitivity sliders
        document.getElementById('priceSensitivity').addEventListener('input', (e) => {
            this.updateSensitivityLabels();
            this.calculateForecast();
        });

        document.getElementById('volumeSensitivity').addEventListener('input', (e) => {
            this.updateSensitivityLabels();
            this.calculateForecast();
        });

        // Real-time calculation on input changes
        const inputs = ['unitPrice', 'monthlyQuantity', 'unitCost', 'fixedCosts', 'monthlyGrowth', 'forecastMonths'];
        inputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.debounce(() => this.calculateForecast(), 500)();
            });
        });

        // Scenario management
        document.getElementById('saveScenario').addEventListener('click', () => this.showSaveModal());
        document.getElementById('loadScenario').addEventListener('click', () => this.loadSelectedScenario());
        document.getElementById('scenarioSelect').addEventListener('change', (e) => {
            if (e.target.value) this.loadScenario(e.target.value);
        });

        // Modal controls
        document.getElementById('confirmSave').addEventListener('click', () => this.saveScenario());
        document.getElementById('cancelSave').addEventListener('click', () => this.hideSaveModal());

        // Export functions
        document.getElementById('exportPDF').addEventListener('click', () => this.exportToPDF());
        document.getElementById('exportCSV').addEventListener('click', () => this.exportToCSV());
        document.getElementById('copyResults').addEventListener('click', () => this.copyToClipboard());

        // Modal background click
        document.getElementById('saveModal').addEventListener('click', (e) => {
            if (e.target.id === 'saveModal') this.hideSaveModal();
        });

        // Initial calculation
        this.calculateForecast();
    }

    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        const triggers = document.querySelectorAll('.tooltip-trigger');

        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => {
                const text = e.target.getAttribute('data-tooltip');
                tooltip.textContent = text;
                tooltip.classList.add('show');
                this.positionTooltip(e, tooltip);
            });

            trigger.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            trigger.addEventListener('mousemove', (e) => {
                this.positionTooltip(e, tooltip);
            });
        });
    }

    positionTooltip(e, tooltip) {
        const rect = tooltip.getBoundingClientRect();
        const x = e.clientX + 10;
        const y = e.clientY - rect.height - 10;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    updateSensitivityLabels() {
        const priceAdj = document.getElementById('priceSensitivity').value;
        const volumeAdj = document.getElementById('volumeSensitivity').value;
        
        document.getElementById('priceAdjustmentValue').textContent = `${priceAdj}%`;
        document.getElementById('volumeAdjustmentValue').textContent = `${volumeAdj}%`;
    }

    getInputValues() {
        const priceAdj = parseFloat(document.getElementById('priceSensitivity').value) / 100;
        const volumeAdj = parseFloat(document.getElementById('volumeSensitivity').value) / 100;

        return {
            unitPrice: parseFloat(document.getElementById('unitPrice').value) * (1 + priceAdj),
            monthlyQuantity: parseFloat(document.getElementById('monthlyQuantity').value) * (1 + volumeAdj),
            unitCost: parseFloat(document.getElementById('unitCost').value),
            fixedCosts: parseFloat(document.getElementById('fixedCosts').value),
            monthlyGrowth: parseFloat(document.getElementById('monthlyGrowth').value) / 100,
            forecastMonths: parseInt(document.getElementById('forecastMonths').value)
        };
    }

    calculateForecast() {
        const inputs = this.getInputValues();
        
        // Validate inputs
        if (Object.values(inputs).some(val => isNaN(val) || val < 0)) {
            this.showError('Please enter valid positive numbers for all fields.');
            return;
        }

        const monthlyData = [];
        let cumulativeProfit = 0;
        let breakevenMonth = null;

        for (let month = 1; month <= inputs.forecastMonths; month++) {
            const quantity = Math.round(inputs.monthlyQuantity * Math.pow(1 + inputs.monthlyGrowth, month - 1));
            const revenue = quantity * inputs.unitPrice;
            const variableCosts = quantity * inputs.unitCost;
            const totalCosts = variableCosts + inputs.fixedCosts;
            const profit = revenue - totalCosts;
            
            cumulativeProfit += profit;
            
            if (breakevenMonth === null && cumulativeProfit > 0) {
                breakevenMonth = month;
            }

            monthlyData.push({
                month,
                quantity,
                revenue,
                variableCosts,
                fixedCosts: inputs.fixedCosts,
                totalCosts,
                profit,
                cumulativeProfit
            });
        }

        this.currentData = {
            inputs,
            monthlyData,
            breakevenMonth
        };

        this.updateResults();
        this.updateChart();
        this.updateTable();
        this.generateAISummary();
    }

    updateResults() {
        const { monthlyData, breakevenMonth } = this.currentData;
        
        const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
        const totalProfit = monthlyData.reduce((sum, month) => sum + month.profit, 0);
        const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

        // Update metric cards
        document.getElementById('annualRevenue').textContent = this.formatCurrency(totalRevenue);
        
        const profitElement = document.getElementById('annualProfit');
        profitElement.textContent = this.formatCurrency(totalProfit);
        profitElement.className = `metric-value ${totalProfit >= 0 ? 'positive' : 'negative'}`;

        document.getElementById('breakevenMonth').textContent = breakevenMonth ? `Month ${breakevenMonth}` : 'Never';
        document.getElementById('profitMargin').textContent = `${profitMargin.toFixed(1)}%`;

        // Update profit card styling
        const profitCard = document.querySelector('.metric-card.profit');
        profitCard.className = `metric-card profit ${totalProfit < 0 ? 'negative' : ''}`;
    }

    updateChart() {
        const ctx = document.getElementById('forecastChart').getContext('2d');
        const { monthlyData } = this.currentData;

        const labels = monthlyData.map(d => `Month ${d.month}`);
        const revenueData = monthlyData.map(d => d.revenue);
        const profitData = monthlyData.map(d => d.profit);
        const cumulativeProfitData = monthlyData.map(d => d.cumulativeProfit);

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Monthly Revenue',
                        data: revenueData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Monthly Profit',
                        data: profitData,
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Cumulative Profit',
                        data: cumulativeProfitData,
                        borderColor: '#9b59b6',
                        backgroundColor: 'rgba(155, 89, 182, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenue & Profit Forecast',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '£' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    updateTable() {
        const tbody = document.getElementById('dataTableBody');
        const { monthlyData } = this.currentData;

        tbody.innerHTML = monthlyData.map(data => `
            <tr>
                <td>Month ${data.month}</td>
                <td>${data.quantity.toLocaleString()}</td>
                <td>${this.formatCurrency(data.revenue)}</td>
                <td>${this.formatCurrency(data.variableCosts)}</td>
                <td>${this.formatCurrency(data.fixedCosts)}</td>
                <td>${this.formatCurrency(data.totalCosts)}</td>
                <td class="${data.profit >= 0 ? 'profit-positive' : 'profit-negative'}">
                    ${this.formatCurrency(data.profit)}
                </td>
                <td class="${data.cumulativeProfit >= 0 ? 'profit-positive' : 'profit-negative'}">
                    ${this.formatCurrency(data.cumulativeProfit)}
                </td>
            </tr>
        `).join('');
    }

    generateAISummary() {
        const { inputs, monthlyData, breakevenMonth } = this.currentData;
        
        const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
        const totalProfit = monthlyData.reduce((sum, month) => sum + month.profit, 0);
        const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
        const finalMonthProfit = monthlyData[monthlyData.length - 1].profit;
        const growthRate = inputs.monthlyGrowth * 100;

        let summary = `<div class="fade-in">`;
        
        // Business overview
        summary += `Based on your business model, you're selling <span class="summary-highlight">${inputs.monthlyQuantity} units per month</span> at <span class="summary-highlight">£${inputs.unitPrice}</span> each, with a <span class="summary-highlight">${growthRate}%</span> monthly growth rate. `;

        // Profitability analysis
        if (totalProfit > 0) {
            summary += `<strong>Good news!</strong> Your business is profitable with <span class="summary-highlight">£${this.formatNumber(totalProfit)}</span> in total profit over ${inputs.forecastMonths} months. `;
        } else {
            summary += `<strong>Attention needed:</strong> Your business shows a loss of <span class="summary-highlight">£${this.formatNumber(Math.abs(totalProfit))}</span> over ${inputs.forecastMonths} months. `;
        }

        // Break-even analysis
        if (breakevenMonth) {
            summary += `You'll break even in <span class="summary-highlight">month ${breakevenMonth}</span>, which is ${breakevenMonth <= 6 ? 'excellent' : breakevenMonth <= 12 ? 'reasonable' : 'concerning'}. `;
        } else {
            summary += `<strong>Warning:</strong> You won't break even within the ${inputs.forecastMonths}-month forecast period. Consider reducing costs or increasing prices. `;
        }

        // Profit margin analysis
        if (profitMargin > 20) {
            summary += `Your profit margin of <span class="summary-highlight">${profitMargin.toFixed(1)}%</span> is excellent and indicates a healthy business model. `;
        } else if (profitMargin > 10) {
            summary += `Your profit margin of <span class="summary-highlight">${profitMargin.toFixed(1)}%</span> is decent but could be improved. `;
        } else if (profitMargin > 0) {
            summary += `Your profit margin of <span class="summary-highlight">${profitMargin.toFixed(1)}%</span> is low. Consider optimizing costs or pricing. `;
        } else {
            summary += `Your negative profit margin of <span class="summary-highlight">${profitMargin.toFixed(1)}%</span> indicates fundamental issues with the business model. `;
        }

        // Growth trajectory
        if (finalMonthProfit > monthlyData[0].profit) {
            summary += `The growth trajectory is positive, with monthly profit increasing from <span class="summary-highlight">£${this.formatNumber(monthlyData[0].profit)}</span> to <span class="summary-highlight">£${this.formatNumber(finalMonthProfit)}</span>. `;
        }

        // Recommendations
        summary += `<br><br><strong>Key Recommendations:</strong> `;
        const recommendations = [];

        if (profitMargin < 15) {
            recommendations.push("Focus on cost optimization or price increases");
        }
        if (breakevenMonth > 12) {
            recommendations.push("Accelerate customer acquisition");
        }
        if (inputs.fixedCosts > totalRevenue * 0.3) {
            recommendations.push("Review fixed cost structure");
        }
        if (growthRate < 5) {
            recommendations.push("Develop stronger growth strategies");
        }

        if (recommendations.length > 0) {
            summary += recommendations.join(", ") + ".";
        } else {
            summary += "Your business model looks solid. Focus on execution and monitoring key metrics.";
        }

        summary += `</div>`;

        document.getElementById('aiSummaryContent').innerHTML = summary;
    }

    // Scenario Management
    showSaveModal() {
        document.getElementById('saveModal').classList.add('show');
        document.getElementById('scenarioName').focus();
    }

    hideSaveModal() {
        document.getElementById('saveModal').classList.remove('show');
        document.getElementById('scenarioName').value = '';
    }

    saveScenario() {
        const name = document.getElementById('scenarioName').value.trim();
        if (!name) {
            alert('Please enter a scenario name.');
            return;
        }

        const scenario = {
            name,
            inputs: this.getInputValues(),
            timestamp: new Date().toISOString()
        };

        this.scenarios[name] = scenario;
        localStorage.setItem('revenueScenarios', JSON.stringify(this.scenarios));
        this.loadScenarioOptions();
        this.hideSaveModal();
        
        this.showNotification(`Scenario "${name}" saved successfully!`);
    }

    loadScenario(name) {
        const scenario = this.scenarios[name];
        if (!scenario) return;

        // Reset sensitivity sliders
        document.getElementById('priceSensitivity').value = 0;
        document.getElementById('volumeSensitivity').value = 0;
        this.updateSensitivityLabels();

        // Load input values
        Object.keys(scenario.inputs).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = scenario.inputs[key];
            }
        });

        this.calculateForecast();
        this.showNotification(`Scenario "${name}" loaded successfully!`);
    }

    loadSelectedScenario() {
        const select = document.getElementById('scenarioSelect');
        if (select.value) {
            this.loadScenario(select.value);
        }
    }

    loadScenarios() {
        const stored = localStorage.getItem('revenueScenarios');
        if (!stored) return {};
        try { return JSON.parse(stored); }
        catch (e) { console.warn('Failed to parse saved scenarios'); return {}; }
    }

    loadScenarioOptions() {
        const select = document.getElementById('scenarioSelect');
        select.innerHTML = '<option value="">Select scenario...</option>';
        
        Object.keys(this.scenarios).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
    }

    // Export Functions
    exportToCSV() {
        if (!this.currentData) {
            this.showError('Please calculate forecast first.');
            return;
        }

        const { monthlyData } = this.currentData;
        const headers = ['Month', 'Quantity', 'Revenue', 'Variable Costs', 'Fixed Costs', 'Total Costs', 'Profit', 'Cumulative Profit'];
        
        let csv = headers.join(',') + '\n';
        csv += monthlyData.map(data => [
            `Month ${data.month}`,
            data.quantity,
            data.revenue.toFixed(2),
            data.variableCosts.toFixed(2),
            data.fixedCosts.toFixed(2),
            data.totalCosts.toFixed(2),
            data.profit.toFixed(2),
            data.cumulativeProfit.toFixed(2)
        ].join(',')).join('\n');

        this.downloadFile(csv, 'revenue-forecast.csv', 'text/csv');
    }

    exportToPDF() {
        // Simplified PDF export - in a real app, you'd use a library like jsPDF
        const summary = document.getElementById('aiSummaryContent').textContent;
        const content = `Revenue Forecast Summary\n\n${summary}\n\nGenerated on: ${new Date().toLocaleDateString()}`;
        
        this.downloadFile(content, 'revenue-forecast.txt', 'text/plain');
        this.showNotification('Summary exported as text file. For PDF, consider using a PDF library.');
    }

    copyToClipboard() {
        if (!this.currentData) {
            this.showError('Please calculate forecast first.');
            return;
        }

        const summary = document.getElementById('aiSummaryContent').textContent;
        const { monthlyData } = this.currentData;
        const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
        const totalProfit = monthlyData.reduce((sum, month) => sum + month.profit, 0);

        const content = `Revenue Forecast Summary

${summary}

Key Metrics:
- Annual Revenue: ${this.formatCurrency(totalRevenue)}
- Annual Profit: ${this.formatCurrency(totalProfit)}
- Break-even: ${this.currentData.breakevenMonth ? `Month ${this.currentData.breakevenMonth}` : 'Never'}

Generated on: ${new Date().toLocaleDateString()}`;

        navigator.clipboard.writeText(content).then(() => {
            this.showNotification('Results copied to clipboard!');
        }).catch(() => {
            this.showError('Failed to copy to clipboard.');
        });
    }

    // Utility Functions
    formatCurrency(amount) {
        return '£' + Math.abs(amount).toLocaleString('en-GB', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    formatNumber(number) {
        return Math.abs(number).toLocaleString('en-GB', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showNotification(message) {
        // Simple notification - in a real app, you might use a toast library
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RevenueForecastingTool();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
