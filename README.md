<div align="center">
   <h1>Cryptocurrency CLI</h1>
  
   A simple cli-tool for looking at different cryptocurrencies. Our data is provided by CoinGeek, what allows you to send 50 requests per minute.
</div>

# Supporters

[![Stargazers repo roster for @BergerAPI/cryptocurrency-cli](https://reporoster.com/stars/dark/BergerAPI/cryptocurrency-cli)](https://github.com/BergerAPI/cryptocurrency-cli/stargazers)

[![Forkers repo roster for @BergerAPI/cryptocurrency-cli](https://reporoster.com/forks/dark/BergerAPI/cryptocurrency-cli)](https://github.com/BergerAPI/cryptocurrency-cli/network/members)

# Compiling
```bash
# Cloning the Repository
git clone https://github.com/BergerAPI/cli-crypto.git

# Installing all dependencies 
npm install

# Creating the exeuctable in ./bin
npm run package

# Executing. (on linux and macos)
./bin/main

# Executing. (on windows)
./bin/main.exe
```

# Downloading
You can just click at the latest release (on the right side of this repository) and then onto the `cli-crypto` file

# How to use
After you executed your executable, you should see a table, where you can select a coin (scroll with up and down). If you then select a coin, you will see the chart of one day.

## Arguments
- `currency` - The currency you want your graph to be shown
- `precision` - How many decimals you want to see
- `days` - How many days the chart should show (e.g. 1 or 365)

# Example
<img width="1440" alt="Screenshot 2021-10-31 at 2 42 47 PM" src="https://user-images.githubusercontent.com/58854363/139586535-5ef45422-c897-495e-a466-4121e7cbcb61.png">

## Same day compared to CoinGecko
<img width="1285" alt="Screenshot 2021-10-31 at 2 43 23 PM" src="https://user-images.githubusercontent.com/58854363/139586558-1e7d51b1-13f4-45eb-a35c-5d8942fa1b54.png">
