class RevenueForecastingTool {
    constructor() {
        this.chart = null;
        this.currentModel = 'agency';
        this.currentScenario = 'expected';
        this.forecastMonths = 24;
        this.currencies = {
            'USD': { symbol: '$', locale: 'en-US' },
            'EUR': { symbol: '€', locale: 'de-DE' },
            'GBP': { symbol: '£', locale: 'en-GB' },
            'JPY': { symbol: '¥', locale: 'ja-JP' },
            'AUD': { symbol: '$', locale: 'en-AU' }
        };
        this.modelConfigs = this.getModelConfigs();
        this.initializeEventListeners();
        this.setupBusinessModel();
    }

    getModelConfigs() {
        return {
            product: {
                name: 'Product-Based Business',
                inputs: [
                    { id: 'unitPrice', label: 'Price per Unit', type: 'number', default: { expected: 100, optimistic: 120, pessimistic: 80 }, tooltip: 'The selling price for each unit of your product' },
                    { id: 'unitsSold', label: 'Monthly Units Sold', type: 'number', default: { expected: 100, optimistic: 150, pessimistic: 50 }, tooltip: 'Expected number of units sold per month' },
                    { id: 'cogs', label: 'Cost of Goods Sold (per unit)', type: 'number', default: { expected: 40, optimistic: 35, pessimistic: 45 }, tooltip: 'Direct costs to produce one unit' },
                    { id: 'fixedCosts', label: 'Monthly Fixed Costs', type: 'number', default: { expected: 2000, optimistic: 1800, pessimistic: 2500 }, tooltip: 'Regular monthly expenses (rent, salaries, etc.)' },
                    { id: 'growthRate', label: 'Monthly Growth Rate (%)', type: 'number', default: { expected: 10, optimistic: 15, pessimistic: 5 }, tooltip: 'Expected monthly growth in sales' }
                ]
            },
            saas: {
                name: 'SaaS / Subscription',
                inputs: [
                    { id: 'mrr', label: 'Monthly Recurring Revenue', type: 'number', default: { expected: 10000, optimistic: 15000, pessimistic: 5000 }, tooltip: 'Current monthly recurring revenue' },
                    { id: 'churnRate', label: 'Monthly Churn Rate (%)', type: 'number', default: { expected: 5, optimistic: 3, pessimistic: 8 }, tooltip: 'Percentage of customers who cancel each month' },
                    { id: 'cac', label: 'Customer Acquisition Cost', type: 'number', default: { expected: 500, optimistic: 400, pessimistic: 700 }, tooltip: 'Cost to acquire one new customer' },
                    { id: 'growthRate', label: 'Monthly Growth Rate (%)', type: 'number', default: { expected: 15, optimistic: 20, pessimistic: 8 }, tooltip: 'Expected monthly growth in new customers' }
                ]
            },
            services: {
                name: 'Professional Services',
                inputs: [
                    { id: 'hourlyRate', label: 'Hourly Rate', type: 'number', default: { expected: 150, optimistic: 200, pessimistic: 100 }, tooltip: 'Your hourly billing rate' },
                    { id: 'billableHours', label: 'Monthly Billable Hours', type: 'number', default: { expected: 120, optimistic: 140, pessimistic: 80 }, tooltip: 'Number of billable hours per month' },
                    { id: 'utilization', label: 'Utilization Rate (%)', type: 'number', default: { expected: 70, optimistic: 80, pessimistic: 50 }, tooltip: 'Percentage of time that is billable' },
                    { id: 'overhead', label: 'Monthly Overhead', type: 'number', default: { expected: 3000, optimistic: 2500, pessimistic: 4000 }, tooltip: 'Fixed monthly expenses' }
                ]
            },
            agency: {
                name: 'Agency / Consulting',
                inputs: [
                    { id: 'retainers', label: 'Number of Retainers', type: 'number', default: { expected: 5, optimistic: 8, pessimistic: 3 }, tooltip: 'Number of ongoing retainer clients' },
                    { id: 'avgRetainerValue', label: 'Average Retainer Value', type: 'number', default: { expected: 5000, optimistic: 7000, pessimistic: 3000 }, tooltip: 'Average monthly revenue per retainer' },
                    { id: 'projectsPerMonth', label: 'Projects per Month', type: 'number', default: { expected: 2, optimistic: 3, pessimistic: 1 }, tooltip: 'Number of one-time projects per month' },
                    { id: 'avgProjectValue', label: 'Average Project Value', type: 'number', default: { expected: 10000, optimistic: 15000, pessimistic: 7000 }, tooltip: 'Average revenue per project' },
                    { id: 'teamCosts', label: 'Monthly Team Costs', type: 'number', default: { expected: 20000, optimistic: 18000, pessimistic: 22000 }, tooltip: 'Total monthly costs for team and operations' }
                ]
            },
            marketplace: {
                name: 'Marketplace / Platform',
                inputs: [
                    { id: 'transactions', label: 'Monthly Transactions', type: 'number', default: { expected: 1000, optimistic: 1500, pessimistic: 500 }, tooltip: 'Number of transactions per month' },
                    { id: 'avgTransactionValue', label: 'Average Transaction Value', type: 'number', default: { expected: 100, optimistic: 150, pessimistic: 75 }, tooltip: 'Average value per transaction' },
                    { id: 'takerate', label: 'Take Rate (%)', type: 'number', default: { expected: 15, optimistic: 20, pessimistic: 10 }, tooltip: 'Your percentage fee from each transaction' },
                    { id: 'platformCosts', label: 'Monthly Platform Costs', type: 'number', default: { expected: 5000, optimistic: 4500, pessimistic: 6000 }, tooltip: 'Fixed costs to run the platform' },
                    { id: 'growthRate', label: 'Monthly Growth Rate (%)', type: 'number', default: { expected: 20, optimistic: 30, pessimistic: 10 }, tooltip: 'Expected monthly growth in transactions' }
                ]
            },
            ecommerce: {
                name: 'E-commerce / Retail',
                inputs: [
                    { id: 'avgOrderValue', label: 'Average Order Value', type: 'number', default: { expected: 75, optimistic: 100, pessimistic: 50 }, tooltip: 'Average amount customers spend per order' },
                    { id: 'ordersPerMonth', label: 'Orders per Month', type: 'number', default: { expected: 500, optimistic: 750, pessimistic: 300 }, tooltip: 'Number of orders received monthly' },
                    { id: 'productMargin', label: 'Product Margin (%)', type: 'number', default: { expected: 40, optimistic: 50, pessimistic: 30 }, tooltip: 'Gross profit margin on products' },
                    { id: 'marketingCostPerOrder', label: 'Marketing Cost per Order', type: 'number', default: { expected: 15, optimistic: 12, pessimistic: 20 }, tooltip: 'Customer acquisition cost per order' },
                    { id: 'fulfillmentCosts', label: 'Monthly Fulfillment Costs', type: 'number', default: { expected: 3000, optimistic: 2500, pessimistic: 4000 }, tooltip: 'Shipping, packaging, and warehouse costs' },
                    { id: 'returnRate', label: 'Return Rate (%)', type: 'number', default: { expected: 8, optimistic: 5, pessimistic: 12 }, tooltip: 'Percentage of orders returned' }
                ]
            },
            subscription_box: {
                name: 'Subscription Box',
                inputs: [
                    { id: 'boxPrice', label: 'Box Price per Month', type: 'number', default: { expected: 30, optimistic: 40, pessimistic: 25 }, tooltip: 'Monthly subscription price' },
                    { id: 'costPerBox', label: 'Cost per Box (COGS)', type: 'number', default: { expected: 12, optimistic: 10, pessimistic: 15 }, tooltip: 'Cost of goods sold per box' },
                    { id: 'subscriberCount', label: 'Current Subscribers', type: 'number', default: { expected: 1000, optimistic: 1500, pessimistic: 500 }, tooltip: 'Number of active subscribers' },
                    { id: 'churnRate', label: 'Monthly Churn Rate (%)', type: 'number', default: { expected: 8, optimistic: 5, pessimistic: 12 }, tooltip: 'Percentage of subscribers who cancel monthly' },
                    { id: 'shippingCost', label: 'Shipping Cost per Box', type: 'number', default: { expected: 5, optimistic: 4, pessimistic: 7 }, tooltip: 'Shipping and handling per box' },
                    { id: 'acquisitionCost', label: 'Customer Acquisition Cost', type: 'number', default: { expected: 25, optimistic: 20, pessimistic: 35 }, tooltip: 'Cost to acquire one new subscriber' }
                ]
            },
            real_estate: {
                name: 'Real Estate / Property',
                inputs: [
                    { id: 'propertyCount', label: 'Number of Properties', type: 'number', default: { expected: 5, optimistic: 8, pessimistic: 3 }, tooltip: 'Total rental properties owned' },
                    { id: 'avgRentalIncome', label: 'Average Monthly Rent', type: 'number', default: { expected: 1500, optimistic: 2000, pessimistic: 1200 }, tooltip: 'Average rent per property per month' },
                    { id: 'occupancyRate', label: 'Occupancy Rate (%)', type: 'number', default: { expected: 90, optimistic: 95, pessimistic: 80 }, tooltip: 'Percentage of time properties are occupied' },
                    { id: 'managementFees', label: 'Property Management Fees (%)', type: 'number', default: { expected: 8, optimistic: 6, pessimistic: 10 }, tooltip: 'Management company fees as % of rent' },
                    { id: 'maintenanceCosts', label: 'Monthly Maintenance per Property', type: 'number', default: { expected: 200, optimistic: 150, pessimistic: 300 }, tooltip: 'Average monthly maintenance cost per property' },
                    { id: 'mortgagePayments', label: 'Total Monthly Mortgage Payments', type: 'number', default: { expected: 4000, optimistic: 3500, pessimistic: 5000 }, tooltip: 'Combined mortgage payments for all properties' }
                ]
            },
            education: {
                name: 'Education / Courses',
                inputs: [
                    { id: 'coursePrice', label: 'Course Price', type: 'number', default: { expected: 497, optimistic: 697, pessimistic: 297 }, tooltip: 'Price per course or program' },
                    { id: 'studentsPerMonth', label: 'New Students per Month', type: 'number', default: { expected: 50, optimistic: 80, pessimistic: 25 }, tooltip: 'Number of new enrollments monthly' },
                    { id: 'courseCreationCost', label: 'Course Creation Cost (Monthly)', type: 'number', default: { expected: 2000, optimistic: 1500, pessimistic: 3000 }, tooltip: 'Monthly cost to create and update content' },
                    { id: 'marketingCostPerStudent', label: 'Marketing Cost per Student', type: 'number', default: { expected: 75, optimistic: 60, pessimistic: 100 }, tooltip: 'Customer acquisition cost per student' },
                    { id: 'platformFees', label: 'Platform Fees (%)', type: 'number', default: { expected: 10, optimistic: 8, pessimistic: 15 }, tooltip: 'Course platform fees as percentage of revenue' },
                    { id: 'supportCosts', label: 'Monthly Support Costs', type: 'number', default: { expected: 1500, optimistic: 1200, pessimistic: 2000 }, tooltip: 'Student support and customer service costs' }
                ]
            },
            franchise: {
                name: 'Franchise Business',
                inputs: [
                    { id: 'locationCount', label: 'Number of Locations', type: 'number', default: { expected: 3, optimistic: 5, pessimistic: 2 }, tooltip: 'Total franchise locations owned' },
                    { id: 'avgRevenuePerLocation', label: 'Average Revenue per Location', type: 'number', default: { expected: 25000, optimistic: 35000, pessimistic: 18000 }, tooltip: 'Monthly revenue per franchise location' },
                    { id: 'franchiseFees', label: 'Franchise Fees (%)', type: 'number', default: { expected: 6, optimistic: 5, pessimistic: 8 }, tooltip: 'Ongoing franchise fees as % of revenue' },
                    { id: 'royaltyPayments', label: 'Royalty Payments (%)', type: 'number', default: { expected: 4, optimistic: 3, pessimistic: 5 }, tooltip: 'Royalty payments to franchisor' },
                    { id: 'staffCostsPerLocation', label: 'Staff Costs per Location', type: 'number', default: { expected: 8000, optimistic: 7000, pessimistic: 10000 }, tooltip: 'Monthly staff costs per location' },
                    { id: 'marketingContribution', label: 'Marketing Fund Contribution (%)', type: 'number', default: { expected: 2, optimistic: 1.5, pessimistic: 3 }, tooltip: 'Marketing fund contribution as % of revenue' }
                ]
            },
            software_dev: {
                name: 'Software Development Agency',
                inputs: [
                    { id: 'developerRate', label: 'Average Developer Rate', type: 'number', default: { expected: 100, optimistic: 125, pessimistic: 80 }, tooltip: 'Average hourly rate for developers' },
                    { id: 'teamSize', label: 'Team Size', type: 'number', default: { expected: 8, optimistic: 12, pessimistic: 5 }, tooltip: 'Number of developers on team' },
                    { id: 'utilizationRate', label: 'Utilization Rate (%)', type: 'number', default: { expected: 75, optimistic: 85, pessimistic: 60 }, tooltip: 'Percentage of time team is billable' },
                    { id: 'projectSuccessRate', label: 'Project Success Rate (%)', type: 'number', default: { expected: 85, optimistic: 95, pessimistic: 70 }, tooltip: 'Percentage of projects completed successfully' },
                    { id: 'operatingExpenses', label: 'Monthly Operating Expenses', type: 'number', default: { expected: 15000, optimistic: 12000, pessimistic: 20000 }, tooltip: 'Office, tools, and administrative costs' },
                    { id: 'toolLicenseCosts', label: 'Tool & License Costs', type: 'number', default: { expected: 2000, optimistic: 1500, pessimistic: 3000 }, tooltip: 'Software licenses and development tools' }
                ]
            },
            content_media: {
                name: 'Content Creation / Media',
                inputs: [
                    { id: 'adRevenuePerView', label: 'Ad Revenue per 1000 Views', type: 'number', default: { expected: 3, optimistic: 5, pessimistic: 1.5 }, tooltip: 'Revenue per thousand views from ads' },
                    { id: 'monthlyViews', label: 'Monthly Views (thousands)', type: 'number', default: { expected: 500, optimistic: 1000, pessimistic: 200 }, tooltip: 'Total monthly views in thousands' },
                    { id: 'sponsorshipIncome', label: 'Monthly Sponsorship Income', type: 'number', default: { expected: 5000, optimistic: 10000, pessimistic: 2000 }, tooltip: 'Revenue from sponsored content' },
                    { id: 'contentProductionCost', label: 'Content Production Costs', type: 'number', default: { expected: 3000, optimistic: 2500, pessimistic: 4000 }, tooltip: 'Monthly cost to produce content' },
                    { id: 'teamCosts', label: 'Team & Equipment Costs', type: 'number', default: { expected: 4000, optimistic: 3000, pessimistic: 6000 }, tooltip: 'Team salaries and equipment costs' },
                    { id: 'platformRevShare', label: 'Platform Revenue Share (%)', type: 'number', default: { expected: 30, optimistic: 25, pessimistic: 40 }, tooltip: 'Platform takes this % of ad revenue' }
                ]
            },
            healthcare: {
                name: 'Healthcare Practice',
                inputs: [
                    { id: 'patientsPerDay', label: 'Patients per Day', type: 'number', default: { expected: 20, optimistic: 30, pessimistic: 12 }, tooltip: 'Average number of patient visits per day' },
                    { id: 'avgRevenuePerVisit', label: 'Average Revenue per Visit', type: 'number', default: { expected: 200, optimistic: 300, pessimistic: 150 }, tooltip: 'Average revenue per patient visit' },
                    { id: 'workingDaysPerMonth', label: 'Working Days per Month', type: 'number', default: { expected: 22, optimistic: 24, pessimistic: 18 }, tooltip: 'Number of working days in a month' },
                    { id: 'insuranceReimbursement', label: 'Insurance Reimbursement Rate (%)', type: 'number', default: { expected: 80, optimistic: 90, pessimistic: 70 }, tooltip: 'Percentage of revenue covered by insurance' },
                    { id: 'staffCosts', label: 'Monthly Staff Costs', type: 'number', default: { expected: 25000, optimistic: 22000, pessimistic: 30000 }, tooltip: 'Salaries for nurses, assistants, admin staff' },
                    { id: 'equipmentSupplies', label: 'Equipment & Supplies', type: 'number', default: { expected: 3000, optimistic: 2500, pessimistic: 4000 }, tooltip: 'Monthly cost for medical supplies and equipment' },
                    { id: 'malpracticeInsurance', label: 'Malpractice Insurance', type: 'number', default: { expected: 2000, optimistic: 1500, pessimistic: 3000 }, tooltip: 'Monthly malpractice insurance cost' }
                ]
            }
        };
    }

