import {Component} from "../component";

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
        const biggest = Math.max(...this.raw.map(element => element.toString().length));

        // First line.
        this.lines.push(this.raw.map(x => x.toString().substring(0, MAX_LENGTH)));

        // We have an entry that is too long
        if (biggest > MAX_LENGTH) {

            // Remaining lines.
            for (let i = 0; i < this.raw.length; i++)
                this.lines.push(this.raw.map(x => x.toString().substring(MAX_LENGTH * (i + 1), MAX_LENGTH * (i + 2))));
        }
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
        const biggestElement = Math.max(...this.data.map(entry => Math.max(...entry.lines.map(row => Math.max(...row.map(element => element.toString().length))))));
        const longestRow = Math.max(...this.data.map(x => x.raw.length))
        const width = longestRow * biggestElement + this.padding * longestRow + 2;

        // A list of all lines
        let result = [];

        // Printing the table with borders.
        let line: string = "";

        // For setting the connections
        let counter: number = 0;
        let steps: number = 0;

        for (let i = 0; i < width; i++) {

            // Checking if we'd need to place a straight icon.
            if (counter == biggestElement + this.padding + steps) {
                counter = 0;
                steps++;
                line += this.borders[6];
            } else line += this.borders[4];

            counter++;
        }

        result.push(this.borders[0] + line + this.borders[2]);

        this.data.forEach((entries, index) => {
            entries.lines.forEach(row => {
                let line = this.borders[5];

                row.forEach(cell => {
                    line += " ".repeat(this.padding / 2)
                    line += cell.toString()
                    line += " ".repeat(biggestElement - cell.toString().length + this.padding / 2)
                    line += this.borders[5]
                })

                result.push(line);
            });

            if (index != this.data.length - 1)
                result.push(this.borders[9] + line.replace(new RegExp(this.borders[6], 'g'), this.borders[8]) + this.borders[10]);
        });

        // Using a RegExp instead of replaceAll, since I can't use es2021 right now.
        result.push(this.borders[1] + line.replace(new RegExp(this.borders[6], 'g'), this.borders[7]) + this.borders[3]);

        // Printing the result.
        result.forEach(line => console.log(line));
    }
}