// Import necessary modules from react-pdf
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Define your PDF generation function
export async function generatePDF(invoiceDetails: any) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Set up the font
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set up text positions and styles
  const { width, height } = page.getSize();
  const fontSize = 15;
  const textWidth = font.widthOfTextAtSize('Invoice', fontSize);
  const textHeight = font.heightAtSize(fontSize);
  const textX = (width - textWidth) / 2;
  const textY = height - 4 * textHeight;

  // Add text to the PDF
  page.drawText('Invoice', {
    x: textX,
    y: textY,
    size: fontSize,
    font,
    color: rgb(0, 0, 0), // Black color
  });

  // Add invoice details
  const detailsText = `
    Bill Form: 
    Cycle Control Hub Store
    150 Eligon Street, Suite
    Ottawa, ON K2P 1L4
    Canada

    Seller Info: 
    @${invoiceDetails.sellerName}
    ${invoiceDetails.sellerEmail}
    
    Bill To:
    @${invoiceDetails.buyerName}
    640 Heavens Way
    Sarasta, FL, 34231
    United States
    ${invoiceDetails.buyerEmail}

    Bike Information:
    Name: ${invoiceDetails.bikeName}
    Model: ${invoiceDetails.bikeModel}
    Color: ${invoiceDetails.bikeColor}
    Manufacturer Country: ${invoiceDetails.manufacturerCountry}
    Quantity: ${invoiceDetails.quantity}
    Date of Sale: ${invoiceDetails.dateOfSale}
    Subtotal: $${invoiceDetails.price}
    Tax: $${invoiceDetails.tax}
    Total Amount: $${invoiceDetails.totalAmount}

    NOTES/MEMO:
    Free Shipping with 30 day money back guarantee
  `;

  const detailsY = height - 6 * textHeight;
  page.drawText(detailsText, {
    x: 50,
    y: detailsY,
    size: 10,
    font,
    color: rgb(0.2, 0.2, 0.2), 
    lineHeight: 20,
  });

  // Save the PDF as a blob
  const pdfBytes = await pdfDoc.save();

  // Return the PDF blob
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