    initializeEventListeners() {
        document.getElementById('businessModel').addEventListener('change', e => {
            this.currentModel = e.target.value;
            this.setupBusinessModel();
            this.calculate();
        });
        ['expected', 'optimistic', 'pessimistic'].forEach(scenario => {
            document.getElementById(`${scenario}Btn`).addEventListener('click', () => this.setScenario(scenario));
        });
        document.getElementById('currencySelect').addEventListener('change', () => this.calculate());
        document.getElementById('calculateBtn').addEventListener('click', () => this.calculate());
        document.getElementById('exportDropdown').addEventListener('change', (e) => this.handleExport(e.target.value));
    }

    setScenario(scenario) {
        this.currentScenario = scenario;
        ['expected', 'optimistic', 'pessimistic'].forEach(s => {
            const btn = document.getElementById(`${s}Btn`);
            btn.className = `flex-1 py-2 px-4 rounded-lg ${s === scenario ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`;
        });
        this.setupBusinessModel();
        this.calculate();
    }

    setupBusinessModel() {
        const form = document.getElementById('inputForm');
        const config = this.modelConfigs[this.currentModel];
        
        form.innerHTML = config.inputs.map(input => `
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="${input.id}">
                    ${input.label}
                    <i class="fas fa-info-circle ml-1 text-gray-500 cursor-help" title="${input.tooltip || input.label}"></i>
                </label>
                <input type="${input.type}" id="${input.id}" class="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                       value="${input.default[this.currentScenario]}" step="0.01" min="0">
            </div>
        `).join('');
        
        // Trigger initial calculation
        setTimeout(() => this.calculate(), 100);
    }

