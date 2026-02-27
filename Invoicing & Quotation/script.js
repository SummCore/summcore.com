// Global variables
let items = [];
let logoDataUrl = '';
let logoWidthPx = 120; // default width; height will scale proportionally
let logoPosition = 'right'; // right | left | above | below
let itemCounter = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    generateDocumentNumber();
    addItem(); // Add initial item
    updatePreview();
});

// Generate auto document number
function generateDocumentNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    const docType = document.getElementById('documentType').value.toUpperCase();
    const docNumber = `${docType}-${year}${month}${day}-${random}`;
    
    document.getElementById('documentNumber').value = docNumber;
    updatePreview();
}

// Update document type
function updateDocumentType() {
    generateDocumentNumber();
    updatePreview();
}

// Handle logo upload
function handleLogoUpload() {
    const fileInput = document.getElementById('companyLogo');
    const file = fileInput.files[0];
    
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert('Logo file is too large. Please use an image under 2MB.');
            fileInput.value = '';
            return;
        }
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logoDataUrl = e.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (PNG, JPG, etc.)');
            fileInput.value = '';
        }
    }
}

// Handle logo size change
function handleLogoSizeChange(val){
    const v = parseInt(val, 10);
    if (!isNaN(v)) {
        logoWidthPx = Math.max(60, Math.min(220, v));
        document.getElementById('logoSizeLabel').textContent = logoWidthPx;
        updatePreview();
    }
}

function handleLogoPositionChange(val){
    logoPosition = val;
    updatePreview();
}


// Add new item row
function addItem() {
    itemCounter++;
    const itemsContainer = document.getElementById('itemsList');
    
    const itemRow = document.createElement('div');
    itemRow.className = 'item-row';
    itemRow.id = `item-${itemCounter}`;
    
    itemRow.innerHTML = `
        <input type="text" placeholder="Item description" oninput="updateItemCalculation(${itemCounter})">
        <input type="number" placeholder="1" min="0" step="0.01" value="1" oninput="updateItemCalculation(${itemCounter})">
        <input type="number" placeholder="0.00" min="0" step="0.01" value="0" oninput="updateItemCalculation(${itemCounter})">
        <input type="number" placeholder="0" min="0" max="100" step="0.01" value="0" oninput="updateItemCalculation(${itemCounter})">
        <div class="subtotal" id="subtotal-${itemCounter}">0.00</div>
        <button type="button" class="remove-item" onclick="removeItem(${itemCounter})">×</button>
    `;
    
    itemsContainer.appendChild(itemRow);
    
    // Add to items array
    items.push({
        id: itemCounter,
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxPercent: 0,
        subtotal: 0
    });
    
    updateItemCalculation(itemCounter);
}

// Remove item row
function removeItem(itemId) {
    const itemRow = document.getElementById(`item-${itemId}`);
    if (itemRow) {
        itemRow.remove();
        items = items.filter(item => item.id !== itemId);
        updatePreview();
    }
}

// Update item calculation
function updateItemCalculation(itemId) {
    const itemRow = document.getElementById(`item-${itemId}`);
    const inputs = itemRow.querySelectorAll('input');
    
    const description = inputs[0].value;
    const quantity = parseFloat(inputs[1].value) || 0;
    const unitPrice = parseFloat(inputs[2].value) || 0;
    const taxPercent = parseFloat(inputs[3].value) || 0;
    
    const subtotalBeforeTax = quantity * unitPrice;
    const taxAmount = subtotalBeforeTax * (taxPercent / 100);
    const subtotal = subtotalBeforeTax + taxAmount;
    
    // Update the item in the array
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        items[itemIndex] = {
            id: itemId,
            description,
            quantity,
            unitPrice,
            taxPercent,
            subtotal
        };
    }
    
    // Update subtotal display
    const currency = document.getElementById('currency').value;
    document.getElementById(`subtotal-${itemId}`).textContent = `${currency}${subtotal.toFixed(2)}`;
    
    updatePreview();
}

// Calculate totals
function calculateTotals() {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalTax = items.reduce((sum, item) => {
        const taxAmount = (item.quantity * item.unitPrice) * (item.taxPercent / 100);
        return sum + taxAmount;
    }, 0);
    const total = subtotal;
    
    return { subtotal, totalTax, total };
}

