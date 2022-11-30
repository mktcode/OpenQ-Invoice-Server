'use strict';
import getOnChainData from './getOnChainData.js';
import sendInvoice from './sendInvoice.js';
import { ethers } from 'ethers';

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
async function email(body: ClaimEvent) {
  const issueId = body.bountyAddress;

  const abiCoder = new ethers.utils.AbiCoder();
  const abiCodedData = abiCoder.decode(['address', 'string', 'address', 'string'], body.data);
  const githubUser = abiCodedData[1];
  const getData = async (issueId: string) => {
    const onChainData = await getOnChainData(issueId);
    onChainData.deposits.forEach((deposit: Deposit) => {
      sendInvoice(deposit, githubUser, body.closer);
    });
    return { ...onChainData };
  };

  await getData(issueId);
}

export default email;
