import axios from 'axios';

const getTokenValues = (tokenVolumes: object, url: string): Promise<Prices> => {
  const promise = new Promise((resolve, reject) => {
    axios
      .post(url, tokenVolumes)
      .then((result) => {
        const prices = result.data as Prices;
        resolve(prices);
      })
      .catch((error) => {
        reject(error);
      });
  }) as Promise<Prices>;
  return promise;
};

export default getTokenValues;
