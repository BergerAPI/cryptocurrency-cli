import Parser from "./parameter";

/**
 * The main function.
 */
function run() {
	const parameter = new Parser()
		.param("test", Boolean)
		.param("test2", Number, true)
		.parse();

	console.log(parameter.get("test2"));
}

run();