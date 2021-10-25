import asciichart from 'asciichart'

var arr1 = new Array(50)
arr1[ 0 ] = Math.round(Math.random() * 15)
for (let i = 1; i < arr1.length; i++)
	arr1[ i ] = arr1[ i - 1 ] + Math.round(Math.random() * (Math.random() > 0.5 ? 2 : -2))

var config = {
	colors: [
		asciichart.red
	],
	offset: 3,
	padding: '       ',
	height: 10,
}

console.log(asciichart.plot(arr1, config))