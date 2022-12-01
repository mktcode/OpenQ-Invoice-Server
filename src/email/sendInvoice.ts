import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import sendPdf from './sendPdf.js';
import { ethers } from 'ethers';
import type { Response } from 'express';
const sendInvoice = async (deposit: Deposit, githubUser: string, freelancerAddress: string, res: Response) => {
  const checksummedAddress = ethers.utils.getAddress(deposit.sender.id);
  console.log(githubUser);
  const clientData = await getOffChainData(checksummedAddress);
  const freelancerData = await getOffChainData(freelancerAddress);
  await createPdf([deposit], freelancerData, clientData, freelancerAddress, deposit.id);

  await sendPdf(clientData, freelancerData, deposit.id, res);
};
export default sendInvoice;
