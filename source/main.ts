import { GeckoApi } from "./api/geckoApi";
import Colors from "./color";
import { Chart } from "./components/list/chart";
import { Table } from "./components/list/table";
import Parser from "./parameter";

/**
 * Our api.
 */
const gecko = new GeckoApi();

/**
 * All currencies we support with their corresponding symbol.
 */
const currencies = {
	"eur": "€",
	"usd": "$",
	"gbp": "£",
	"cad": "C$",
	"aud": "A$",
	"brl": "R$",
	"cny": "¥",
	"dkk": "kr",
	"krw": "₩",
	"hkd": "HK$",
	"inr": "₹",
	"jpy": "¥",
	"nzd": "NZ$",
	"rub": "₽",
	"sek": "kr",
	"sgd": "S$",
}

/**
 * Interpolating the data.
 * @param data the array to interpolate
 * @param maxWidth
 */
function interpolate(data: any[], maxWidth: number) {
	const width = maxWidth || data.length;
	const step = Math.floor(data.length / width);

	const result = [];

	for (let i = 0; i < width; i++) {
		const start = i * step;
		const end = (i + 1) * step;

		result.push(data.slice(start, end).reduce((sum, value) => sum + value, 0) / step);
	}

	return result;
}

/**
 * Displaying a table of the top 10 coins.
 * @param currency The currency we show the data in.
 * @param precision How accurate we want the data to be.
 */
async function displayTable(currency: string, precision: number) {
	const coins = await gecko.coin.markets(currency);

	const table = new Table([
		[Colors.underline + "Id", Colors.underline + "Price", Colors.underline + "24h High", Colors.underline + "24h Low", Colors.underline + "24h Change"],
		...coins.map((coin) => {
			const currencyChar = currencies[currency as keyof typeof currencies] || currency.toUpperCase();

			const price = parseFloat(coin["current_price"]).toFixed(precision).toString() + currencyChar;
			const high = parseFloat(coin["high_24h"]).toFixed(precision).toString() + currencyChar;
			const low = parseFloat(coin["low_24h"]).toFixed(precision).toString() + currencyChar;
			const change = parseFloat(coin["price_change_24h"]).toFixed(precision).toString() + currencyChar;

			return [coin["id"], price, high, low, change];
		}),
	], {
		padding: 2,
		header: true,
		scroll: true,
	}, (async entry => {
		// Clearing the screen.
		process.stdout.write("\x1B[2J\x1B[0f");

		// The data to show the chart
		const chartData = (await gecko.coin.marketChart(entry.raw[0], currency)).prices.map((a: any) => a[1]);

		// The chart. (minus 2 because of "49011.72580 ┤" at the beginning)
		const chart = new Chart(interpolate(chartData, process.stdout.columns - Math.max(...chartData).toFixed(precision).length - 2), precision, {
			height: Math.ceil(process.stdout.rows / 2),
		});

		chart.print();
	}));

	table.print();
}

/**
 * The main function.
 */
async function run() {
	const parameter = new Parser()
		.param("currency", String)
		.param("precision", Number)
		.parse();

	// Clearing the screen.
	process.stdout.write("\x1B[2J\x1B[0f");

	await displayTable(
		parameter.get("currency") == false ? "usd" : parameter.get("currency"),
		parameter.get("precision") == false ? 2 : parameter.get("precision")
	);
}

run().then(_ => {
	/* Done */
});