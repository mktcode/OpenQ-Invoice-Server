import axios, { AxiosResponse } from 'axios';

import GET_BOUNTY from '../graphql/getBounty.js';

const getOnChainData = async (address: string) => {
  /**
   *
   * @param {*} sortOrder
   * @param {skip for offset based pagination} startAt
   * @param {barch size} quantity
   * @returns
   */

  try {
    const lowerCaseAddress = address.toLowerCase();
    const url: string = process.env['OPENQ_SUBGRAPH_HTTP_URL']!;
    const result: AxiosResponse = await axios.post(url, {
      query: GET_BOUNTY,
      variables: { address: lowerCaseAddress },
    });
    const bounty = result.data.data.bounty as Bounty;
    return bounty;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getOnChainData;
