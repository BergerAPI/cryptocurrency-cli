import {Component} from "../component";

/**
 * A basic table component.
 */
export class Table implements Component {

    /**
     * Maximal length of a table cell.
     * @private
     */
    private MAX_LENGTH: number = 20;

    /**
     * We need to border the table.
     */
    borders: string[] = ["┌", "└", "┐", "┘", "─", "│"];

    /**
     * Checking if a cell is longer than 20 characters.
     * @param data the data to check
     * @private
     */
    private checkCells(data: string[][]): string[][] {
        const result: string[][] = [];

        // We need to check if a cell is over 20 chars, if so, we need to put it onto another line.
        // This happens in the result array.
        data.forEach((row) => {
            let currentLine: any[] = [];
            let nextArray: any[] = [];

            row.forEach((column, index) => {
                if (column.toString().length > this.MAX_LENGTH) {
                    currentLine.push(column.toString().substring(0, this.MAX_LENGTH));
                    nextArray.push(column.toString().substring(this.MAX_LENGTH, column.toString().length));

                    if (index + 1 < row.length) {
                        const nextElement = row[index + 1].toString()

                        if (nextElement == "" || nextElement == "-")
                            nextArray.push("-")
                    }
                } else currentLine.push(column);
            })

            result.push(currentLine)
            if (nextArray.length != 0) result.push(nextArray);
        });

        // If checked and data are the same , we can return the checked data.
        if (Math.max(...result.map(row => Math.max(...row.map(element => element.toString().length)))) <= this.MAX_LENGTH)
            return result;

        return this.checkCells(result);
    }

    constructor(public data: any[][], public padding: number = 2) {
        this.data = this.checkCells(data);
    }

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

        // Printing the table with borders.
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