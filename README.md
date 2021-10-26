# cli-crypto
**WARNING: THIS APPLICATION WAS MADE FOR EDUCATIONAL PURPOSES AND NOT FOR REAL CRYPTO TRADING. YOU MAY LOOSE ACCURACY USING THIS TOOL.**

Basically CoinGeek but in your terminal.

# Setup
```bash
# Cloning the Repository
git clone https://github.com/BergerAPI/cli-crypto.git

# Installing all dependencies 
npm install

# Linking so you can access it in a shell
npm link
```

# Grahps
<img width="1235" alt="Screenshot 2021-10-26 at 3 06 13 PM" src="https://user-images.githubusercontent.com/58854363/138884925-e95d7af2-ec16-4400-88c3-2a46336dd266.png">

# Tables
<img width="511" alt="Screenshot 2021-10-26 at 3 07 08 PM" src="https://user-images.githubusercontent.com/58854363/138885086-9e46665e-0398-4e88-9129-66c472660339.png">

# Arguments
- `ids` - The Crypto Currency you want to see (e.g. bitcoin)
- `divider` - We can't the entire data set into the graph, so we have to divide it (`dataLength / divider`)
- `res` - The resolution of the graph (higher resolution -> smaller graph, lower resolution -> bigger graph)
- `currency` - The currency you want your graph to be shown
- `style` - Change the style of your graph (lines, smooth, unsmooth, points, dots, blocks, diamonds)
