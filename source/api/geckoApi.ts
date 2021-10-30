import axios from "axios";

/**
 * Coin features.
 */
class CoinEndpoint {

	/**
	 * Use this to obtain all the coins market data (price, market cap, volume)
	 * @param currency Currency to get the price in.
	 * @param count how many we want.
	 */
	public async markets(currency: string = "usd", count: number = 10) {
		return (await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`)).data as Array<any>;
	}

	/**
	 * Getting information about a coin.
	 */
	public async get(id: string) {
		return (await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)).data;
	}

	/**
	 * Fetching the chart information.
	 * @param id Coin id.
	 * @param currency The currency to get the price in.
	 * @param days time span
	 * @returns any
	 */
	public async marketChart(id: string, currency: string = "usd", days: number = 1) {
		return (await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)).data;
	}
}

/**
 * All Endpoints.
 */
export class GeckoApi {
	public coin: CoinEndpoint;

	constructor() {
		this.coin = new CoinEndpoint();
	}
}