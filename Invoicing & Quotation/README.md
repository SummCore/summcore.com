# 📄 Invoicing & Quotation App

A professional web-based application for generating invoices and quotations with multiple export options.

## 🚀 Features

### Core Functionality
- **Document Types**: Generate both invoices and quotations
- **Company Branding**: Upload company logo and customize business information
- **Client Management**: Add client details and addresses
- **Dynamic Items**: Add/remove items with automatic calculations
- **Auto-calculations**: Automatic subtotal, tax, and total calculations
- **Live Preview**: Real-time preview of the document

### Export Options
- **📄 PDF Export**: Professional PDF documents using jsPDF
- **📝 Word Export**: DOCX format using docx.js
- **📊 Excel Export**: XLSX format using SheetJS
- **📧 Email Integration**: Send via default email client
- **🖨️ Print**: Direct printing functionality

### Professional Features
- **Auto-numbering**: Automatic document number generation with timestamps
- **Multiple Currencies**: Support for £, $, €, ¥
- **Tax Calculations**: Per-item tax percentage calculations
- **Payment Terms**: Customizable payment terms
- **Notes Section**: Additional information and terms
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Libraries**:
  - jsPDF (PDF generation)
  - docx.js (Word document generation)
  - SheetJS (Excel export)
  - FileSaver.js (File downloading)

## 📁 File Structure

```
/invoice-app/
├── index.html          # Main application file
├── styles.css          # Styling and responsive design
├── script.js           # Core functionality and exports
├── assets/             # Assets folder for logos
└── README.md           # Documentation
```

## 🚀 Getting Started

1. **Open the Application**:
   - Simply open `index.html` in any modern web browser
   - No server setup required - runs entirely client-side

2. **Fill in Company Information**:
   - Enter your company name, address, and contact details
   - Upload your company logo (PNG, JPG supported)

3. **Add Client Details**:
   - Enter client name and address

4. **Add Items**:
   - Click "Add Item" to add products/services
   - Enter description, quantity, unit price, and tax percentage
   - Subtotals are calculated automatically

5. **Generate Document**:
   - Choose document type (Invoice or Quotation)
   - Review the live preview
   - Use action buttons to export or send

## 💡 Usage Tips

### Document Numbers
- Auto-generated format: `INVOICE-YYYYMMDD-XXX` or `QUOTE-YYYYMMDD-XXX`
- Can be customized manually if needed

### Logo Upload
- Supported formats: PNG, JPG, GIF
- Recommended size: 150x100px or similar aspect ratio
- Logo appears in the top-right of documents

### Tax Calculations
- Enter tax percentage per item (e.g., 20 for 20% VAT)
- Tax is calculated on quantity × unit price
- Total includes all taxes

### Export Formats
- **PDF**: Best for sharing and printing
- **Word**: Editable format for further customization
- **Excel**: For accounting and data analysis
- **Email**: Opens default email client with pre-filled subject and body

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Print styles are included for clean printing

### Functionality
- Extend `script.js` to add new features
- All calculations are handled in real-time

### Document Templates
- Modify the preview generation in `updatePreview()` function
- Customize PDF layout in `downloadPDF()` function

## 🔧 Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive design included

## 📋 Requirements

- Modern web browser with JavaScript enabled
- No additional software installation required
- Works offline after initial load

## 🚀 Future Enhancements

Potential features for future versions:
- User account system with saved invoices
- Cloud storage integration (Google Drive, Dropbox)
- QR codes for payment links
- Multiple document templates/themes
- Client database management
- Recurring invoice automation
- Advanced reporting and analytics

## 📞 Support

This application is designed to work out-of-the-box with no configuration required. All processing happens client-side, ensuring your data remains private and secure.

---

**Note**: This application runs entirely in the browser and does not require any backend services or API keys. All data processing is done locally on your device.
