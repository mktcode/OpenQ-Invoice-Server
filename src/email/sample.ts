'use strict';
import getOnChainData from './getOnChainData.js';
import sendSample from './sendSample.js';
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
const sample = async (body: ClaimEvent, res: Response, githubId: string) => {
  const issueId = body.bountyAddress;
  const closer = body.closer;

  const getData = async (issueId: string) => {
    const onChainData = await getOnChainData(issueId);
    const deposit: Deposit = {
      id: `sample-${body.closer}`,
      sender: { id: '0x1ccc33d06c9e6f1953fda9e26f99c70dc848e18d4479aef37d95b94070845355' },
      tokenAddress: '0x0000000000000000000000000000000000000000',
      volume: '45000000000000000000',
      funderUuid: '0x1ccc33d06c9e6f1953fda9e26f99c70dc848e18d4479aef37d95b94070845355',
    };
    await sendSample(deposit, githubId, body.closer, res);

    return { ...onChainData };
  };

  await getData(issueId);
};

export default sample;
