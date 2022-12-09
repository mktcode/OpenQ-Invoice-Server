import PDFDocument from 'pdfkit-table';
import createTable from './createTable.js';

import fs from 'fs';
//import getToken from './getToken.js';

const createPdf = async (
  tokenBalances: TokenBalance[],
  freelancerData: User,
  freelancerInvoiceNumber: number,
  clientData: User,
  freelancerAddress: string,
  depositId: string
) => {
  return new Promise(async (resolve, _reject) => {
    // Create a document

    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./tmp/${depositId}.pdf`));

    //can't handle multiple balances of the same token.
    //For now this doesn't matter as we are only doing one deposit at a time.

    //const lorem =     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // the magic (async/await)
    doc.fontSize(18);
    doc.fillColor('#000000');
    const leftPadding = 60;
    let topPadding = 40;
    doc.font('Helvetica-Bold');
    const invoiceNumber = `Invoice No. ${freelancerInvoiceNumber?.toString()}`;
    doc.text(invoiceNumber, leftPadding, (topPadding += 10));
    doc.fontSize(12);
    doc.text(clientData.billingName, leftPadding, (topPadding += 40));
    doc.text(freelancerData.billingName, 400, topPadding);

    doc.font('Helvetica');
    doc.text(clientData.email, leftPadding, (topPadding += 16));
    doc.text(freelancerData.email, 400, topPadding);
    doc.text(clientData.streetAddress, leftPadding, (topPadding += 16));

    doc.text(clientData.country, leftPadding, (topPadding += 16));
    doc.text(freelancerData.phoneNumber, 400, topPadding);
    doc.text(freelancerData.streetAddress, 400, (topPadding += 16));
    doc.text(freelancerData.postalCode, 400, (topPadding += 16));
    doc.text(freelancerData.country, 400, (topPadding += 16));
    const taxId = `Tax number: ${freelancerData.taxId}`;
    doc.text(taxId, 400, (topPadding += 16));
    const date = new Date();
    const dateStr = `Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    doc.text(dateStr, leftPadding, (topPadding += 16));
    const dueDateStr = `Due Date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    doc.text(dueDateStr, leftPadding, (topPadding += 16));
    doc.text('', leftPadding, (topPadding += 16));

    doc.moveDown();

    const table = await createTable(tokenBalances, freelancerData);
    const { rows } = table;
    doc.table(table, {
      hideHeader: true,
      minRowHeight: 30,
      x: leftPadding + 12,
      divider: {
        header: { disabled: false, width: 2, opacity: 1 },
        horizontal: { disabled: true, width: 0.5, opacity: 0.5 },
      },

      prepareRow: (_row: string[], _indexColumn: number, indexRow: number, rectRow: any) => {
        const correctRow = { ...rectRow, x: parseInt(rectRow.x) - 12, y: parseInt(rectRow.y) - 8 };
        doc.font('Helvetica').moveDown();
        if (indexRow === 0) {
          doc.addBackground(correctRow, 'grey');
          doc.fontSize(16).moveDown(5);
        } else {
          doc.fontSize(12);
        }
        if (indexRow === rows.length - 1) {
          doc.addBackground(correctRow, 'grey');
        }
      },
    });

    doc.text(freelancerData.memo, leftPadding, (topPadding += 210)).font('Helvetica-Bold');

    doc.text('Eth address:', leftPadding, (topPadding += 100)).font('Helvetica');

    doc.text(freelancerAddress, leftPadding + 80, topPadding).font('Helvetica-Bold');

    doc.text('VAT number:', leftPadding, (topPadding += 16)).font('Helvetica');

    doc.text(freelancerData.vatNumber, leftPadding + 80, topPadding);

    doc.end();
    resolve(doc);
  });
};

export default createPdf;
