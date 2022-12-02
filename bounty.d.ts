interface Deposit extends TokenBalance {
  id: string;
  sender: {
    id: string;
  };
}

interface Bounty {
  id: string;
  issuer: {
    id: string;
  };
  deposits: Deposit[];
}

interface TokenBalance {
  volume: string;
  tokenAddress: string;
}
