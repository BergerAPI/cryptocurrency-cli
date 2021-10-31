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
	// We want an array that has the same length as the maxWidth.
	const newData = new Array(maxWidth);

	// The index of the last element.
	const lastIndex = data.length - 1;

	// The index of the first element.
	const firstIndex = 0;

	// The index of the current element.
	let currentIndex = 0;

	// The amount of elements we have to interpolate.
	let interpolated = 0;

	// We loop through the array.
	for (let i = 0; i < newData.length; i++) {
		// If the current index is bigger than the last index, we are done.
		if (currentIndex > lastIndex) {
			break;
		}

		// The amount of elements we have to interpolate.
		interpolated = lastIndex - currentIndex;

		// The amount of elements we have to interpolate.
		const interpolation = (i / newData.length) * interpolated;

		// The index of the element we are interpolating.
		const index = Math.floor(interpolation + currentIndex);

		// If the index is bigger than the last index, we set the last index.
		if (index > lastIndex) {
			newData[i] = data[lastIndex];
		} else {
			// If the index is bigger than the first index, we set the first index.
			if (index > firstIndex) {
				newData[i] = data[index];
			} else {
				newData[i] = data[firstIndex];
			}
		}
	}

	return newData;

}

/**
 * Displaying a table of the top 10 coins.
 * @param currency The currency we show the data in.
 * @param precision How accurate we want the data to be.
 */
async function displayTable(currency: string, precision: number, days: number) {
	const currencyChar = currencies[currency as keyof typeof currencies] || currency.toUpperCase();
	const coins = await gecko.coin.markets(currency);

	const table = new Table([
		[Colors.underline + "Id", Colors.underline + "Price", Colors.underline + "24h High", Colors.underline + "24h Low", Colors.underline + "24h Change"],
		...coins.map((coin) => {
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
		const chartData = (await gecko.coin.marketChart(entry.raw[0], currency, days)).prices.map((a: any) => a[1]);

		// The function to format the labels
		const format = (x: any) => parseFloat(x).toFixed(precision).toString() + currencyChar + " "

		// The chart. (minus 2 because of "49011.72580 ┤" at the beginning)
		const chart = new Chart(interpolate(chartData, process.stdout.columns - format(Math.max(...chartData).toFixed(precision)).length - 2), precision, {
			height: Math.ceil(process.stdout.rows / 2),
			format
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
		.param("days", Number)
		.parse();

	// Clearing the screen.
	process.stdout.write("\x1B[2J\x1B[0f");

	await displayTable(
		parameter.get("currency") == false ? "usd" : parameter.get("currency"),
		parameter.get("precision") == false ? 2 : parameter.get("precision"),
		parameter.get("days") == false ? 1 : parameter.get("days"),
	);
}

run().then(_ => {
	/* Done */
});