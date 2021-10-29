import { Component } from "./components/component";
import { Table } from "./components/list/table";

/**
 * The main function.
 */
function run() {
	const table: Component = new Table([
		["Name", "Description", "Skills"],
		["John", "John is a nice guy", "JavaScript"],
		["Mark", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit amet mauris commodo quis imperdiet massa. Nibh nisl condimentum id venenatis a condimentum. Viverra adipiscing at in tellus integer feugiat scelerisque. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Maecenas sed enim ut sem viverra aliquet. Dictumst quisque sagittis purus sit amet volutpat consequat. Dictum sit amet justo donec enim diam. Tortor at risus viverra adipiscing at in tellus. Eu feugiat pretium nibh ipsum consequat. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. A diam sollicitudin tempor id eu nisl. Tincidunt vitae semper quis lectus nulla at volutpat diam. Magna fringilla urna porttitor rhoncus dolor purus non.", "Everything."]
	]);

	table.print();
}

run();