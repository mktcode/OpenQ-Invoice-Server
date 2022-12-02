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

interface Deposit {
  id: string;
  volume: string;
  tokenAddress: string;
  sender: {
    id: string;
  };
}

// async..await is not allowed in global scope, must use a wrapper
async function email(body: ClaimEvent, res: Response) {
  const issueId = body.bountyAddress;

  const abiCoder = new ethers.utils.AbiCoder();
  const abiCodedData = abiCoder.decode(['address', 'string', 'address', 'string'], body.data);
  const githubUser = abiCodedData[1];

  if (body.bountyType.hex === '0x00') {
    const onChainData = await getOnChainData(issueId);
    const deposits = onChainData.deposits;
    deposits.forEach((deposit: Deposit) => {
      sendInvoice(deposit, githubUser, body.closer, res, deposit.id, deposit.sender.id);
    });
  } else {
    // big number to string
    const volume = ethers.BigNumber.from(body.volume.hex).toString();
    const tokenBalance = {
      tokenAddress: body.tokenAddress,
      volume: volume,
    };
    const onChainData = await getOnChainData(issueId);
    const invoiceId = onChainData.id + body.closer + body.payoutTime.hex;
    sendInvoice(tokenBalance, githubUser, body.closer, res, invoiceId, onChainData.issuer.id);
  }
}

export default email;
