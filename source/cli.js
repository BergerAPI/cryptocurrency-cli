import arg from "arg";
import asciichart from "asciichart";
import { getChartData, styles } from "./logic"

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
			"--timespan": String,
			"--style": String,
		},
		{
			argv: raw.slice(2)
		}
	)

	if (!args[ "--ids" ]) {
		console.error("You must specify an id")
		return
	} else args[ "--ids" ] = args[ "--ids" ].split(",").map(x => x.trim().toLowerCase())

	if (!args[ "--th" ])
		args[ "--th" ] = 10

	if (!args[ "--res" ])
		args[ "--res" ] = 5

	if (!args[ "--style" ]) args[ "--style" ] = styles[ "smooth" ]
	else args[ "--style" ] = styles[ args[ "--style" ] ]

	const data = await Promise.all(await getChartData(args[ "--ids" ], "eur", args[ "--th" ]))

	// Calculate the height of the chart
	let height = 0

	for (let i = 0; i < data.length; i++)
		height += data[ i ].length

	height /= args[ "--res" ]

	console.log(asciichart.plot(data, {
		colors: [ asciichart.green, asciichart.red ],
		height: height,
		padding: " ".repeat(Math.max(data)),
		offset: args[ "--res" ],
		symbols: args[ "--style" ]
	}))
}