    calculate() {
        try {
            console.log('Calculate function called');
            const config = this.modelConfigs[this.currentModel];
            const inputs = {};
            
            // Get input values with error checking
            config.inputs.forEach(input => {
                const element = document.getElementById(input.id);
                if (element) {
                    inputs[input.id] = parseFloat(element.value) || 0;
                } else {
                    console.warn(`Element ${input.id} not found`);
                }
            });
            
            console.log('Inputs:', inputs);
            
            const monthlyData = this.calculateMonthlyData(inputs);
            console.log('Monthly data:', monthlyData);
            
            this.updateKPIs(monthlyData);
            this.updateChart(monthlyData);
            this.updateTable(monthlyData);
        } catch (error) {
            console.error('Error in calculate function:', error);
        }
    }

    calculateMonthlyData(inputs) {
        return Array.from({ length: this.forecastMonths }, (_, i) => {
            const month = i + 1;
            let revenue = 0, costs = 0;

            switch (this.currentModel) {
                case 'product':
                    const units = inputs.unitsSold * Math.pow(1 + inputs.growthRate/100, month-1);
                    revenue = units * inputs.unitPrice;
                    costs = (units * inputs.cogs) + inputs.fixedCosts;
                    break;
                case 'saas':
                    const customers = inputs.mrr / 100 * Math.pow(1 + inputs.growthRate/100, month-1);
                    revenue = customers * 100;
                    costs = (customers * inputs.cac / 12) + (customers * inputs.churnRate/100 * inputs.cac);
                    break;
                case 'services':
                    revenue = inputs.hourlyRate * inputs.billableHours * (inputs.utilization/100);
                    costs = inputs.overhead;
                    break;
                case 'agency':
                    revenue = (inputs.retainers * inputs.avgRetainerValue) + 
                             (inputs.projectsPerMonth * inputs.avgProjectValue);
                    costs = inputs.teamCosts;
                    break;
                case 'marketplace':
                    const transactions = inputs.transactions * Math.pow(1 + inputs.growthRate/100, month-1);
                    revenue = transactions * inputs.avgTransactionValue * (inputs.takerate/100);
                    costs = inputs.platformCosts;
                    break;
                case 'ecommerce':
                    const orders = inputs.ordersPerMonth;
                    const grossRevenue = orders * inputs.avgOrderValue;
                    const returnLoss = grossRevenue * (inputs.returnRate/100);
                    revenue = grossRevenue - returnLoss;
                    const cogs = grossRevenue * (1 - inputs.productMargin/100);
                    const marketingCosts = orders * inputs.marketingCostPerOrder;
                    costs = cogs + marketingCosts + inputs.fulfillmentCosts;
                    break;
                case 'subscription_box':
                    const activeSubscribers = inputs.subscriberCount * Math.pow(1 - inputs.churnRate/100, month-1);
                    revenue = activeSubscribers * inputs.boxPrice;
                    const boxCosts = activeSubscribers * inputs.costPerBox;
                    const shippingCosts = activeSubscribers * inputs.shippingCost;
                    const acquisitionCosts = (inputs.subscriberCount * inputs.churnRate/100) * inputs.acquisitionCost;
                    costs = boxCosts + shippingCosts + acquisitionCosts;
                    break;
                case 'real_estate':
                    const totalRent = inputs.propertyCount * inputs.avgRentalIncome;
                    revenue = totalRent * (inputs.occupancyRate/100);
                    const managementFees = revenue * (inputs.managementFees/100);
                    const maintenance = inputs.propertyCount * inputs.maintenanceCosts;
                    costs = managementFees + maintenance + inputs.mortgagePayments;
                    break;
                case 'education':
                    const grossRevenue2 = inputs.studentsPerMonth * inputs.coursePrice;
                    revenue = grossRevenue2 * (1 - inputs.platformFees/100);
                    const marketingCosts2 = inputs.studentsPerMonth * inputs.marketingCostPerStudent;
                    costs = inputs.courseCreationCost + marketingCosts2 + inputs.supportCosts;
                    break;
                case 'franchise':
                    const totalLocationRevenue = inputs.locationCount * inputs.avgRevenuePerLocation;
                    const franchiseFees = totalLocationRevenue * (inputs.franchiseFees/100);
                    const royalties = totalLocationRevenue * (inputs.royaltyPayments/100);
                    const marketingFees = totalLocationRevenue * (inputs.marketingContribution/100);
                    revenue = totalLocationRevenue;
                    const totalStaffCosts = inputs.locationCount * inputs.staffCostsPerLocation;
                    costs = franchiseFees + royalties + marketingFees + totalStaffCosts;
                    break;
                case 'software_dev':
                    const totalHours = inputs.teamSize * 160 * (inputs.utilizationRate/100); // 160 hours per month per developer
                    const grossRevenue3 = totalHours * inputs.developerRate;
                    revenue = grossRevenue3 * (inputs.projectSuccessRate/100);
                    costs = inputs.operatingExpenses + inputs.toolLicenseCosts;
                    break;
                case 'content_media':
                    const adRevenue = (inputs.monthlyViews * inputs.adRevenuePerView / 1000) * (1 - inputs.platformRevShare/100);
                    revenue = adRevenue + inputs.sponsorshipIncome;
                    costs = inputs.contentProductionCost + inputs.teamCosts;
                    break;
                case 'healthcare':
                    const totalPatients = inputs.patientsPerDay * inputs.workingDaysPerMonth;
                    const grossRevenue4 = totalPatients * inputs.avgRevenuePerVisit;
                    revenue = grossRevenue4 * (inputs.insuranceReimbursement/100);
                    costs = inputs.staffCosts + inputs.equipmentSupplies + inputs.malpracticeInsurance;
                    break;
            }
            
            const profit = revenue - costs;
            return {
                month,
                revenue,
                costs,
                profit,
                margin: revenue > 0 ? (profit / revenue) * 100 : 0
            };
        });
    }

