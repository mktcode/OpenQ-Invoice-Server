'use strict';
//# sourceMappingURLimport nodemailer from "nodemailer"

//import getOffChainData from './getOffChainData.js';
//import getOnChainData from './getOnChainData.js';
import createPdf from './createPdf.js';
//import { utils } from 'ethers';
//create express server

//const baseUrl = "http://localhost:4000";
//const subgraphUrl = 'http://localhost:8000/subgraphs/name/openqdev/openq';

// async..await is not allowed in global scope, must use a wrapper
async function email(user: User, issueId: String, baseUrl: string) {
  return new Promise(async (_resolve, _reject) => {
    if (user && issueId && baseUrl) {
      // get on chain data
      /*  
      const invoiceReceivers = await Promise.all(
        uniqueAddresses.map(async (address: string) => {
          const checksummedAddress = utils.getAddress(address);
          const user = await getOffChainData(checksummedAddress, baseUrl);
          return user;
        })
      );
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "liam.fahey64@ethereal.email", // generated ethereal user
        pass: "FXKszMFP94MHGrAXA7", // generated ethereal password
      },
    });
    */
      console.log('exec');
      //  await createPdf(invoiceReceivers, invoiceSender, invoiceData);
      // send mail with defined transport object
      /*invoiceReceivers.forEach(async(invoiceReceiver)=>{


   let info = await transporter.sendMail({
        from: '"Openq" <invoicing@openq.com>', // sender address
        to: `${invoiceReceiver.email}, ${invoiceSender.email}`, // list of receivers
        subject: "Invoice", // Subject line
        text: JSON.stringify(invoiceData)+JSON.stringify(invoiceReceiver)+ JSON.stringify(invoiceSender), // plain text body
        html: "<b>Hello world?</b>",
        attachments: [{
          filename: 'output.pdf',
         path: "./output.pdf"
        }], // html body
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

})

  }*/
    }
  });
}

// mock claim data
//const body = { sentinel: { id: "local" }, matchReasons: [{ params: { bountyId: "I_kwDOGWnnz85TitT6", bountyAddress: "0x051f28dc3426cf1bd2f48b5aa665114303b1a8b1", organization: "MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4", closer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", payoutTime: { type: "BigNumber", hex: "0x634083e6" }, tokenAddress: "0x0000000000000000000000000000000000000000", volume: { type: "BigNumber", hex: "0x013f306a2409fc0000" }, bountyType: { type: "BigNumber", hex: "0x00" }, data: "0x000000000000000000000000e141e720664410014a3291d66f7e4ff8301035540000000000000000000000000000000000000000000000000000000000000080000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000134368726973746f706865722d5374657665727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000003368747470733a2f2f6769746875622e636f6d2f4f70656e514465762f4f70656e512d546573745265706f2f70756c6c2f36353400000000000000000000000000", version: { type: "BigNumber", hex: "0x01" } }, signature: "TokenBalanceClaimed(string,address,string,address,uint256,address,uint256,uint256,bytes,uint256)" }] };

// execute function (irl this will be exported and executed in another file.)
//email(body, baseUrl)
export default email;