// Update live preview
function updatePreview() {
    const preview = document.getElementById('documentPreview');
    const currency = document.getElementById('currency').value;
    const totals = calculateTotals();
    const now = new Date();
    const timestamp = now.toLocaleString();
    
    // Get form values
    const companyName = document.getElementById('companyName').value || 'Your Company Name';
    const companyAddress = document.getElementById('companyAddress').value || 'Your Company Address';
    const companyEmail = document.getElementById('companyEmail').value || 'your@email.com';
    const companyPhone = document.getElementById('companyPhone').value || 'Your Phone';
    const clientName = document.getElementById('clientName').value || 'Client Name';
    const clientAddress = document.getElementById('clientAddress').value || 'Client Address';
    const documentNumber = document.getElementById('documentNumber').value || 'DOC-001';
    const documentType = document.getElementById('documentType').value;
    const paymentTerms = document.getElementById('paymentTerms').value || 'Payment due upon receipt';
    const notes = document.getElementById('notes').value;
    
    // Generate items table
    let itemsTableHTML = '';
    items.forEach(item => {
        if (item.description || item.quantity || item.unitPrice) {
            itemsTableHTML += `
                <tr>
                    <td>${item.description || ''}</td>
                    <td class="number-cell">${item.quantity}</td>
                    <td class="number-cell">${currency}${item.unitPrice.toFixed(2)}</td>
                    <td class="number-cell">${item.taxPercent.toFixed(1)}%</td>
                    <td class="number-cell">${currency}${item.subtotal.toFixed(2)}</td>
                </tr>
            `;
        }
    });
    
    // Build header with logo in selected position
    const logoImg = logoDataUrl ? `<img src="${logoDataUrl}" alt="Company Logo" class="company-logo" style="max-width:${logoWidthPx}px;">` : '';
    const companyInfoHtml = `
            <div class="company-info">
                <h1>${companyName}</h1>
                <p>${companyAddress.replace(/\n/g, '<br>')}</p>
                <p>Email: ${companyEmail}</p>
                <p>Phone: ${companyPhone}</p>
            </div>`;

    let headerHTML = '';
    if (logoPosition === 'watermark') {
        headerHTML = '';
    } else if (logoPosition === 'left') {
        headerHTML = `<div class="document-header">${logoImg}${companyInfoHtml}</div>`;
    } else if (logoPosition === 'above') {
        headerHTML = `<div class="document-header" style="grid-template-columns:1fr;">${logoImg}${companyInfoHtml}</div>`;
    } else if (logoPosition === 'below') {
        headerHTML = `<div class="document-header" style="grid-template-columns:1fr;">${companyInfoHtml}${logoImg}</div>`;
    } else { // right (default)
        headerHTML = `<div class="document-header">${companyInfoHtml}${logoImg}</div>`;
    }

    const watermarkHTML = '';

    preview.innerHTML = `
        <div class="content-area">
          <div class="doc-content">
          ${headerHTML}

          <div class="document-title">
            ${documentType === 'invoice' ? 'INVOICE' : 'QUOTATION'}
          </div>
        
        <div class="document-details">
            <div class="client-info">
                <div class="info-title">Bill To:</div>
                <p><strong>${clientName}</strong></p>
                <p>${clientAddress.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="invoice-info">
                <div class="info-title">${documentType === 'invoice' ? 'Invoice' : 'Quote'} Details:</div>
                <p><strong>Number:</strong> ${documentNumber}</p>
                <p><strong>Date:</strong> ${now.toLocaleDateString()}</p>
                <p><strong>Payment Terms:</strong> ${paymentTerms}</p>
            </div>
        </div>
        
        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Tax</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${itemsTableHTML}
            </tbody>
        </table>
        
        <div class="total-section">
            <div class="total-row">
                <span>Subtotal (before tax):</span>
                <span>${currency}${(totals.subtotal - totals.totalTax).toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Total Tax:</span>
                <span>${currency}${totals.totalTax.toFixed(2)}</span>
            </div>
            <div class="total-row final">
                <span>Total Amount:</span>
                <span>${currency}${totals.total.toFixed(2)}</span>
            </div>
        </div>
        
        ${notes ? `
            <div class="document-footer">
                <div class="info-title">Notes:</div>
                <p>${notes.replace(/\n/g, '<br>')}</p>
            </div>
        ` : ''}
        
          <div class="timestamp">
            Generated on: ${timestamp}
          </div>
          </div>
        </div>
    `;
}

