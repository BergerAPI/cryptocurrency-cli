import { Component } from "./components/component";
import { Table } from "./components/list/table";

/**
 * The main function.
 */
function run() {
	const table: Component = new Table([
		["Name", "Description", "Skills"],
		["", "", ""],
		["NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN", "", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
		["Martin", "SIMEX", "STANDING"],
		["Niclas", "NARUTO", "Dancing"],
		["Dustin", "TTURNA", "Programming"],
		["Simon", "MENE", "dying"],
	]);

	table.print();
}

run();