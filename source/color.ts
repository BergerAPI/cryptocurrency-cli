/**
 * An class with lots of ascii utilities.
 */
export default class Colors {
	static readonly black = '\x1b[30m';
	static readonly red = '\x1b[31m';
	static readonly green = '\x1b[32m';
	static readonly yellow = '\x1b[33m';
	static readonly blue = '\x1b[34m';
	static readonly magenta = '\x1b[35m';
	static readonly cyan = '\x1b[36m';
	static readonly white = '\x1b[37m';
	static readonly reset = '\x1b[0m';
	static readonly bold = '\x1b[1m';
	static readonly dim = '\x1b[2m';
	static readonly italic = '\x1b[3m';
	static readonly underline = '\x1b[4m';
	static readonly inverse = '\x1b[7m';
	static readonly hidden = '\x1b[8m';
	static readonly strikethrough = '\x1b[9m';
	static readonly blackBG = '\x1b[40m';
	static readonly redBG = '\x1b[41m';
	static readonly greenBG = '\x1b[42m';
	static readonly yellowBG = '\x1b[43m';
	static readonly blueBG = '\x1b[44m';
	static readonly magentaBG = '\x1b[45m';
	static readonly cyanBG = '\x1b[46m';
	static readonly whiteBG = '\x1b[47m';
	static readonly resetBG = '\x1b[49m';
}