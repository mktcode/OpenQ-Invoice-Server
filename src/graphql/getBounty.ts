const GET_BOUNTY = `
	query getBounty(
		$address: String!
	)   {
  bounty(id:$address){
    deposits{
      sender{id}
      tokenAddress
      volume
    }
  } 
}
`;

export default GET_BOUNTY;
