const GET_USER = `
	query getUser(
		$github: String,
        $uuid: String
	) {
  user(github: $github, id: $uuid){  
	watchedBountyIds
	github
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
