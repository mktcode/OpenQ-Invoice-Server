const GET_BOUNTY = `
	query getBounty(
		$address: String!
	)   {
  bounty(id:$address){
  id
  issuer{
    id
	  }
    deposits{
		id
      sender{id}
      tokenAddress
      volume
    }
  } 
}
`;

export default GET_BOUNTY;
