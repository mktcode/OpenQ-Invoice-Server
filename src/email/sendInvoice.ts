import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import sendEmail from './sendEmail.js';
const sendInvoice = async (
  deposit: Deposit,
  githubUser: string,
  freelancerAddress: string,
  invoiceId: string,
  invoiceNumber: number
) => {
  // UPDATE THIS TO THE UUID OF THE CLIENT
  const uuid = deposit.funderUuid;
  const clientData = await getOffChainData('', uuid);
  // UPDATE THIS TO BE THE github user githubId.
  console.log(githubUser, 'github user last executed');
  const freelancerData = await getOffChainData(githubUser, '');
  console.log('freelancerData', freelancerData);
  if (typeof freelancerData === null || typeof clientData === null) {
    return;
  }
  const freelancerInvoiceNumber = freelancerData?.invoiceNumber + invoiceNumber;
  await createPdf([deposit], freelancerData, freelancerInvoiceNumber, clientData, freelancerAddress, invoiceId).then(
    async () => {
      await sendEmail(clientData, freelancerData, invoiceId);
    }
  );
};
export default sendInvoice;
