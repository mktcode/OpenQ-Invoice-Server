import axios, { AxiosResponse, AxiosError } from 'axios';
import GET_USER from '../graphql/getUser.js';

const getOffChainData = async (address: string, baseUrl: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: AxiosResponse = await axios.post(`${baseUrl}/graphql`, {
        query: GET_USER,

        variables: { address },
      });
      resolve(result.data.data.user);
    } catch (error: any | AxiosError) {
      reject(JSON.stringify(error.response.data));
    }
  });
};

export default getOffChainData;
