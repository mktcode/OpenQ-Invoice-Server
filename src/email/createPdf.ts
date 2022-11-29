import PDFDocument from 'pdfkit-table';

import fs from 'fs';

const createPdf = async (
  _invoiceReceivers: any,

  _invoiceSender: any,
  invoiceData: any
) => {
  return new Promise(async (resolve, _reject) => {
    // Create a document

    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));
    const getUSDValue = (_tokenAddress: string, _volume: string) => {
      return 4.56;
    };
    interface tokenBalance {
      tokenAddress: string;
      volume: string;
    }
    const headers = ['Token', 'Volume', 'USD'];

    // Embed a font, set the font size, and render some text
    const table = {
      headers,
      rows: invoiceData.map((elem: tokenBalance) => [
        elem.tokenAddress,
        elem.volume,
        `$${getUSDValue(elem.tokenAddress, elem.volume)}`,
      ]),
    };
    //const lorem =     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // the magic (async/await)
    let pl = 0;
    doc.fontSize(18);
    doc.fillColor('#000000');
    doc.font('Helvetica');
    doc.text('Christopher Stevers', 20, (pl += 20));
    doc.fontSize(12);
    doc.text('October 12, 2020', 400, pl);
    doc.text('5146 Perth line 44', 20, (pl += 20));
    doc.text('christopher.stevers1@gmail.com', 20, (pl += 16));
    doc.text('Bill to:', 20, (pl += 20));
    doc.text('openqdev', 20, (pl += 6));
    doc.text('55 rheinsberger drive', 20, (pl += 6));
    doc.text('rick@openq.dev', 20, (pl += 6));

    await doc.table(table, {
      /* options */
    });
    // -- or --
    // doc.table(table).then(() => { doc.end() }).catch((err) => { })

    // if your run express.js server
    // to show PDF on navigator
    // doc.pipe(res);

    // Finalize PDF file
    const val = doc.end();
    resolve(val);
  });
};

export default createPdf;
