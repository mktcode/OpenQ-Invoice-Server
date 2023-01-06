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
  payoutTime: string;
  tokenAddress: string;
  volume: string;
  bountyType: string;
  data: string;
}

// async..await is not allowed in global scope, must use a wrapper
async function email(body: ClaimEvent, res: Response) {
  const issueId = body.bountyAddress;
  const abiCoder = new ethers.utils.AbiCoder();
  const abiCodedData = abiCoder.decode(['address', 'string', 'address', 'string'], body.data);
  const githubUser = abiCodedData[1];

  const onChainData = await getOnChainData(issueId);

  const deposits = onChainData.deposits;
  if (!onChainData.invoiceable) {
    res.json({ message: 'Not invoiceable' });
  } else {
    if (body.bountyType === '0') {
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
      const volume = ethers.BigNumber.from(body.volume).toString();
      const firstDeposit = deposits[0]!;
      const tokenBalance = {
        funderUuid: firstDeposit.funderUuid,
        sender: { id: firstDeposit.sender.id },
        id: firstDeposit.id,
        tokenAddress: body.tokenAddress,
        volume: volume,
      };
      const invoiceId = onChainData.id + body.closer + parseInt(body.payoutTime);
      await sendInvoice(tokenBalance, githubUser, body.closer, invoiceId, 0).then(() => {
        res.json({ message: 'Email sent' });
      });
    }
  }
}

export default email;
