import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import email from './email/index.js';

const server = () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env['PORT'];

  app.get('/', (_req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  // expects bountyId, bountyAddress,
  app.post('/email', (_req: Request, res: Response) => {
    const issueId = 'I_kwDOGWnnz85WLs-i';
    const user = {
      address: '0xa7b7DcBb35A58294Ba9E51cC9AA20670E124536b',
      company: 'OpenQ',
      billingName: 'Christopher Stevers',
      city: 'Gadshill',
      streetAddress: '4156 Perth line 44',
      country: 'Canada',
      phoneNumber: '519-393-6855',
      province: 'Alberta',
      email: 'christopher.stevers1@gmail.com',
      invoiceNumber: 4,
      taxId: '3123423',
      vatNumber: '212342134',
      vatRate: 23.23,
      memo: 'high tax',
    };
    const body = { issueId, user };

    const baseUrl = 'http://localhost:4000';
    email(user, issueId, baseUrl);
    res.send('Express + TypeScript Server');
  });
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
};

export default server;
