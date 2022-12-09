import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import sendPdf from './sendEmail.js';
import type { Response } from 'express';
const sendInvoice = async (
  deposit: Deposit,
  githubUser: string,
  freelancerAddress: string,
  res: Response,
  invoiceId: string,
  invoiceNumber: number
) => {
  // UPDATE THIS TO THE UUID OF THE CLIENT
  const uuid = deposit.funderUuid;
  const clientData = await getOffChainData('', uuid);
  // UPDATE THIS TO BE THE github user githubId.
  const freelancerData = await getOffChainData(githubUser, '');
  const freelancerInvoiceNumber = freelancerData.invoiceNumber + invoiceNumber;
  await createPdf([deposit], freelancerData, freelancerInvoiceNumber, clientData, freelancerAddress, invoiceId);

  await sendPdf(clientData, freelancerData, invoiceId, res);
};
export default sendInvoice;
