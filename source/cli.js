import arg from "arg";
import AsciiTable from "ascii-table/ascii-table";
import { BLUE, CYAN, GREEN, plot, RED, RESET, WHITE, YELLOW } from "./chart";
import { betterName, getChartData, getCoinPrice, getCoinsList, styles } from "./logic"

/**
 * Our main method.
 * @param {*} args 
 */
export async function cli(raw) {
	const args = arg(
		{
			"--ids": String,
			"--divider": Number,
			"--res": Number,
			"--currency": String,
			"--style": String,
		},
		{
			argv: raw.slice(2)
		}
	)

	if (!args[ "--currency" ])
		args[ "--currency" ] = "usd"

	if (!args[ "--ids" ]) {
		const table = new AsciiTable()

		table.setHeading("ID", "Symbol", "Price", "High 24h");

		(await getCoinsList()).forEach(coin => {
			table.addRow(betterName(coin.id.replace("-", " ")), coin.symbol.toUpperCase(), coin.market_data.current_price[ args[ "--currency" ] ] + " " + args[ "--currency" ].toUpperCase(), coin.market_data.high_24h[ args[ "--currency" ] ] + " " + args[ "--currency" ].toUpperCase());
		});

		console.log(table.toString());

		return
	} else args[ "--ids" ] = args[ "--ids" ].split(",").map(x => x.trim().toLowerCase().replace(" ", "-"))

	if (!args[ "--divider" ])
		args[ "--divider" ] = 2

	if (!args[ "--res" ])
		args[ "--res" ] = 5

	if (!args[ "--style" ]) args[ "--style" ] = styles[ "smooth" ]
	else args[ "--style" ] = styles[ args[ "--style" ] ]

	const colors = [ GREEN, CYAN, BLUE, YELLOW ]
	const data = await Promise.all(await getChartData(args[ "--ids" ], args[ "--currency" ], args[ "--divider" ]))
	const coinPrices = await Promise.all(args[ "--ids" ].map(async (id) => await getCoinPrice(id, args[ "--currency" ])))

	// Calculate the height of the chart
	let height = 0

	for (let i = 0; i < data.length; i++)
		height += data[ i ].length

	height /= args[ "--res" ]

	console.log(`${WHITE}Showing following Cryptocurrencies: ${args[ "--ids" ].map((coinName, index) => colors[ index ] + betterName(coinName) + RESET + " (" + coinPrices[ index ] + " " + args[ "--currency" ] + ")").join(", ")}${RESET}`)
	console.log()
	console.log(plot(data, {
		colors,
		height: height,
		padding: " ".repeat(Math.max(data)),
		offset: 3,
		symbols: args[ "--style" ]
	}))
}