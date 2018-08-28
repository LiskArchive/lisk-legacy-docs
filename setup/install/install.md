Author: mona

----

Created: 2018-05-22

----

Updated: 2018-06-22

----

Metadescription: Learn how to install Lisk Explorer quickly and easily. If you have satisfied the requirements from the pre-installation section, proceed with the installation.

----

Metakeywords: lisk explorer install, installation, lisk

----

Title: Installation

----

Opengraphtitle: Lisk Explorer Installation

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Explorer Installation

This section details how to install Lisk Explorer. If you have satisfied the requirements from the [Pre-Installation](../pre-install/pre-install.md) section, you can proceed with the installation.

## Install Lisk Explorer from Source (GitHub)

Clone the Lisk Explorer repository using Git and install the dependencies:

```shell
git clone https://github.com/LiskHQ/lisk-explorer.git
cd lisk-explorer
npm install
```

## Build Steps

### 1. Config

The default config.js file contains all of the configuration settings for Lisk Explorer. These options can be modified according to comments included in configuration file.

```json
 {
	"host": "0.0.0.0", // Interface to listen on, 0.0.0.0 to listen on all available
	"port": 6040, // Port to listen on
	"lisk": { // Lisk node
		"host": "127.0.0.1",
		"port": 4000,
		"apiPath": "/api",
	},
	"freegeoip": { // FreeGeoIP server
		"host": "127.0.0.1",
		"port": 8080,
	},
	"redis": { // Redis server
		"host": "127.0.0.1",
		"port": 6380,
		"db": 0,
		"password": "",
	},
	"cacheTTL": 30, // // Time in seconds to store cache in Redis
	"log": {
		"enabled": true, // // Collect logs (true - enabled, false - disabled)
		"file": "./logs/explorer.log", // // Output for logs - can be device file or ordinary path
		"level": "info", // // Log level - (trace, debug, info, warn, error)
	},
	"exchangeRates": {
		"enabled": true, // Exchange rates support (true - enabled, false - disabled)
		"updateInterval": 30000, // Interval in ms for checking exchange rates (default: 30 seconds)
		"exchanges": {
			"LSK": {
				"BTC": "poloniex", // LSK/BTC pair, supported: poloniex
				"CNY": "jubi", // LSK/CNY pair, supported: jubi, bitbays
			},
			"BTC": {
				"USD": "bitfinex", // BTC/USD pair, supported: bitfinex, bitstamp, btce
				"EUR": "bitstamp", // BTC/EUR pair, supported: bitstamp, bitmarket
				"RUB": "btce", // BTC/RUB pair, supported: btce, exmo
				"PLN": false, // BTC/PLN pair, supported: bitmarket
			},
		},
	},
	"marketWatcher": {
		"enabled": true, // Market watcher support (true - enabled, false - disabled)
		"exchanges": {
			"poloniex": true, // Poloniex exchange support (true - enabled, false - disabled)
			"bittrex": true, // Bittrex exchange support (true - enabled, false - disabled);
		},
		"candles": {
			"updateInterval": 30000, // Interval in ms for updating candlestick data (default: 30 seconds)
			"poloniex": {
				"buildTimeframe": 60 * 60 * 24 * 30, // Build candles based on trades form last 30 days
			},
		},
		"orders": {
			"updateInterval": 15000, // Interval in ms for updating order book data (default: 15 seconds)
		},
	},
	"cacheDelegateAddress": {
		"enabled": true, // Delegate caching support (true - enabled, false - disabled)
		"updateInterval": 60000, // Interval in ms for checking new delegates registration (default: 60 seconds)
	},
}
```

### 2. Frontend

The frontend application uses Webpack to create core bundles for Lisk Explorer.

In order to start the watcher to generate bundles continuously for all the changes of the code, Run the following command:

```shell
npm run start
```

And for generating the minified bundles in production environment run:

```shell
npm run build
```

If you want to add a meta tag with name and content defined (For example to verify your ownership to Google analytics) run:

```shell
SERVICE_NAME='your service name' CLIENT_ID='you client id' npm run build
```

### 3. Market Watcher

Candlestick data needs to be initialized prior to starting Lisk Explorer. During runtime candlestick data is updated automatically.

This step writes data to the local Redis instance. Make sure that your application is already deployed and has access to the production Redis database.

To build candlestick data for each exchange run:

```shell
grunt candles:build
```

To update candlestick data manually run after initialization:

```shell
grunt candles:update
```

### 4. Running

It's recommended to use PM2 to start the application. PM2 will fork the process into the background and automatically recover the process if it fails.

```shell
pm2 start pm2-explorer.json
```

To stop the application run:

```shell
pm2 stop lisk-explorer
```

----

Htmltitle: Lisk Explorer Installation Setup | Lisk Documentation
