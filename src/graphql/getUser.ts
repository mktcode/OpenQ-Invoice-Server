const GET_USER = `
	query getUser(
		$address: String!
	) {
  user(address: $address){  
	watchedBountyIds
	github
	address
	email
	company
	email
	city
	streetAddress
	country
	province
	discord
	github
	twitter
	postalCode
	billingName
	invoiceNumber
	phoneNumber
	taxId
	vatNumber
	vatRate
	memo    
  }
  
  
}
`;

export default GET_USER;
