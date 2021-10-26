/**
MIT License

Copyright © 2016 Igor Kroitor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

export const BLACK = "\x1b[30m"
export const RED = "\x1b[31m"
export const GREEN = "\x1b[32m"
export const YELLOW = "\x1b[33m"
export const BLUE = "\x1b[34m"
export const MAGENTA = "\x1b[35m"
export const CYAN = "\x1b[36m"
export const DEFAULT = "\x1b[39m"
export const LIGHT_GRAY = "\x1b[37m"
export const DARK_GRAY = "\x1b[90m"
export const LIGHT_RED = "\x1b[91m"
export const LIGHT_GREEN = "\x1b[92m"
export const LIGHT_YELLOW = "\x1b[93m"
export const LIGHT_BLUE = "\x1b[94m"
export const LIGHT_MAGENTA = "\x1b[95m"
export const LIGHT_CYAN = "\x1b[96m"
export const WHITE = "\x1b[97m"
export const RESET = "\x1b[0m"

export function colored(char, color) {
	return (color === undefined) ? char : (color + char + RESET)
}

export function plot(series, config = undefined) {
	if (typeof series[ 0 ] === "number")
		series = [ series ]

	config = typeof config !== 'undefined' ? config : {}

	let min = (typeof config.min !== 'undefined') ? config.min : series[ 0 ][ 0 ]
	let max = (typeof config.max !== 'undefined') ? config.max : series[ 0 ][ 0 ]

	for (let j = 0; j < series.length; j++)
		for (let i = 0; i < series[ j ].length; i++) {
			min = Math.min(min, series[ j ][ i ])
			max = Math.max(max, series[ j ][ i ])
		}

	let defaultSymbols = [ '┼', '┤', '╶', '╴', '─', '╰', '╭', '╮', '╯', '│' ]
	let range = Math.abs(max - min)
	let offset = (typeof config.offset !== 'undefined') ? config.offset : 3
	let padding = (typeof config.padding !== 'undefined') ? config.padding : '           '
	let height = (typeof config.height !== 'undefined') ? config.height : range
	let colors = (typeof config.colors !== 'undefined') ? config.colors : []
	let ratio = range !== 0 ? height / range : 1;
	let min2 = Math.round(min * ratio)
	let max2 = Math.round(max * ratio)
	let rows = Math.abs(max2 - min2)

	let width = 0

	for (let i = 0; i < series.length; i++)
		width = Math.max(width, series[ i ].length)

	width = width + offset

	let symbols = (typeof config.symbols !== 'undefined') ? config.symbols : defaultSymbols
	let format = (typeof config.format !== 'undefined') ? config.format : (x) => {
		return (padding + x.toFixed(5)).slice(-padding.length)
	}

	let result = new Array(rows + 1)
	for (let i = 0; i <= rows; i++) {
		result[ i ] = new Array(width)
		for (let j = 0; j < width; j++) {
			result[ i ][ j ] = ' '
		}
	}

	// Calculating the biggest label
	let maxLabel = 0

	for (let i = 0; i < series.length; i++) {
		let label = format(rows > 0 ? max - (i - min2) * range / rows : i, i - min2)

		maxLabel = Math.max(maxLabel, label.length)
	}

	for (let y = min2; y <= max2; ++y) {
		let label = format(rows > 0 ? max - (y - min2) * range / rows : y, y - min2)

		if (label.length < maxLabel)
			label = label + ' '.repeat(maxLabel - label.length)

		result[ y - min2 ][ Math.max(offset - label.length, 0) ] = label
		result[ y - min2 ][ offset - 1 ] = (y == 0) ? symbols[ 0 ] : symbols[ 1 ]
	}

	for (let j = 0; j < series.length; j++) {
		let currentColor = colors[ j % colors.length ]
		let lastColor = undefined
		let y0 = Math.round(series[ j ][ 0 ] * ratio) - min2

		result[ rows - y0 ][ offset - 1 ] = colored(symbols[ 0 ], currentColor)

		for (let x = 0; x < series[ j ].length - 1; x++) {
			let y0 = Math.round(series[ j ][ x + 0 ] * ratio) - min2
			let y1 = Math.round(series[ j ][ x + 1 ] * ratio) - min2

			if (y0 == y1) result[ rows - y0 ][ x + offset ] = colored(symbols[ 4 ], lastColor ? lastColor : currentColor)
			else {
				// We want to color every drop red, and every high green
				let color = (y0 < y1) ? currentColor : LIGHT_RED

				result[ rows - y1 ][ x + offset ] = colored((y0 > y1) ? symbols[ 5 ] : symbols[ 6 ], color)
				result[ rows - y0 ][ x + offset ] = colored((y0 > y1) ? symbols[ 7 ] : symbols[ 8 ], color)

				let from = Math.min(y0, y1)
				let to = Math.max(y0, y1)

				for (let y = from + 1; y < to; y++)
					result[ rows - y ][ x + offset ] = colored(symbols[ 9 ], color)

				lastColor = color
			}
		}
	}
	return result.map((x) => { return x.join('') }).join('\n')
}