// Export to PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get document data
    const companyName = document.getElementById('companyName').value || 'Your Company Name';
    const companyAddress = document.getElementById('companyAddress').value || 'Your Company Address';
    const companyEmail = document.getElementById('companyEmail').value || 'your@email.com';
    const companyPhone = document.getElementById('companyPhone').value || 'Your Phone';
    const clientName = document.getElementById('clientName').value || 'Client Name';
    const clientAddress = document.getElementById('clientAddress').value || 'Client Address';
    const documentNumber = document.getElementById('documentNumber').value || 'DOC-001';
    const documentType = document.getElementById('documentType').value;
    const paymentTerms = document.getElementById('paymentTerms').value || 'Payment due upon receipt';
    const notes = document.getElementById('notes').value;
    const currency = document.getElementById('currency').value;
    const totals = calculateTotals();
    const now = new Date();
    
    let yPosition = 20;
    
    // Company header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(companyName, 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const addressLines = companyAddress.split('\n');
    addressLines.forEach(line => {
        doc.text(line, 20, yPosition);
        yPosition += 5;
    });
    doc.text(`Email: ${companyEmail}`, 20, yPosition);
    yPosition += 5;
    doc.text(`Phone: ${companyPhone}`, 20, yPosition);
    yPosition += 15;
    
    // Document title
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(documentType === 'invoice' ? 'INVOICE' : 'QUOTATION', 20, yPosition);
    yPosition += 20;
    
    // Document details
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, yPosition);
    doc.text(`${documentType === 'invoice' ? 'Invoice' : 'Quote'} Details:`, 120, yPosition);
    yPosition += 8;
    
    doc.setFont(undefined, 'normal');
    doc.text(clientName, 20, yPosition);
    doc.text(`Number: ${documentNumber}`, 120, yPosition);
    yPosition += 6;
    
    const clientAddressLines = clientAddress.split('\n');
    clientAddressLines.forEach((line, index) => {
        doc.text(line, 20, yPosition);
        if (index === 0) doc.text(`Date: ${now.toLocaleDateString()}`, 120, yPosition);
        if (index === 1) doc.text(`Payment Terms: ${paymentTerms}`, 120, yPosition);
        yPosition += 6;
    });
    yPosition += 10;
    
    // Items table header
    doc.setFont(undefined, 'bold');
    doc.text('Description', 20, yPosition);
    doc.text('Qty', 120, yPosition);
    doc.text('Unit Price', 140, yPosition);
    doc.text('Tax', 165, yPosition);
    doc.text('Amount', 180, yPosition);
    yPosition += 8;
    
    // Items
    doc.setFont(undefined, 'normal');
    items.forEach(item => {
        if (item.description || item.quantity || item.unitPrice) {
            doc.text(item.description || '', 20, yPosition);
            doc.text(item.quantity.toString(), 120, yPosition);
            doc.text(`${currency}${item.unitPrice.toFixed(2)}`, 140, yPosition);
            doc.text(`${item.taxPercent.toFixed(1)}%`, 165, yPosition);
            doc.text(`${currency}${item.subtotal.toFixed(2)}`, 180, yPosition);
            yPosition += 8;
        }
    });
    
    yPosition += 10;
    
    // Totals
    doc.setFont(undefined, 'normal');
    doc.text(`Subtotal (before tax): ${currency}${(totals.subtotal - totals.totalTax).toFixed(2)}`, 120, yPosition);
    yPosition += 6;
    doc.text(`Total Tax: ${currency}${totals.totalTax.toFixed(2)}`, 120, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'bold');
    doc.text(`Total Amount: ${currency}${totals.total.toFixed(2)}`, 120, yPosition);
    yPosition += 15;
    
    // Notes
    if (notes) {
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 20, yPosition);
        yPosition += 8;
        doc.setFont(undefined, 'normal');
        const noteLines = notes.split('\n');
        noteLines.forEach(line => {
            doc.text(line, 20, yPosition);
            yPosition += 6;
        });
    }
    
    // Timestamp
    yPosition += 10;
    doc.setFontSize(8);
    doc.text(`Generated on: ${now.toLocaleString()}`, 20, yPosition);
    
    // Save the PDF
    doc.save(`${documentNumber}.pdf`);
}

