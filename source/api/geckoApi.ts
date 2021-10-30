import axios from "axios";

/**
 * Coin features.
 */
class CoinEndpoint {

	/**
	 * Listing every coing available on CoinGecko.
	 */
	public async list() {
		return (await axios.get("https://api.coingecko.com/api/v3/coins/list")).data as Array<any>;
	}

	/**
	 * Use this to obtain all the coins market data (price, market cap, volume)
	 * @param currency Currency to get the price in.
	 */
	public async markets(currency: string = "usd", count: number = 10) {
		return (await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`)).data as Array<any>;
	}

	/**
	 * Getting informations about a coin.
	 */
	public async get(id: string) {
		return (await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)).data;
	}

	/**
	 * Fetching the chart informations.
	 * @param id Coin id.
	 * @param currency The currency to get the price in.
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