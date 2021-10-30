import { Component } from "../component";

/**
 * Maximal length of a table cell.
 * @private
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
		// Checking if an entry is too long
		const biggest = Math.max(...raw.map(element => element.toString().length));

		// First line.
		this.lines.push(raw.map(x => x.toString().substring(0, MAX_LENGTH)));

		// Remaining lines.
		if (biggest > MAX_LENGTH)
			for (let i = 1; i < Math.ceil((biggest / MAX_LENGTH) / 1) * 1; i++)
				this.lines.push(raw.map(x => x.toString().substring(MAX_LENGTH * i, MAX_LENGTH * (i + 1)).trim()));
	}
}

/**
 * A basic table component.
 */
export class Table implements Component {

	/**
	 * We need to border the table.
	 */
	borders: string[] = ["┌", "└", "┐", "┘", "─", "│", "┬", "┴", "┼", "├", "┤"];

	/**
	 * The table entries.
	 */
	data: TableEntry[] = [];

	constructor(data: any[][] | TableEntry[], public padding: number = 2) {
		if (this.padding % 2 != 0)
			throw new Error("Padding must be an even number.");

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
		// @ts-ignore
		const longestRow = Math.max(...this.data.map(x => x.raw.length))
		const width = longestRow * (MAX_LENGTH + this.padding) + this.padding;

		// A list of all lines
		let result = [];

		// Splitting here to a string array, since we need to change some characters.
		let joinLine: string[] = this.borders[4].repeat((this.padding + MAX_LENGTH) * longestRow + (longestRow - 1)).split("");

		this.data.forEach((entries, index) => {
			entries.lines.forEach(row => {
				let line = this.borders[5];

				row.forEach((cell, cellIndex) => {
					if (cellIndex + 1 < row.length)
						joinLine[line.length + this.padding / 2 + MAX_LENGTH] = this.borders[6];

					line += " ".repeat(this.padding / 2)
					line += cell.toString()
					line += " ".repeat(MAX_LENGTH - cell.toString().length + this.padding / 2)
					line += this.borders[5]
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
}