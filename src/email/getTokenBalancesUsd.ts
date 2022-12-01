import getToken from './getToken.js';
import getTokenValues from './getTokenValues.js';

const getTokenBalancesUsd = async (tokenBalances: TokenBalance[]): Promise<Prices> => {
  const tokenVolumes: any = {};

  for (let tokenBalance of tokenBalances) {
    const token = await getToken(tokenBalance.tokenAddress);
    const tokenAddress: string = token.address;
    delete token.name;
    delete token.symbol;
    delete token.path;
    delete token.chainId;
    tokenVolumes[tokenAddress as keyof typeof tokenVolumes] = token;

    tokenVolumes[tokenAddress as keyof typeof tokenVolumes].volume = tokenBalance.volume;
  }
  const data = { tokenVolumes, network: 'polygon-pos' };
  const url = `${process.env['OPENQ_COINAPI_URL']}:8081` + '/tvl';
  const tokenValues: Prices = await getTokenValues(data, url);
  return tokenValues;
};
export default getTokenBalancesUsd;
