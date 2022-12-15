const GET_USER = `
	query getUser(
		$github: String,
        $uuid: String
	) {
  user(github: $github, id: $uuid){  
	watchedBountyIds
	github
	company
	invoicingEmail
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
