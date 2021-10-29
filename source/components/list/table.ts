import { Component } from "../component";

/**
 * A basic table component.
 */
export class Table implements Component {
	constructor(public data: any[][], public padding: number = 2) { }

	/**
	 * We need to border the table.
	 */
	borders: string[] = ["╔", "╚", "╗", "╝", "═", "║"];

	/**
	 * @see Component.print
	 */
	print(): void {
		const biggestElement = Math.max(...this.data.map(row =>
			Math.max(...row.map(element => element.toString().length))));

		const longestRow = Math.max(...this.data.map(x => x.length))
		const width = longestRow * biggestElement + this.padding * longestRow + 2;

		// A list of all lines
		let result = [];

		// Priting the table with borders.
		result.push(this.borders[0] + this.borders[4].repeat(width) + this.borders[2]);

		this.data.forEach(row => {
			let line = this.borders[5];

			row.forEach(cell => {
				line += " ".repeat(this.padding / 2)
				line += cell.toString()
				line += " ".repeat(biggestElement - cell.toString().length + this.padding / 2)
				line += this.borders[5]
			});

			result.push(line);
		});

		result.push(this.borders[1] + this.borders[4].repeat(width) + this.borders[3]);

		// Printing the result.
		result.forEach(line => console.log(line));
	}
}