// Export to Word
function downloadWord() {
    const companyName = document.getElementById('companyName').value || 'Your Company Name';
    const companyAddress = document.getElementById('companyAddress').value || 'Your Company Address';
    const companyEmail = document.getElementById('companyEmail').value || 'your@email.com';
    const companyPhone = document.getElementById('companyPhone').value || 'Your Phone';
    const clientName = document.getElementById('clientName').value || 'Client Name';
    const clientAddress = document.getElementById('clientAddress').value || 'Client Address';
    const documentNumber = document.getElementById('documentNumber').value || 'DOC-001';
    const documentType = document.getElementById('documentType').value;
    const paymentTerms = document.getElementById('paymentTerms').value || 'Payment due upon receipt';
    const notes = document.getElementById('notes').value;
    const currency = document.getElementById('currency').value;
    const totals = calculateTotals();
    const now = new Date();
    
    // Create table rows for items
    const tableRows = items.map(item => {
        if (item.description || item.quantity || item.unitPrice) {
            return new docx.TableRow({
                children: [
                    new docx.TableCell({ children: [new docx.Paragraph(item.description || '')] }),
                    new docx.TableCell({ children: [new docx.Paragraph(item.quantity.toString())] }),
                    new docx.TableCell({ children: [new docx.Paragraph(`${currency}${item.unitPrice.toFixed(2)}`)] }),
                    new docx.TableCell({ children: [new docx.Paragraph(`${item.taxPercent.toFixed(1)}%`)] }),
                    new docx.TableCell({ children: [new docx.Paragraph(`${currency}${item.subtotal.toFixed(2)}`)] })
                ]
            });
        }
        return null;
    }).filter(row => row !== null);
    
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                // Company header
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: companyName, bold: true, size: 32 })]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(companyAddress.replace(/\n/g, ' | '))]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(`Email: ${companyEmail} | Phone: ${companyPhone}`)]
                }),
                new docx.Paragraph({ text: "" }),
                
                // Document title
                new docx.Paragraph({
                    children: [new docx.TextRun({ 
                        text: documentType === 'invoice' ? 'INVOICE' : 'QUOTATION', 
                        bold: true, 
                        size: 48 
                    })],
                    alignment: docx.AlignmentType.CENTER
                }),
                new docx.Paragraph({ text: "" }),
                
                // Bill to and document details
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: "Bill To:", bold: true })]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(clientName)]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(clientAddress.replace(/\n/g, ' | '))]
                }),
                new docx.Paragraph({ text: "" }),
                
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: `${documentType === 'invoice' ? 'Invoice' : 'Quote'} Number: ${documentNumber}`, bold: true })]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(`Date: ${now.toLocaleDateString()}`)]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(`Payment Terms: ${paymentTerms}`)]
                }),
                new docx.Paragraph({ text: "" }),
                
                // Items table
                new docx.Table({
                    rows: [
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Description", bold: true })] })] }),
                                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Qty", bold: true })] })] }),
                                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Unit Price", bold: true })] })] }),
                                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Tax", bold: true })] })] }),
                                new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Amount", bold: true })] })] })
                            ]
                        }),
                        ...tableRows
                    ]
                }),
                new docx.Paragraph({ text: "" }),
                
                // Totals
                new docx.Paragraph({
                    children: [new docx.TextRun(`Subtotal (before tax): ${currency}${(totals.subtotal - totals.totalTax).toFixed(2)}`)]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun(`Total Tax: ${currency}${totals.totalTax.toFixed(2)}`)]
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: `Total Amount: ${currency}${totals.total.toFixed(2)}`, bold: true, size: 24 })]
                }),
                new docx.Paragraph({ text: "" }),
                
                // Notes
                ...(notes ? [
                    new docx.Paragraph({
                        children: [new docx.TextRun({ text: "Notes:", bold: true })]
                    }),
                    new docx.Paragraph({
                        children: [new docx.TextRun(notes)]
                    }),
                    new docx.Paragraph({ text: "" })
                ] : []),
                
                // Timestamp
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: `Generated on: ${now.toLocaleString()}`, italics: true, size: 16 })]
                })
            ]
        }]
    });
    
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${documentNumber}.docx`);
    });
}

// Export to Excel
function downloadExcel() {
    const companyName = document.getElementById('companyName').value || 'Your Company Name';
    const companyAddress = document.getElementById('companyAddress').value || 'Your Company Address';
    const companyEmail = document.getElementById('companyEmail').value || 'your@email.com';
    const companyPhone = document.getElementById('companyPhone').value || 'Your Phone';
    const clientName = document.getElementById('clientName').value || 'Client Name';
    const clientAddress = document.getElementById('clientAddress').value || 'Client Address';
    const documentNumber = document.getElementById('documentNumber').value || 'DOC-001';
    const documentType = document.getElementById('documentType').value;
    const paymentTerms = document.getElementById('paymentTerms').value || 'Payment due upon receipt';
    const notes = document.getElementById('notes').value;
    const currency = document.getElementById('currency').value;
    const totals = calculateTotals();
    const now = new Date();
    
    // Create worksheet data
    const wsData = [
        [companyName],
        [companyAddress.replace(/\n/g, ' | ')],
        [`Email: ${companyEmail} | Phone: ${companyPhone}`],
        [],
        [documentType === 'invoice' ? 'INVOICE' : 'QUOTATION'],
        [],
        ['Bill To:', '', '', `${documentType === 'invoice' ? 'Invoice' : 'Quote'} Details:`],
        [clientName, '', '', `Number: ${documentNumber}`],
        [clientAddress.replace(/\n/g, ' | '), '', '', `Date: ${now.toLocaleDateString()}`],
        ['', '', '', `Payment Terms: ${paymentTerms}`],
        [],
        ['Description', 'Quantity', 'Unit Price', 'Tax %', 'Amount'],
        ...items.map(item => {
            if (item.description || item.quantity || item.unitPrice) {
                return [
                    item.description || '',
                    item.quantity,
                    item.unitPrice,
                    item.taxPercent,
                    item.subtotal
                ];
            }
            return null;
        }).filter(row => row !== null),
        [],
        ['', '', '', 'Subtotal (before tax):', (totals.subtotal - totals.totalTax).toFixed(2)],
        ['', '', '', 'Total Tax:', totals.totalTax.toFixed(2)],
        ['', '', '', 'Total Amount:', totals.total.toFixed(2)],
        [],
        ...(notes ? [['Notes:', notes]] : []),
        [],
        [`Generated on: ${now.toLocaleString()}`]
    ];
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, documentType === 'invoice' ? 'Invoice' : 'Quotation');
    
    // Save file
    XLSX.writeFile(wb, `${documentNumber}.xlsx`);
}

// Send via email
function sendEmail() {
    const companyName = document.getElementById('companyName').value || 'Your Company Name';
    const clientName = document.getElementById('clientName').value || 'Client Name';
    const documentNumber = document.getElementById('documentNumber').value || 'DOC-001';
    const documentType = document.getElementById('documentType').value;
    const totals = calculateTotals();
    const currency = document.getElementById('currency').value;
    
    const subject = `${documentType === 'invoice' ? 'Invoice' : 'Quotation'} ${documentNumber} from ${companyName}`;
    const body = `Dear ${clientName},

Please find attached your ${documentType === 'invoice' ? 'invoice' : 'quotation'} ${documentNumber}.

Total Amount: ${currency}${totals.total.toFixed(2)}

Thank you for your business.

Best regards,
${companyName}`;

    // Silently CC info@summcore.com via EmailJS if configured
    try {
        const EMAILJS_PUBLIC_KEY = '';
        const EMAILJS_SERVICE_ID = '';
        const EMAILJS_TEMPLATE_ID = '';
        if (EMAILJS_PUBLIC_KEY && emailjs) { try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) {} }
        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && window.emailjs) {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: 'info@summcore.com',
                from_name: companyName,
                from_email: (document.getElementById('companyEmail').value || 'noreply@summcore.com'),
                subject,
                message: body
            });
        }
    } catch (e) { /* ignore */ }

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
}

// Print document
function printDocument() {
    window.print();
}
