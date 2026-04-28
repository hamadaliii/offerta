import * as Print from 'expo-print';

export const generateInvoicePDF = async (clientData: any, items: any[], total: number, tax: number) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.desc}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.qty}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.qty).toFixed(2)}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
          h1 { color: #000; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #f9f9f9; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
          .totals { margin-top: 30px; text-align: right; }
          .totals p { font-size: 16px; margin: 5px 0; }
          .totals h2 { font-size: 24px; color: #000; margin-top: 10px; }
        </style>
      </head>
      <body>
        <h1>INVOICE</h1>
        <p><strong>Client:</strong> ${clientData.client_name || 'Valued Client'}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div class="totals">
          <p>Subtotal: $${(total - tax).toFixed(2)}</p>
          <p>Tax (10%): $${tax.toFixed(2)}</p>
          <h2>Total: $${total.toFixed(2)}</h2>
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  return uri;
};
