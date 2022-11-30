import axios, { AxiosResponse, AxiosError } from 'axios';
import GET_USER from '../graphql/getUser.js';

const getOffChainData = async (address: string) => {
  try {
    const url: string = process.env['OPENQ_API_URL']!;
    const result: AxiosResponse = await axios.post(`${url}/graphql`, {
      query: GET_USER,

      variables: { address },
    });
    return result.data.data.user;
  } catch (error: any | AxiosError) {
    console.log(error);
    throw JSON.stringify(error.response.data);
  }
};

export default getOffChainData;
