import { GeckoApi } from "./api/geckoApi";
import Colors from "./color";
import { Component } from "./components/component";
import { Table } from "./components/list/table";
import Parser from "./parameter";

/**
 * Our api.
 */
const gecko = new GeckoApi();

const currencies = {
	"eur": "€",
	"usd": "$",
	"gbp": "£",
	"cad": "C$",
	"aud": "A$",
	"brl": "R$",
	"cny": "¥",
	"dkk": "kr",
}

/**
 * Displaying a table of the top 10 coins.
 * @param currency The currency we show the data in.
 */
async function displayTable(currency: string, percision: number) {
	const coins = await gecko.coin.markets(currency);

	const table: Component = new Table([
		[Colors.underline + "Id", Colors.underline + "Price", Colors.underline + "24h High", Colors.underline + "24h Low", Colors.underline + "24h Change"],
		...coins.map((coin) => {
			const currencyChar = currencies[currency as keyof typeof currencies] || currency.toUpperCase();

			const price = parseFloat(coin["current_price"]).toFixed(percision).toString() + currencyChar;
			const high = parseFloat(coin["high_24h"]).toFixed(percision).toString() + currencyChar;
			const low = parseFloat(coin["low_24h"]).toFixed(percision).toString() + currencyChar;
			const change = parseFloat(coin["price_change_24h"]).toFixed(percision).toString() + currencyChar;

			return [coin["name"], price, high, low, change];
		}),
	]);

	table.print();
}

/**
 * The main function.
 */
async function run() {
	const parameter = new Parser()
		.param("currency", String)
		.param("percision", Number)
		.parse();

	await displayTable(
		parameter.get("currency") == false ? "usd" : parameter.get("currency"),
		parameter.get("percision") == false ? 2 : parameter.get("percision")
	);
}

run();