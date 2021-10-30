/**
 * Working with parameter.
 */
export class Parameter {
	constructor(public name: string, public value: any, public required: boolean) {
	}
}

/**
 * We have results. A class to make it easier to work with results.
 */
export class ParserResult {
	constructor(public results: Parameter[]) {
	}

	/**
	 * Get a parameter by name.
	 */
	public get(name: string): any | undefined {
		const result = this.results.find(x => x.name === name);
		if (!result) return undefined;
		return result.value;
	}
}

/**
 * Parsing all arguments.
 */
export default class Parser {

	/**
	 * All parameters.
	 */
	params: Parameter[] = []

	/**
	 * Adding a parameter.
	 */
	param(name: string, type: any, required = false): Parser {
		this.params.push(new Parameter(name, type, required))

		return this;
	}

	/**
	 * Parsing all arguments.
	 */
	parse(): ParserResult {
		return new ParserResult(this.params.map(p => {
			const arg = process.argv.findIndex(a => a == `--${p.name}`);

			if (process.argv[arg]) {
				const type = typeof p.value();

				// Checking if the return type is a flag.
				if (type === "boolean")
					return new Parameter(p.name, true, p.required);

				// The next argument is the value.
				const value = process.argv[arg + 1];

				if (!value)
					throw new Error(`Missing value for parameter ${p.name} with type ${typeof p.value}`);

				// If we have a number, we need to parse it.
				if (type === "number") {
					const parsed = parseInt(value);

					if (isNaN(parsed))
						throw new Error(`Invalid value for parameter ${p.name} with type ${typeof p.value}`);

					return new Parameter(p.name, parsed, p.required);
				}

				return new Parameter(p.name, value, p.required);
			}

			if (p.required)
				throw new Error(`Parameter ${p.name} is required.`);

			return new Parameter(p.name, false, p.required);
		}))
	}
}