    updateKPIs(data) {
        const annualRevenue = data.reduce((sum, m) => sum + m.revenue, 0);
        const totalProfit = data.reduce((sum, m) => sum + m.profit, 0);
        const avgMargin = data.reduce((sum, m) => sum + m.margin, 0) / data.length;
        const breakEven = data.findIndex(m => m.profit > 0) + 1;

        document.getElementById('annualRevenue').textContent = this.formatCurrency(annualRevenue);
        document.getElementById('netProfit').textContent = this.formatCurrency(totalProfit);
        document.getElementById('grossMargin').textContent = `${avgMargin.toFixed(1)}%`;
        document.getElementById('breakEven').textContent = breakEven > 0 ? `Month ${breakEven}` : 'N/A';

        // Show/hide SaaS-specific KPIs
        const saasKPIs = document.getElementById('saasKPIs');
        if (this.currentModel === 'saas') {
            this.updateSaaSKPIs(data);
            saasKPIs.classList.remove('hidden');
        } else {
            saasKPIs.classList.add('hidden');
        }
    }

    updateSaaSKPIs(data) {
        if (this.currentModel !== 'saas') return;

        const config = this.modelConfigs[this.currentModel];
        const inputs = {};
        config.inputs.forEach(input => {
            const element = document.getElementById(input.id);
            if (element) {
                inputs[input.id] = parseFloat(element.value) || 0;
            }
        });

        // Calculate SaaS-specific metrics
        const avgChurnRate = inputs.churnRate || 0;
        const customerAcquisitionCost = inputs.cac || 0;
        
        // Customer LTV calculation: Average revenue per customer / churn rate
        // Assuming average customer pays $100/month (this is a simplified calculation)
        const mrrPerCustomer = 100; // This could be made configurable
        const customerLTV = avgChurnRate > 0 ? (mrrPerCustomer / (avgChurnRate / 100)) : 0;
        
        // LTV:CAC Ratio
        const ltvCacRatio = customerAcquisitionCost > 0 ? (customerLTV / customerAcquisitionCost) : 0;
        
        // Payback period (months to recover CAC)
        const paybackPeriod = mrrPerCustomer > 0 ? (customerAcquisitionCost / mrrPerCustomer) : 0;

        // Update SaaS KPI displays
        document.getElementById('avgChurnRate').textContent = `${avgChurnRate.toFixed(1)}%`;
        document.getElementById('customerLTV').textContent = this.formatCurrency(customerLTV);
        document.getElementById('ltvCacRatio').textContent = `${ltvCacRatio.toFixed(1)}:1`;
        document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;
    }

