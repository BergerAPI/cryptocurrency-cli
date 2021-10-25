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