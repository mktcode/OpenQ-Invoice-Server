import axios, { AxiosResponse } from 'axios';

import GET_BOUNTY from '../graphql/getBounty.js';

const getOnChainData = async (address: string, subgraphUrl: string) => {
  /**
   *
   * @param {*} sortOrder
   * @param {skip for offset based pagination} startAt
   * @param {barch size} quantity
   * @returns
   */

  return new Promise(async (resolve, _reject) => {
    try {
      const result: AxiosResponse = await axios.post(`${subgraphUrl}`, {
        query: GET_BOUNTY,
        variables: { address: address },
      });
      resolve(result.data);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  });
};

export default getOnChainData;
