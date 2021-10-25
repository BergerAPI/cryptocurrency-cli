import asciichart from 'asciichart'
import CoinGecko from 'coingecko-api'

// Our client to fetch data from CoinGecko
const CoinGeckoClient = new CoinGecko();

// Getting the price of bitcoin (today)
const btc = await CoinGeckoClient.coins.fetchMarketChart('btc')
const prices = btc[ "data" ][ "prices" ]

// Filling the data
const chartData = prices.filter((_, index) => index % 2 != 0).map(value => {
	// We want to ignore the timestamp rn
	return value[ 1 ]
});

console.log(asciichart.green + "Bitcoin Prices this day" + asciichart.reset)

console.log()

console.log(asciichart.plot(chartData, {
	colors: [ asciichart.green ],
	offset: 5,
	height: 10,
}))