import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import sendPdf from './sendEmail.js';
import { ethers } from 'ethers';
import type { Response } from 'express';
const sendInvoice = async (
  deposit: TokenBalance,
  githubUser: string,
  freelancerAddress: string,
  res: Response,
  invoiceId: string,
  clientAddress: string
) => {
  const checksummedAddress = ethers.utils.getAddress(clientAddress);
  console.log(githubUser);
  const clientData = await getOffChainData(checksummedAddress);
  const freelancerData = await getOffChainData(freelancerAddress);
  await createPdf([deposit], freelancerData, clientData, freelancerAddress, invoiceId);

  await sendPdf(clientData, freelancerData, invoiceId, res);
};
export default sendInvoice;
