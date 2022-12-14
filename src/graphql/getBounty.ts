const GET_BOUNTY = `
	query getBounty(
		$address: String!
	)   {
  bounty(id:$address){
  id
  invoiceable
  issuer{
    id
	  }
    deposits{
		id
      sender{id}
      tokenAddress
      funderUuid
      volume
    }
  } 
}
`;

export default GET_BOUNTY;
