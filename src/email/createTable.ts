import getTokenBalancesUsd from './getTokenBalancesUsd.js';

const createTable = async (tokenBalances: TokenBalance[], freelancerData: User) => {
  const prices: Prices = await getTokenBalancesUsd(tokenBalances)!;
  const formatCurrency = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  const tokenPrices = prices.tokens;
  const rows = [];
  const numberRows = [];
  const headers = ['Price', 'VAT', 'Amount'];
  rows.push(headers);
  let priceTotalWithTax = 0;
  let priceTotalTax = 0;
  for (let key in tokenPrices) {
    const totalPrice = tokenPrices[key] as number;
    priceTotalWithTax += totalPrice;
    const taxPrice = totalPrice / (1 + freelancerData.vatRate);
    priceTotalTax += taxPrice;
    const preTaxPrice = totalPrice - taxPrice;
    const tokenBalanceRow = [formatCurrency(preTaxPrice), `${freelancerData.vatRate}%`, formatCurrency(preTaxPrice)];

    rows.push(tokenBalanceRow);
    const numberRow = [preTaxPrice, freelancerData.vatRate, preTaxPrice];
    numberRows.push(numberRow);
  }

  const sumOfRowTotals = numberRows.reduce((acc, row) => {
    if (row[2]) {
      return acc + row[2];
    }
    return acc;
  }, 0);
  rows.push(['', 'Net', formatCurrency(sumOfRowTotals)]);
  rows.push(['', `Vat ${freelancerData.vatRate}%`, formatCurrency(priceTotalTax)]);
  rows.push(['', 'Total', formatCurrency(priceTotalWithTax)]);

  // Embed a font, set the font size, and render some text
  return {
    headers,
    rows,
  };
};
export default createTable;
