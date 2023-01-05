import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import email from './email/index.js';
import sample from './email/sample.js';

const server = () => {
  dotenv.config();
  const jsonParser = bodyParser.json();

  const apiSecret: string = process.env['OPENQ_API_SECRET']!;
  axios.defaults.headers.common['Authorization'] = apiSecret;

  const app: Express = express();
  const port: string = process.env['PORT']!;

  app.get('/', (_req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
  app.post('/email', jsonParser, (req: Request, res: Response) => {
    const { body } = req;
    //console.log(req);
    console.log(body, 'acutal body');
    try {
      const mockBody = {
        bountyId: 'I_kwDOGWnnz85ap6__',
        bountyAddress: '0xA4B47b3B9FB1635b646be4Eb6E5B5A920bf93f52',
        organization: 'MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4',
        closer: '0xa7b7DcBb35A58294Ba9E51cC9AA20670E124536b',
        payoutTime: '1672932946',
        tokenAddress: '0x0000000000000000000000000000000000000000',
        volume: '10000000000000000',
        bountyType: '0',
        data: '0x000000000000000000000000a4b47b3b9fb1635b646be4eb6e5b5a920bf93f520000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a7b7dcbb35a58294ba9e51cc9aa20670e124536b00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000144d44513656584e6c636a63794d5455324e6a6335000000000000000000000000000000000000000000000000000000000000000000000000000000000000003368747470733a2f2f6769746875622e636f6d2f4f70656e514465762f4f70656e512d546573745265706f2f70756c6c2f38303700000000000000000000000000',
      };
      console.log('mockBody', mockBody);
      email(body, res);
    } catch (e) {
      console.log(e, 'could not send email');
      //    res.json({ status: 'could not send email' });
    }
  });

  app.get('/preview', jsonParser, async (req, res) => {
    const githubId: string = req.query['githubId'] as string;
    const account: string = req.query['githubId'] as string;
    if (!githubId || !account) res.send('missing githubId or account');
    const body = {
      bountyId: 'I_kwDOGWnnz85Utn1m',
      bountyAddress: '0x001192fa1ea7a2816445ec2efd5843c1a60562aa',
      organization: 'MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4',
      closer: account,
      payoutTime: { type: 'BigNumber', hex: '0x63861f57' },
      tokenAddress: '0x0000000000000000000000000000000000000000',
      volume: { type: 'BigNumber', hex: '0x4563918244f40000' },
      bountyType: { type: 'BigNumber', hex: '0x00' },
      data: '0x000000000000000000000000001192fa1ea7a2816445ec2efd5843c1a60562aa000000000000000000000000000000000000000000000000000000000000008000000000000000000000000090f79bf6eb2c4f870365e785982e1f101e93b90600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000134368726973746f706865722d5374657665727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000003368747470733a2f2f6769746875622e636f6d2f4f70656e514465762f4f70656e512d546573745265706f2f70756c6c2f36383900000000000000000000000000',
      version: { type: 'BigNumber', hex: '0x01' },
    };
    try {
      await sample(body, res, githubId);
    } catch (e) {
      console.log(e, 'could not produce preview');
    }
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

export default server;
