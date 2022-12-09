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
    deposits.forEach((deposit: Deposit, index: number) => {
      sendInvoice(deposit, githubUser, body.closer, res, deposit.id, index);
    });
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
    sendInvoice(tokenBalance, githubUser, body.closer, res, invoiceId, 0);
  }
}

export default email;
