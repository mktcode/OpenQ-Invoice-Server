import localIndexable from '../../constants/openq-local-indexable.json' assert { type: 'json' };
import polygonMainnetIndexable from '../../constants/openq-polygon-mainnet-indexable.json' assert { type: 'json' };
import indexable from '../../constants/polygon-mainnet-indexable.json' assert { type: 'json' };
import { ethers } from 'ethers';

const getToken = (address: string) => {
  let openqIndexableTokens: any = {};
  switch (process.env['DEPLOY_ENV']) {
    case 'local':
      openqIndexableTokens = localIndexable;
      break;
    case 'docker':
      openqIndexableTokens = localIndexable;
      break;
    case 'staging':
      openqIndexableTokens = polygonMainnetIndexable;
      break;
    case 'production':
      openqIndexableTokens = polygonMainnetIndexable;
      break;
  }
  const checkSummedAddress = ethers.utils.getAddress(address);
  const indexableLowerCaseAddress = indexable[address.toLowerCase() as keyof typeof indexable];
  if (indexableLowerCaseAddress) {
    return indexableLowerCaseAddress;
  }
  const indexableChecksummedAddress = indexable[checkSummedAddress as keyof typeof indexable];
  if (indexableChecksummedAddress) {
    return indexableChecksummedAddress;
  }
  const openqIndexableTokensChecksummedAddress: any =
    openqIndexableTokens?.[checkSummedAddress as keyof typeof openqIndexableTokens];
  if (openqIndexableTokensChecksummedAddress) {
    return openqIndexableTokensChecksummedAddress;
  }
  return {
    chainId: 137,
    name: `${address.substring(0, 5)}
		  ...
		  ${address.substring(39)}`,
    symbol: 'CUSTOM',
    decimals: 18,
    address: checkSummedAddress,
    path: '/crypto-logos/ERC20.svg',
  };
};
export default getToken;
