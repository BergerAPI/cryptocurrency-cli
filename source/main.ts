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
		["Id", "Price"],
		...coins.map((coin) => [coin["name"], coin["current_price"]]),
	]);

	table.print();
}

run();