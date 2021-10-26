import arg from "arg";
import { BLUE, GREEN, plot, RED, RESET, WHITE, YELLOW } from "./chart";
import { betterName, getChartData, getCoinPrice, styles } from "./logic"

/**
 * Our main method.
 * @param {*} args 
 */
export async function cli(raw) {
	const args = arg(
		{
			"--ids": String,
			"--th": Number,
			"--res": Number,
			"--currency": String,
			"--style": String,
		},
		{
			argv: raw.slice(2)
		}
	)

	if (!args[ "--ids" ]) {
		console.error("You must specify an id")
		return
	} else args[ "--ids" ] = args[ "--ids" ].split(",").map(x => x.trim().toLowerCase().replace(" ", "-"))

	if (!args[ "--th" ])
		args[ "--th" ] = 10

	if (!args[ "--res" ])
		args[ "--res" ] = 5

	if (!args[ "--currency" ])
		args[ "--currency" ] = "usd"

	if (!args[ "--style" ]) args[ "--style" ] = styles[ "smooth" ]
	else args[ "--style" ] = styles[ args[ "--style" ] ]

	const colors = [ GREEN, RED, BLUE, YELLOW ]
	const data = await Promise.all(await getChartData(args[ "--ids" ], args[ "--currency" ], args[ "--th" ]))
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