import axios, { AxiosResponse } from 'axios';
import GET_USER from '../graphql/getUser.js';

interface User {
  company: string;
  country: string;
  province: string;
  address: string;
  email: string;
}

const getFreelancerData = async (freelancerAddress: string) => {
  try {
    const url: string = process.env['OPENQ_API_URL']!;
    const result: AxiosResponse = await axios.post(url, {
      query: GET_USER,
      variables: { address: freelancerAddress },
    });
    const user = result.data.data.user as User;
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};
export default getFreelancerData;