    updateChart(data) {
        try {
            const canvas = document.getElementById('forecastChart');
            if (!canvas) {
                console.error('Chart canvas not found');
                return;
            }
            
            if (this.chart) {
                this.chart.destroy();
            }
            
            this.chart = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: data.map(d => `Month ${d.month}`),
                datasets: [
                    {
                        label: 'Revenue',
                        data: data.map(d => d.revenue),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Costs',
                        data: data.map(d => d.costs),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Profit',
                        data: data.map(d => d.profit),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
        } catch (error) {
            console.error('Error updating chart:', error);
        }
    }

    updateTable(data) {
        document.getElementById('monthlyTable').getElementsByTagName('tbody')[0].innerHTML = 
            data.map(d => `
                <tr>
                    <td class="px-4 py-2">Month ${d.month}</td>
                    <td class="px-4 py-2">${this.formatCurrency(d.revenue)}</td>
                    <td class="px-4 py-2">${this.formatCurrency(d.costs)}</td>
                    <td class="px-4 py-2 ${d.profit >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${this.formatCurrency(d.profit)}
                    </td>
                    <td class="px-4 py-2">${d.margin.toFixed(1)}%</td>
                </tr>
            `).join('');
    }

    formatCurrency(amount) {
        const currencyCode = document.getElementById('currencySelect').value;
        const currency = this.currencies[currencyCode];
        
        // Handle special formatting for different currencies
        if (currencyCode === 'JPY') {
            return `¥${Math.round(amount).toLocaleString('ja-JP')}`;
        }
        
        return `${currency.symbol}${Math.round(amount).toLocaleString(currency.locale)}`;
    }

    handleExport(exportType) {
        if (!exportType) return;
        
        switch(exportType) {
            case 'pdf':
                this.exportPDF();
                break;
            case 'csv':
                this.exportCSV();
                break;
            case 'sheets':
                this.exportGoogleSheets();
                break;
            case 'word':
                this.exportWord();
                break;
            case 'txt':
                this.exportTXT();
                break;
        }
        
        // Reset dropdown to placeholder
        document.getElementById('exportDropdown').value = '';
    }

    exportPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('Revenue Forecast Report', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Business Model: ${this.modelConfigs[this.currentModel].name}`, 20, 35);
        doc.text(`Scenario: ${this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1)}`, 20, 45);
        
        ['annualRevenue', 'netProfit', 'grossMargin', 'breakEven'].forEach((id, i) => {
            doc.text(`${id.replace(/([A-Z])/g, ' $1').trim()}: ${document.getElementById(id).textContent}`, 20, 60 + i * 10);
        });
        
        doc.autoTable({
            html: '#monthlyTable',
            startY: 100,
            theme: 'grid',
            headStyles: { fillColor: [59, 130, 246] }
        });
        
        doc.setFontSize(10);
        const pageHeight = doc.internal.pageSize.height;
        doc.text('Need help refining your forecast?', 20, pageHeight - 30);
        doc.text('Book a free consultation at summvision.com', 20, pageHeight - 20);
        
        doc.save('revenue-forecast.pdf');
    }

    exportCSV() {
        const table = document.getElementById('monthlyTable');
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll('tbody tr'))
            .map(row => Array.from(row.querySelectorAll('td'))
                .map(td => `"${td.textContent}"`));
        
        const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'revenue-forecast.csv';
        link.click();
    }

    exportGoogleSheets() {
        // Create CSV data for Google Sheets import
        const table = document.getElementById('monthlyTable');
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll('tbody tr'))
            .map(row => Array.from(row.querySelectorAll('td'))
                .map(td => td.textContent.replace(/,/g, '')));
        
        // Add summary data
        const summaryData = [
            ['Revenue Forecast Summary'],
            [''],
            ['Business Model:', this.modelConfigs[this.currentModel].name],
            ['Scenario:', this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1)],
            ['Currency:', document.getElementById('currencySelect').value],
            [''],
            ['Key Metrics:'],
            ['Annual Revenue:', document.getElementById('annualRevenue').textContent],
            ['Net Profit:', document.getElementById('netProfit').textContent],
            ['Gross Margin:', document.getElementById('grossMargin').textContent],
            ['Break-even:', document.getElementById('breakEven').textContent],
            [''],
            ['Monthly Breakdown:'],
            headers,
            ...rows
        ];
        
        const csv = summaryData.map(row => Array.isArray(row) ? row.join(',') : row).join('\n');
        
        // Create blob and download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'revenue-forecast-for-sheets.csv';
        link.click();
        
        // Open Google Sheets
        setTimeout(() => {
            window.open('https://sheets.google.com/create', '_blank');
        }, 500);
        
        alert('CSV file downloaded! Open Google Sheets and use File > Import > Upload to import the downloaded file.');
    }

    exportWord() {
        // Create Word-compatible HTML content
        const modelName = this.modelConfigs[this.currentModel].name;
        const scenario = this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1);
        const currency = document.getElementById('currencySelect').value;
        
        // Get table data
        const table = document.getElementById('monthlyTable');
        const tableHTML = table.outerHTML;
        
        const wordContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Revenue Forecast Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .metric { background: white; padding: 15px; border: 1px solid #dee2e6; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #dee2e6; padding: 8px 12px; text-align: left; }
        th { background: #f8f9fa; font-weight: bold; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 0.9em; color: #6c757d; }
    </style>
</head>
<body>
    <h1>Revenue Forecast Report</h1>
    
    <div class="summary">
        <h2>Business Overview</h2>
        <p><strong>Business Model:</strong> ${modelName}</p>
        <p><strong>Scenario:</strong> ${scenario}</p>
        <p><strong>Currency:</strong> ${currency}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    <h2>Key Performance Metrics</h2>
    <div class="metrics">
        <div class="metric">
            <strong>Annual Revenue:</strong><br>
            ${document.getElementById('annualRevenue').textContent}
        </div>
        <div class="metric">
            <strong>Net Profit:</strong><br>
            ${document.getElementById('netProfit').textContent}
        </div>
        <div class="metric">
            <strong>Gross Margin:</strong><br>
            ${document.getElementById('grossMargin').textContent}
        </div>
        <div class="metric">
            <strong>Break-even Month:</strong><br>
            ${document.getElementById('breakEven').textContent}
        </div>
    </div>
    
    <h2>Monthly Financial Breakdown</h2>
    ${tableHTML}
    
    <div class="footer">
        <p><strong>Need help refining your forecast?</strong></p>
        <p>Book a free consultation with our experts at Summ Vision.</p>
        <p>Visit: www.summvision.com | Email: hello@summvision.com</p>
    </div>
</body>
</html>`;
        
        const blob = new Blob([wordContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'revenue-forecast.doc';
        link.click();
    }

    exportTXT() {
        const modelName = this.modelConfigs[this.currentModel].name;
        const scenario = this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1);
        const currency = document.getElementById('currencySelect').value;
        
        // Get table data
        const table = document.getElementById('monthlyTable');
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll('tbody tr'))
            .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));
        
