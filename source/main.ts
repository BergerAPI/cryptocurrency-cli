import { GeckoApi } from "./api/geckoApi";
import { Component } from "./components/component";
import { Table } from "./components/list/table";

/**
 * Our api.
 */
const gecko = new GeckoApi();

/**
 * The main function.
 */
async function run() {
	const coins = await gecko.coin.markets();

	const table: Component = new Table([
		["Id", "Price", "Lorem"],
		...coins.map((coin) => {
			const price = parseInt(coin["current_price"]).toLocaleString(undefined, { minimumFractionDigits: 2 })

			return [coin["name"], price, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra."]
		}),
	]);

	table.print();
}

run();