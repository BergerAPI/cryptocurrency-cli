import Colors from "../../color";
import readline from "readline"
import { Component } from "../component";

/**
 * Maximal length of a table cell.
 */
export const MAX_LENGTH: number = 30;

/**
 * An entry, that can have multiple lines
 */
class TableEntry {
	/**
	 * All lines of this entry
	 */
	lines: any[][] = [];

	constructor(public raw: any[]) {
		const expr = new RegExp('(^.{1,' + MAX_LENGTH + '}(\\s+|$))|(^.{1,' + String(MAX_LENGTH - 1) + '}(\\\\|/|_|\\.|,|;|-))');
		let newLines: any[][] = [];

		raw.forEach((subject, index) => {
			let currentIndex = 0;

			do {
				const match = expr.exec(subject);

				if (newLines[currentIndex] == undefined) {
					const newLine: any[] = [];

					for (let index = 0; index < raw.length; index++)
						newLine.push('');

					newLines.push(newLine);
				}

				if (match) {
					subject = subject.slice(match[0].length);
					newLines[currentIndex][index] = match[0];
				} else {
					subject = subject.slice(MAX_LENGTH);
					newLines[currentIndex][index] = subject.slice(0, MAX_LENGTH);
				}

				currentIndex++;
			} while (subject.length);
		});

		newLines.forEach(line => this.lines.push(line));
	}
}

/**
 * A config for our table.
 */
export class TableConfig {
	/**
	 * How much space we want in each row.
	 * Note: This must be a multiple of 2.
	 */
	padding: number = 2;

	/**
	 * If the table should be scrollable.
	 * Note: If true, this will stop the entire program,
	 *       until we got a result.
	 */
	scroll: boolean = false;

	/**
	 * If we have an header.
	 */
	header: boolean = true;
}

/**
 * A basic table component.
 */
export class Table implements Component {

	/**
	 * If we need keyboard input for user interaction.
	 */
	requireKeyInput: boolean = true;

	/**
	 * We need to border the table.
	 * @private
	 */
	private borders: string[] = ["┌", "└", "┐", "┘", "─", "│", "┬", "┴", "┼", "├", "┤"];

	/**
	 * The table entries.
	 * @private
	 */
	private readonly data: TableEntry[] = [];

	/**
	 * We need this for scrolling through the table.
	 * @private
	 */
	private currentRow: number = 0;

	constructor(data: any[][] | TableEntry[], public config: TableConfig = new TableConfig(), public callback: (entry: TableEntry) => void = () => { }) {
		if (this.config.padding % 2 != 0)
			throw new Error("Padding must be an even number.");

		// If we don't want a scrollable table, we can just set
		// the `requireKeyInput` to false
		if (this.config.scroll) {
			if (this.config.header)
				this.currentRow++;

			// Preparing for input.
			readline.emitKeypressEvents(process.stdin);
			process.stdin.setRawMode(true);

			// Add the listener.
			process.stdin.on('keypress', (_, key) => {
				this.handleKeyInput(key.name)
			})
		}

		// Mapping to TableEntries if we don't have them already inside the array.
		if (data[0] instanceof TableEntry)
			this.data = data as TableEntry[];
		else
			this.data = data.map(row => new TableEntry(row as any[]));
	}

	/**
	 * @see Component.print
	 */
	print(): void {
		// The biggest element
		const biggest = Math.max(...this.data.map(x => Math.max(...x.lines.map(y => Math.max(...y.map(z => z.length))))));
		const longestRow = Math.max(...this.data.map(x => x.raw.length))

		// A list of all lines
		let result = [];

		// Splitting here to a string array, since we need to change some characters.
		let joinLine: string[] = this.borders[4].repeat((this.config.padding + biggest) * longestRow + (longestRow - 1)).split("");

		this.data.forEach((entries, index) => {
			entries.lines.forEach((row) => {
				let line = this.borders[5];

				row.forEach((rawCell, cellIndex) => {
					if (index == 0 && this.config.header)
						rawCell = Colors.green + rawCell;

					if (this.currentRow == index && this.config.scroll)
						rawCell = Colors.whiteBG + Colors.black + rawCell;

					rawCell += Colors.reset;

					// We need the cell without any color codes.
					let cell = rawCell.toString().replace(/\u001b\[\d+m/g, "");

					if (cellIndex + 1 < row.length)
						joinLine[line.replace(/\u001b\[\d+m/g, "").length + this.config.padding / 2 + biggest] = this.borders[6];

					line += " ".repeat(this.config.padding / 2) + rawCell + " ".repeat(biggest - cell.length + this.config.padding / 2) + this.borders[5]
				})

				result.push(line);
			});

			if (index != this.data.length - 1)
				result.push(this.borders[9] + joinLine.join("").replace(new RegExp(this.borders[6], 'g'), this.borders[8]) + this.borders[10]);
		});

		// Using a RegExp instead of replaceAll, since I can't use es2021 right now.
		result.unshift(this.borders[0] + joinLine.join("") + this.borders[2]);
		result.push(this.borders[1] + joinLine.join("").replace(new RegExp(this.borders[6], 'g'), this.borders[7]) + this.borders[3]);

		// Printing the result.
		result.forEach(line => console.log(line));
	}

	/**
	 * @see Component.handleKey
	 */
	handleKeyInput(key: string): void {
		switch (key) {
			case "q":
				process.exit();
				break;
			case "down":
				if (this.currentRow < this.data.length - 1)
					this.currentRow++;

				break;
			case "up":
				if (this.currentRow - 1 != 0)
					this.currentRow--;

				break;
			case "return":
				process.stdin.destroy();
				this.callback(this.data[this.currentRow]);

				break;
		}

		if (key == "down" || key == "up") {
			// Clearing and Redrawing.
			process.stdout.write("\x1B[2J\x1B[0f");
			this.print();
		}
	}
}