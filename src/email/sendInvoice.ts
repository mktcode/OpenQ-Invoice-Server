import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import sendPdf from './sendEmail.js';
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
  console.log(githubUser, 'github user');
  const freelancerData = await getOffChainData(githubUser, '');
  if (typeof freelancerData === null || typeof clientData === null) {
    return;
  }
  const freelancerInvoiceNumber = freelancerData?.invoiceNumber + invoiceNumber;
  await createPdf([deposit], freelancerData, freelancerInvoiceNumber, clientData, freelancerAddress, invoiceId).then(
    async () => {
      await sendPdf(clientData, freelancerData, invoiceId);
    }
  );
};
export default sendInvoice;
