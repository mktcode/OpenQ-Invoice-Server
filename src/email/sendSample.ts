import type { Response } from 'express';

import getOffChainData from './getOffChainData.js';
import createPdf from './createPdf.js';
import fs from 'fs';

const sendSample = async (deposit: Deposit, githubUser: string, freelancerAddress: string, res: Response) => {
  const clientData: User = {
    address: '0x1ccc33d06c9e6f1953fda9e26f99c70dc848e18d4479aef37d95b94070845355',
    company: 'Company',
    billingName: 'Test Company Name',
    city: 'Test City',
    streetAddress: 'Test Street Address',
    country: 'Test Country',
    phoneNumber: 'Test Phone Number',
    province: 'Test Province',
    email: 'email@example.com',
    invoiceNumber: 1,
    taxId: 'test tax id',
    vatNumber: 'test vat number',
    vatRate: 13,
    memo: 'Your memo here',
    github: 'Test-Github',
    twitter: 'https://twitter.com/Test-Twitter',
    discord: 'Test-Discord#0000',
    watchedBountyIds: [],
    postalCode: 'N1N 1N1',
  };
  console.log(githubUser);
  const actualGithubUser = 'MDQ6VXNlcjcyMTU2Njc5';
  const freelancerData = await getOffChainData(actualGithubUser, '');
  console.log(freelancerData);

  await createPdf([deposit], freelancerData, 2, clientData, freelancerAddress, deposit.id);
  var stream = fs.createReadStream(`tmp/sample-${freelancerAddress}.pdf`);
  var filename = 'WhateverFilenameYouWant.pdf';
  // Be careful of special characters

  filename = encodeURIComponent(filename);
  // Ideally this should strip them

  res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  stream.pipe(res);
  const deletePdf = () => {
    fs.unlink(`tmp/sample-${freelancerAddress}.pdf`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    setTimeout(deletePdf, 5000);
  };
};
export default sendSample;
