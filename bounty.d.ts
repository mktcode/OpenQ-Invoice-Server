interface Deposit extends TokenBalance {
  id: string;
  sender: {
    id: string;
  };
}

interface Bounty {
  deposits: Deposit[];
}
interface TokenBalance {
  volume: string;
  tokenAddress: string;
}
