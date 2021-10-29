import { Component } from "./components/component";
import { Table } from "./components/list/table";

/**
 * The main function.
 */
function run() {
	const table: Component = new Table([
		["Name", "Description", "Skills"],
		["A", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus"],
		["duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus", "SIMEX", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus"],
		["Niclas", "NARUTO", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus"],
		["Dustin", "TTURNA", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus"],
		["duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus", "MENE", "duis ultricies lacus sed turpis tincidunt id aliquet risusduis ultricies lacus sed turpis tincidunt id aliquet risus"],
	]);

	table.print();
}

run();