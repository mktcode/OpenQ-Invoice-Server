'use strict';
import getOnChainData from './getOnChainData.js';
import sendInvoice from './sendInvoice.js';
import { ethers } from 'ethers';
import type { Response } from 'express';

interface ClaimEvent {
  bountyId: string;
  bountyAddress: string;
  organization: string;
  closer: string;
  payoutTime: { hex: string };
  tokenAddress: string;
  volume: { hex: string };
  bountyType: { hex: string };
  data: string;
  version: { hex: string };
}

// async..await is not allowed in global scope, must use a wrapper
async function email(body: ClaimEvent, res: Response) {
  const issueId = body.bountyAddress;

  const abiCoder = new ethers.utils.AbiCoder();
  const abiCodedData = abiCoder.decode(['address', 'string', 'address', 'string'], body.data);
  const githubUser = abiCodedData[1];

  const onChainData = await getOnChainData(issueId);

  const deposits = onChainData.deposits;
  if (body.bountyType.hex === '0x00') {
    // iterate over deposits

    for (let i = 0; i < deposits.length; i++) {
      const deposit = deposits[i]!;
      // if last deposit, res.json then send invoice
      if (i === deposits.length - 1) {
        sendInvoice(deposit, githubUser, body.closer, onChainData.id, i).then(() => {
          res.json({ message: 'Email sent' });
        });
      } else {
        sendInvoice(deposit, githubUser, body.closer, onChainData.id, i);
      }
    }
  } else if (deposits.length > 0) {
    // big number to string
    const volume = ethers.BigNumber.from(body.volume.hex).toString();
    const firstDeposit = deposits[0]!;
    const tokenBalance = {
      funderUuid: firstDeposit.funderUuid,
      sender: { id: firstDeposit.sender.id },
      id: firstDeposit.id,
      tokenAddress: body.tokenAddress,
      volume: volume,
    };
    const invoiceId = onChainData.id + body.closer + body.payoutTime.hex;
    await sendInvoice(tokenBalance, githubUser, body.closer, invoiceId, 0).then(() => {
      res.json({ message: 'Email sent' });
    });
  }
}

export default email;
