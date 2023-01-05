import axios, { AxiosResponse } from 'axios';

import GET_BOUNTY from '../graphql/getBounty.js';

const getOnChainData = async (address: string) => {
  /**
   *
   * @param {*} sortOrder
   * @param {skip for offset based pagination} startAt
   * @param {batch size} quantity
   * @returns
   */

  try {
    const lowerCaseAddress = address.toLowerCase();
    console.log('address', lowerCaseAddress);
    const url: string = process.env['OPENQ_SUBGRAPH_HTTP_URL']!;
    console.log('url', url);
    const result: AxiosResponse = await axios.post(url, {
      query: GET_BOUNTY,
      variables: { address: lowerCaseAddress },
    });
    console.log(result.data.toString(), 'results');
    const bounty = result.data.data.bounty as Bounty;
    return bounty;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getOnChainData;
