import CoinGecko from 'coingecko-api'

// Our client to fetch data from CoinGecko
const CoinGeckoClient = new CoinGecko();

export const styles = {
	"lines": [ '┼', '┤', '│', '│', '│', '│', '│', '│', '│', '│' ],
	"smooth": [ '┼', '┤', '╶', '╴', '─', '╰', '╭', '╮', '╯', '│' ],
	"unsmooth": [ '┼', '┤', '-', '-', '-', '\\', '/', '\\', '/', '|' ],
	"points": [ '┼', '┤', '.', '.', '.', '.', '.', '.', '.', '.' ],
	"dots": [ '┼', '┤', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ],
	"blocks": [ '┼', '┤', '█', '█', '█', '█', '█', '█', '█', '█' ],
	"diamonds": [ '┼', '┤', '◈', '◆', '◇', '◈', '◆', '◇', '◈', '◆' ],
}

/**
 * Converting to this format: "Hello"
 * @param {string} name 
 */
export function betterName(name) {
	return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

/**
 * Getting the price of one coin.
 * 
 * @param {string} coinName 
 * @param {string} currency 
 * @returns 
 */
export async function getCoinPrice(coinName, currency) {
	const price = await CoinGeckoClient.simple.price({
		ids: coinName,
		vs_currencies: [ currency ],
	});

	if (!price) {
		console.error(`CoinGecko: No data for ${coinName}`)
		process.exit(1)
	}

	return price[ "data" ][ coinName ][ currency ];
}

/**
 * Getting data for some coins.
 * @returns {string}
 */
export async function getCoinsList() {
	const coinsList = await CoinGeckoClient.coins.all({
		per_page: 25,
	});

	return coinsList.data;
}

/**
 * Getting the price of one coin.
 * @param {string} coin 
 * @param {string} currency
 * @param {number} elementIndex 
 */
export async function getCoinGeckoData(coinName, currency, elementIndex) {
	const coin = await CoinGeckoClient.coins.fetchMarketChart(coinName, { vs_currency: currency });
	const prices = coin[ "data" ][ "prices" ]

	if (!prices) {
		console.error(`CoinGecko: No data for ${coinName}`)
		process.exit(1)
	}

	return prices.filter((_, index) => index % elementIndex == 0).map(value => {
		// We want to ignore the timestamp rn
		return value[ 1 ]
	});
}

/**
 * Getting the prices of a list of coins
 * 
 * @param {Array<string>} coins 
 * @param {string} currency 
 * @param {number} elementIndex 
 * @returns 
 */
export async function getChartData(coins, currency, elementIndex) {
	return coins.map(async (x) => {
		return await getCoinGeckoData(x, currency, elementIndex);
	});
}