        // Create formatted text content
        let txtContent = `REVENUE FORECAST REPORT
${'='.repeat(50)}

BUSINESS OVERVIEW
-----------------
Business Model: ${modelName}
Scenario: ${scenario}
Currency: ${currency}
Generated: ${new Date().toLocaleDateString()}

KEY PERFORMANCE METRICS
-----------------------
Annual Revenue: ${document.getElementById('annualRevenue').textContent}
Net Profit: ${document.getElementById('netProfit').textContent}
Gross Margin: ${document.getElementById('grossMargin').textContent}
Break-even Month: ${document.getElementById('breakEven').textContent}

MONTHLY FINANCIAL BREAKDOWN
---------------------------
`;
        
        // Add table in text format
        const colWidths = headers.map((header, i) => 
            Math.max(header.length, ...rows.map(row => row[i] ? row[i].length : 0)) + 2
        );
        
        // Header row
        txtContent += headers.map((header, i) => header.padEnd(colWidths[i])).join('') + '\n';
        txtContent += colWidths.map(width => '-'.repeat(width)).join('') + '\n';
        
        // Data rows
        rows.forEach(row => {
            txtContent += row.map((cell, i) => (cell || '').padEnd(colWidths[i])).join('') + '\n';
        });
        
        txtContent += `

${'='.repeat(50)}
NEED HELP WITH YOUR FORECAST?

Book a free consultation with our experts at Summ Vision.
Visit: www.summvision.com
Email: hello@summvision.com

This report was generated using the Summ Vision Revenue Forecasting Tool.
`;
        
