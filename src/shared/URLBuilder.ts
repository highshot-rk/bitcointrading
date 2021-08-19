export function coinHistoryURL(
  path: string,
  coinId: string,
  days: number
): URL {
  const baseUrl = new URL('https://api.coingecko.com');
  baseUrl.pathname += `/api/v3/${path}/${coinId}/market_chart`;

  baseUrl.searchParams.append('vs_currency', 'eur');
  baseUrl.searchParams.append('days', days + '');

  return baseUrl;
}

export function coinListURL(
  path: string,
  currency: string,
  perPage: number,
  page: number
): URL {
  // create base URL
  const baseUrl = new URL('https://api.coingecko.com');
  // append path to the base URL pathname
  baseUrl.pathname += `api/v3/${path}`;
  // append search parameters
  baseUrl.searchParams.append('vs_currency', currency);
  baseUrl.searchParams.append('order', 'market_cap_desc');
  baseUrl.searchParams.append('per_page', perPage + '');
  baseUrl.searchParams.append('page', page + '');
  baseUrl.searchParams.append('sparkline', 'true');

  baseUrl.href +=
    '&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y';

  return baseUrl;
}

export function coinDetailURL(path: string, coinId: string): URL {
  const baseUrl = new URL('https://api.coingecko.com');
  baseUrl.pathname += `/api/v3/${path}/${coinId}`;
  return baseUrl;
}
