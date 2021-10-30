import Colors from "../../color";
import { Component } from "../component";

/**
 * A simple chart, based on https://github.com/kroitor/asciichart
 * 
 * NOTE: I DIDN'T WRITE THIS! I JUST CHANGED IT.
 */
export class Chart implements Component {
	constructor(private data: any[], private precision: number, private config: any = undefined) { }

	format(x: any) {
		return x.toFixed(this.precision)
	}

	/**
	 * Coloring a char.
	 * @param char The character to color
	 * @param color The color to use
	 * @returns string
	 */
	colored(char: string, color: string) {
		return (color === undefined) ? char : (color + char + Colors.reset)
	}

	/**
	 * Printing the chart.
	 */
	print(): void {
		if (typeof this.data[0] === "number")
			this.data = [this.data]

		this.config = typeof this.config !== 'undefined' ? this.config : {}

		let min = -6969
		let max = 0

		for (let j = 0; j < this.data.length; j++)
			for (let i = 0; i < this.data[j].length; i++) {
				max = Math.max(max, this.data[j][i])

				if (min == -6969)
					min = max

				min = Math.min(min, this.data[j][i])
			}

		const symbols = ['┼', '┤', '╶', '╴', '─', '╰', '╭', '╮', '╯', '│']
		const range = Math.abs(max - min)
		const offset = 2
		const height = (typeof this.config.height !== 'undefined') ? this.config.height : range
		const ratio = range !== 0 ? height / range : 1;
		const min2 = Math.round(min * height / range)
		const max2 = Math.round(max * height / range)
		const rows = Math.abs(max2 - min2)

		let width = 0

		for (let i = 0; i < this.data.length; i++)
			width = Math.max(width, this.data[i].length)

		width = width + offset

		let result = new Array(rows + 1)
		for (let i = 0; i <= rows; i++) {
			result[i] = new Array(width)
			for (let j = 0; j < width; j++) {
				result[i][j] = ' '
			}
		}

		// Calculating the biggest label
		let maxLabel = 0

		for (let i = 0; i < this.data.length; i++) {
			let label = this.format(max - (i - min2) * range / rows)

			maxLabel = Math.max(maxLabel, label.length)
		}

		for (let y = min2; y <= max2; ++y) {
			let label = this.format(max - (y - min2) * range / rows)

			if (label.length < maxLabel)
				label = label + ' '.repeat(maxLabel - label.length)

			result[y - min2][Math.max(offset - label.length, 0)] = label
			result[y - min2][offset - 1] = (y == 0) ? symbols[0] : symbols[1]
		}

		for (let j = 0; j < this.data.length; j++) {
			let currentColor = Colors.green
			let lastColor = undefined
			let y0 = Math.round(this.data[j][0] * ratio) - min2

			result[rows - y0][offset - 1] = this.colored(symbols[0], currentColor)

			for (let x = 0; x < this.data[j].length - 1; x++) {
				let y0 = Math.round(this.data[j][x + 0] * ratio) - min2
				let y1 = Math.round(this.data[j][x + 1] * ratio) - min2

				if (y0 == y1) result[rows - y0][x + offset] = this.colored(symbols[4], lastColor ? lastColor : currentColor)
				else {
					// We want to color every drop red, and every high green
					let color = (y0 < y1) ? currentColor : Colors.red

					result[rows - y1][x + offset] = this.colored((y0 > y1) ? symbols[5] : symbols[6], color)
					result[rows - y0][x + offset] = this.colored((y0 > y1) ? symbols[7] : symbols[8], color)

					let from = Math.min(y0, y1)
					let to = Math.max(y0, y1)

					for (let y = from + 1; y < to; y++)
						result[rows - y][x + offset] = this.colored(symbols[9], color)

					lastColor = color
				}
			}
		}
		console.log(result.map((x) => { return x.join('') }).join('\n'))
	}
}