        const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'revenue-forecast.txt';
        link.click();
    }
}

document.addEventListener('DOMContentLoaded', () => new RevenueForecastingTool());

        const inputs = {};

        config.inputs.forEach(input => {

            const element = document.getElementById(input.id);

            if (element) {

                inputs[input.id] = parseFloat(element.value) || 0;

            }

        });



        // Calculate SaaS-specific metrics

        const avgChurnRate = inputs.churnRate || 0;

        const customerAcquisitionCost = inputs.cac || 0;

        

        // Customer LTV calculation: Average revenue per customer / churn rate

        // Assuming average customer pays $100/month (this is a simplified calculation)

        const mrrPerCustomer = 100; // This could be made configurable

        const customerLTV = avgChurnRate > 0 ? (mrrPerCustomer / (avgChurnRate / 100)) : 0;

        

        // LTV:CAC Ratio

        const ltvCacRatio = customerAcquisitionCost > 0 ? (customerLTV / customerAcquisitionCost) : 0;

        

        // Payback period (months to recover CAC)

        const paybackPeriod = mrrPerCustomer > 0 ? (customerAcquisitionCost / mrrPerCustomer) : 0;



        // Update SaaS KPI displays

        document.getElementById('avgChurnRate').textContent = `${avgChurnRate.toFixed(1)}%`;

        document.getElementById('customerLTV').textContent = this.formatCurrency(customerLTV);

        document.getElementById('ltvCacRatio').textContent = `${ltvCacRatio.toFixed(1)}:1`;

        document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;

    }



    updateChart(data) {

        try {

            const canvas = document.getElementById('forecastChart');

            if (!canvas) {

                console.error('Chart canvas not found');

                return;

            }

            

            if (this.chart) {

                this.chart.destroy();

            }

            

            this.chart = new Chart(canvas.getContext('2d'), {

            type: 'line',

            data: {

                labels: data.map(d => `Month ${d.month}`),

                datasets: [

                    {

                        label: 'Revenue',

                        data: data.map(d => d.revenue),

                        borderColor: '#3b82f6',

                        backgroundColor: 'rgba(59, 130, 246, 0.1)',

                        fill: true

                    },

                    {

                        label: 'Costs',

                        data: data.map(d => d.costs),

                        borderColor: '#ef4444',

                        backgroundColor: 'rgba(239, 68, 68, 0.1)',

                        fill: true

                    },

                    {

                        label: 'Profit',

                        data: data.map(d => d.profit),

                        borderColor: '#10b981',

                        backgroundColor: 'rgba(16, 185, 129, 0.1)',

                        fill: true

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: { position: 'top' },

                    tooltip: {

                        callbacks: {

                            label: (context) => `${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`

                        }

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            callback: value => this.formatCurrency(value)

                        }

                    }

                }

            }

        });

        } catch (error) {

            console.error('Error updating chart:', error);

        }

    }



    updateTable(data) {

        document.getElementById('monthlyTable').getElementsByTagName('tbody')[0].innerHTML = 

            data.map(d => `

                <tr>

                    <td class="px-4 py-2">Month ${d.month}</td>

                    <td class="px-4 py-2">${this.formatCurrency(d.revenue)}</td>

                    <td class="px-4 py-2">${this.formatCurrency(d.costs)}</td>

                    <td class="px-4 py-2 ${d.profit >= 0 ? 'text-green-600' : 'text-red-600'}">

                        ${this.formatCurrency(d.profit)}

                    </td>

                    <td class="px-4 py-2">${d.margin.toFixed(1)}%</td>

                </tr>

            `).join('');

    }



    formatCurrency(amount) {

        const currencyCode = document.getElementById('currencySelect').value;

        const currency = this.currencies[currencyCode];

        

        // Handle special formatting for different currencies

        if (currencyCode === 'JPY') {

            return `¥${Math.round(amount).toLocaleString('ja-JP')}`;

        }

        

        return `${currency.symbol}${Math.round(amount).toLocaleString(currency.locale)}`;

    }



    exportPDF() {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        

        doc.setFontSize(20);

        doc.text('Revenue Forecast Report', 20, 20);

        

        doc.setFontSize(12);

        doc.text(`Business Model: ${this.modelConfigs[this.currentModel].name}`, 20, 35);

        doc.text(`Scenario: ${this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1)}`, 20, 45);

        

        ['annualRevenue', 'netProfit', 'grossMargin', 'breakEven'].forEach((id, i) => {

            doc.text(`${id.replace(/([A-Z])/g, ' $1').trim()}: ${document.getElementById(id).textContent}`, 20, 60 + i * 10);

        });

        

        doc.autoTable({

            html: '#monthlyTable',

            startY: 100,

            theme: 'grid',

            headStyles: { fillColor: [59, 130, 246] }

        });

        

        doc.setFontSize(10);

        const pageHeight = doc.internal.pageSize.height;

        doc.text('Need help refining your forecast?', 20, pageHeight - 30);

        doc.text('Book a free consultation at summvision.com', 20, pageHeight - 20);

        

        doc.save('revenue-forecast.pdf');

    }



    exportCSV() {

        const table = document.getElementById('monthlyTable');

        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);

        const rows = Array.from(table.querySelectorAll('tbody tr'))

            .map(row => Array.from(row.querySelectorAll('td'))

                .map(td => `"${td.textContent}"`));

        

        const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.download = 'revenue-forecast.csv';

        link.click();

    }



    exportGoogleSheets() {

        // Create CSV data for Google Sheets import

        const table = document.getElementById('monthlyTable');

        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);

        const rows = Array.from(table.querySelectorAll('tbody tr'))

            .map(row => Array.from(row.querySelectorAll('td'))

                .map(td => td.textContent.replace(/,/g, '')));

        

        // Add summary data

        const summaryData = [

            ['Revenue Forecast Summary'],

            [''],

            ['Business Model:', this.modelConfigs[this.currentModel].name],

            ['Scenario:', this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1)],

            ['Currency:', document.getElementById('currencySelect').value],

            [''],

            ['Key Metrics:'],

            ['Annual Revenue:', document.getElementById('annualRevenue').textContent],

            ['Net Profit:', document.getElementById('netProfit').textContent],

            ['Gross Margin:', document.getElementById('grossMargin').textContent],

            ['Break-even:', document.getElementById('breakEven').textContent],

            [''],

            ['Monthly Breakdown:'],

            headers,

            ...rows

        ];

        

        const csv = summaryData.map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

        

        // Create blob and download

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.download = 'revenue-forecast-for-sheets.csv';

        link.click();

        

        // Open Google Sheets

        setTimeout(() => {

            window.open('https://sheets.google.com/create', '_blank');

        }, 500);

        

        alert('CSV file downloaded! Open Google Sheets and use File > Import > Upload to import the downloaded file.');

    }



    exportWord() {

        // Create Word-compatible HTML content

        const modelName = this.modelConfigs[this.currentModel].name;

        const scenario = this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1);

        const currency = document.getElementById('currencySelect').value;

        

        // Get table data

        const table = document.getElementById('monthlyTable');

        const tableHTML = table.outerHTML;

        

        const wordContent = `

<!DOCTYPE html>

<html>

<head>

    <meta charset="utf-8">

    <title>Revenue Forecast Report</title>

    <style>

        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }

        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }

        h2 { color: #34495e; margin-top: 30px; }

        .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }

        .metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }

        .metric { background: white; padding: 15px; border: 1px solid #dee2e6; border-radius: 5px; }

        table { width: 100%; border-collapse: collapse; margin: 20px 0; }

        th, td { border: 1px solid #dee2e6; padding: 8px 12px; text-align: left; }

        th { background: #f8f9fa; font-weight: bold; }

        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 0.9em; color: #6c757d; }

    </style>

</head>

<body>

    <h1>Revenue Forecast Report</h1>

    

    <div class="summary">

        <h2>Business Overview</h2>

        <p><strong>Business Model:</strong> ${modelName}</p>

        <p><strong>Scenario:</strong> ${scenario}</p>

        <p><strong>Currency:</strong> ${currency}</p>

        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>

    </div>

    

    <h2>Key Performance Metrics</h2>

    <div class="metrics">

        <div class="metric">

            <strong>Annual Revenue:</strong><br>

            ${document.getElementById('annualRevenue').textContent}

        </div>

        <div class="metric">

            <strong>Net Profit:</strong><br>

            ${document.getElementById('netProfit').textContent}

        </div>

        <div class="metric">

            <strong>Gross Margin:</strong><br>

            ${document.getElementById('grossMargin').textContent}

        </div>

        <div class="metric">

            <strong>Break-even Month:</strong><br>

            ${document.getElementById('breakEven').textContent}

        </div>

    </div>

    

    <h2>Monthly Financial Breakdown</h2>

    ${tableHTML}

    

    <div class="footer">

        <p><strong>Need help refining your forecast?</strong></p>

        <p>Book a free consultation with our experts at Summ Vision.</p>

        <p>Visit: www.summvision.com | Email: hello@summvision.com</p>

    </div>

</body>

</html>`;

        

        const blob = new Blob([wordContent], { type: 'application/msword' });

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.download = 'revenue-forecast.doc';

        link.click();

    }



    exportTXT() {

        const modelName = this.modelConfigs[this.currentModel].name;

        const scenario = this.currentScenario.charAt(0).toUpperCase() + this.currentScenario.slice(1);

        const currency = document.getElementById('currencySelect').value;

        

        // Get table data

        const table = document.getElementById('monthlyTable');

        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);

        const rows = Array.from(table.querySelectorAll('tbody tr'))

            .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));

        

        // Create formatted text content

        let txtContent = `REVENUE FORECAST REPORT

${'='.repeat(50)}



BUSINESS OVERVIEW

-----------------

Business Model: ${modelName}

Scenario: ${scenario}

Currency: ${currency}

Generated: ${new Date().toLocaleDateString()}



KEY PERFORMANCE METRICS

-----------------------

Annual Revenue: ${document.getElementById('annualRevenue').textContent}

Net Profit: ${document.getElementById('netProfit').textContent}

Gross Margin: ${document.getElementById('grossMargin').textContent}

Break-even Month: ${document.getElementById('breakEven').textContent}



MONTHLY FINANCIAL BREAKDOWN

---------------------------

`;

        


        // Data rows

        rows.forEach(row => {

            txtContent += row.map((cell, i) => (cell || '').padEnd(colWidths[i])).join('') + '\n';

        });

        

        txtContent += `



${'='.repeat(50)}

NEED HELP WITH YOUR FORECAST?



Book a free consultation with our experts at Summ Vision.

Visit: www.summvision.com

Email: hello@summvision.com



This report was generated using the Summ Vision Revenue Forecasting Tool.

`;

        

        const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);

        link.download = 'revenue-forecast.txt';

        link.click();

    }

}



document.addEventListener('DOMContentLoaded', () => new RevenueForecastingTool());
