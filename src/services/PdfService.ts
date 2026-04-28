import * as Print from 'expo-print';
import { CompanyProfile, QuoteData } from '../types/Quote';

export const generateInvoicePDF = async (
  company: CompanyProfile,
  quote: QuoteData
) => {
  const currencySymbol = quote.currency === 'SEK' || quote.currency.toLowerCase() === 'kr' ? 'kr' : quote.currency;

  const itemsHtml = quote.items.map(item => `
    <tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); color: #334155;">${item.desc}</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); text-align: center; color: #475569;">${item.qty} ${item.unit}</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); text-align: right; color: #475569;">${item.price.toFixed(2)} ${currencySymbol}</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); text-align: right; font-weight: 600; color: #0f172a;">${(item.row_total || 0).toFixed(2)} ${currencySymbol}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Inter', sans-serif; 
            padding: 40px; 
            color: #334155; 
            background-color: #f8fafc;
          }
          .glass-container {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
          }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 24px; margin-bottom: 32px; }
          .logo-area h1 { margin: 0; color: #0f172a; font-size: 32px; font-weight: 700; letter-spacing: -1px; }
          .logo-area p { margin: 4px 0 0; color: #64748b; font-size: 14px; }
          .company-info { text-align: right; font-size: 14px; color: #475569; line-height: 1.6; }
          
          .client-section { margin-bottom: 40px; display: flex; justify-content: space-between; }
          .client-details h3 { margin: 0 0 8px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
          .client-details p { margin: 2px 0; font-size: 16px; color: #1e293b; font-weight: 500; }
          
          table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 32px; }
          th { 
            background: #f1f5f9; 
            padding: 12px 16px; 
            text-align: left; 
            font-size: 12px; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
            color: #64748b; 
            font-weight: 600;
          }
          th:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
          th:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }
          
          .footer-section { display: flex; justify-content: flex-end; }
          .totals-box { width: 300px; background: #f8fafc; border-radius: 16px; padding: 24px; }
          .tot-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #475569; }
          .tot-row.grand { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); font-size: 20px; font-weight: 700; color: #0f172a; }
        </style>
      </head>
      <body>
        <div class="glass-container">
          <div class="header">
            <div class="logo-area">
              <h1>OFFERT</h1>
              <p>Org.nr: ${company.org_nr}</p>
            </div>
            <div class="company-info">
              <strong>${company.company_name}</strong><br>
              ${company.address}<br>
              ${company.contact_email}<br>
              ${company.contact_phone}
            </div>
          </div>
          
          <div class="client-section">
            <div class="client-details">
              <h3>Faktureras Till</h3>
              <p>${quote.client_name}</p>
              ${quote.client_ref_person ? `<p>Referens: ${quote.client_ref_person}</p>` : ''}
              ${quote.client_address ? `<p style="font-weight: 400; color: #475569;">${quote.client_address}</p>` : ''}
            </div>
            <div class="client-details" style="text-align: right;">
              <h3>Datum</h3>
              <p>${new Date().toLocaleDateString('sv-SE')}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Beskrivning</th>
                <th style="text-align: center;">Antal</th>
                <th style="text-align: right;">Á-pris</th>
                <th style="text-align: right;">Belopp</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="footer-section">
            <div class="totals-box">
              <div class="tot-row">
                <span>Delsumma</span>
                <span>${(quote.subtotal || 0).toFixed(2)} ${currencySymbol}</span>
              </div>
              <div class="tot-row">
                <span>Moms (25%)</span>
                <span>${(quote.tax_amount || 0).toFixed(2)} ${currencySymbol}</span>
              </div>
              <div class="tot-row grand">
                <span>Att betala</span>
                <span>${(quote.grand_total || 0).toFixed(2)} ${currencySymbol}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  return uri;
};
