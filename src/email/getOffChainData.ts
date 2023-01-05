import axios, { AxiosResponse, AxiosError } from 'axios';
import GET_USER from '../graphql/getUser.js';

const getOffChainData = async (github: string, uuid: string) => {
  const githubObj = github ? { github } : {};
  const uuidObj = uuid ? { uuid } : {};
  try {
    const url: string = process.env['OPENQ_API_URL']!;
    const result: AxiosResponse = await axios.post(`${url}/graphql`, {
      query: GET_USER,

      variables: { ...githubObj, ...uuidObj },
    });
    return result.data.data.user;
  } catch (error: any | AxiosError) {
    throw JSON.stringify(error.response.data);
  }
};

export default getOffChainData;
