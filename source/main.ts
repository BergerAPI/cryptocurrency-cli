import { Component } from "./components/component";
import { Table } from "./components/list/table";
import Parser from "./parameter";

/**
 * The main function.
 */
function run() {
	const parameter = new Parser()
		.param("test", Boolean)
		.param("test2", String, true)
		.parse();

	const table: Component = new Table([
		["Name", "Description", "Skills"],
		["", "", ""],
		["Martin", "SIMEX", "Nothing"],
		["Niclas", "NARUTO", "Dancing"],
		["Dustin", "TTURNA", "Programming"],
		["Simon", "MENE", "dying"],
	]);

	table.print();
}

run();