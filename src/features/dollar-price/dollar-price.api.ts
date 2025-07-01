const getExternalPrice = async () => {
  const apiBase = process.env.DOLLAR_PRICE_API_BASE;
  const apiKey = process.env.DOLLAR_PRICE_API_KEY;
  const url = `${apiBase}/rates/latest?apikey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();

  return data.rates["PEN"];
};

const dollarPriceApi = {
  getExternalPrice,
};

export default dollarPriceApi;
