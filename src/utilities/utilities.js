export const getProductPrice = (prices, selectedCurrency) => {
  if (!selectedCurrency) return 0;
  let selectedCurrencyIndex = prices.findIndex(
    (price) => selectedCurrency.label === price.currency.label
  );
  return `${prices[selectedCurrencyIndex].currency.symbol} ${prices[selectedCurrencyIndex].amount}`;
};

export const getAllPrices = (products, selectedCurrency) => {
  if (!selectedCurrency) return {};
  let totalPrice = 0;
  Object.keys(products).forEach((productKey) => {
    let selectedCurrencyIndex = products[productKey].prices.findIndex(
      (price) => selectedCurrency.label === price.currency.label
    );
    totalPrice =
      totalPrice +
      products[productKey].totalQuantity *
        products[productKey].prices[selectedCurrencyIndex].amount;
  });
  const tax = totalPrice * 0.21;
  let finalPrice = tax + totalPrice;
  return {
    totalPrice: totalPrice.toFixed(2),
    tax: tax.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
  };
};
