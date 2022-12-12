interface Deposit extends TokenBalance {
  id: string;
  funderUuid: string;
  sender: {
    id: string;
  };
}

interface Bounty {
  id: string;
  issuer: {
    id: string;
  };
  invoiceable: boolean | null | undefined;
  deposits: Deposit[];
}

interface TokenBalance {
  volume: string;
  tokenAddress: string;
}
