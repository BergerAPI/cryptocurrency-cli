import {GeckoApi} from "./api/geckoApi";
import Colors from "./color";
import {Table} from "./components/list/table";
import Parser from "./parameter";

/**
 * Our api.
 */
const gecko = new GeckoApi();

/**
 * All currencies we support with their corresponding symbol.
 */
const currencies = {
    "eur": "€",
    "usd": "$",
    "gbp": "£",
    "cad": "C$",
    "aud": "A$",
    "brl": "R$",
    "cny": "¥",
    "dkk": "kr",
}

/**
 * Displaying a table of the top 10 coins.
 * @param currency The currency we show the data in.
 * @param precision How accurate we want the data to be.
 */
async function displayTable(currency: string, precision: number) {
    const coins = await gecko.coin.markets(currency);

    const table = new Table([
        [Colors.underline + "Id", Colors.underline + "Price", Colors.underline + "24h High", Colors.underline + "24h Low", Colors.underline + "24h Change"],
        ...coins.map((coin) => {
            const currencyChar = currencies[currency as keyof typeof currencies] || currency.toUpperCase();

            const price = parseFloat(coin["current_price"]).toFixed(precision).toString() + currencyChar;
            const high = parseFloat(coin["high_24h"]).toFixed(precision).toString() + currencyChar;
            const low = parseFloat(coin["low_24h"]).toFixed(precision).toString() + currencyChar;
            const change = parseFloat(coin["price_change_24h"]).toFixed(precision).toString() + currencyChar;

            return [coin["name"], price, high, low, change];
        }),
    ], {
        padding: 2,
        header: true,
        scroll: true,
    }, (entry => {
        // Clearing the screen.
        process.stdout.write("\x1B[2J\x1B[0f");

        console.log("Your choice: " + entry.lines[0][0]);
    }));

    table.print();
}

/**
 * The main function.
 */
async function run() {
    const parameter = new Parser()
        .param("currency", String)
        .param("precision", Number)
        .parse();

    // Clearing the screen.
    process.stdout.write("\x1B[2J\x1B[0f");

    await displayTable(
        parameter.get("currency") == false ? "usd" : parameter.get("currency"),
        parameter.get("precision") == false ? 2 : parameter.get("precision")
    );
}

run().then(_ => {
    /* Done */
});