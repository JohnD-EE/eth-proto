// For env configuration
// Any changes must be complied to take effect (npm run dev)
// Example usage within project: process.env.firebase.apiKey

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// Note: string variables need to be wrapped into single and double quotes '"..."'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  firebase: {
    apiKey: '"AIzaSyC8AkQkt2QNt7OaJhBtsb1udrrVD7Fj0nU"',
    authDomain: '"fir-app-a3ad6.firebaseapp.com"',
    databaseURL: '"https://fir-app-a3ad6.firebaseio.com"',
    projectId: '"fir-app-a3ad6"'
  },

  web3: {
    // default to an injected provider (e.g. Metamask) if available
    injectedProvider: false,
    // use ganach-cli as a dev ethereum blockchain
    localProviderUrl: '"http://localhost:8545"'
  },

  // settings for the ganache-cli test ethereum networks
  // use these settings to start ganache with a consistent set of accounts
  ganache: {
    // option to seed accounts/mnemonic - ganache-cli -s "MyArbitrarySeed"
    seed: '"EagleEye"',
    // mnemonic option (also used in Metamask) - ganache-cli -m "... ... ..."
    mnemonic: '"blur until matter salad soup cake cruel middle knee skin various example"',
    // the number of accounts to create - ganache-cli -a 10
    initAccounts: '10'
  },

  // Users to be initialised upon request and assigned an ethereum address
  initUsers: {
    // Admin
    seedAccounts: [{
        id: '0',
        name: '"Admin"',
        type: '"admin"',
        email: '"admin@ee.proto"'
      },
      // Contract owners - Ethereum addresses used to launch contracts
      {
        id: '1',
        name: '"Contract1"',
        type: '"contractOwner"',
        email: '"contract1@ee.proto"'
      },
      {
        id: '2',
        name: '"RolaCola"',
        type: '"brand"',
        email: '"rolacola@ee.proto"'
      },
      {
        id: '3',
        name: '"BettaBuys"',
        type: '"retailer"',
        email: '"bettabuys@ee.proto"'
      },
      // Users - a List of initial users
      {
        id: '4',
        name: '"Homer Simpson"',
        type: '"user"',
        email: '"homer@ee.proto"'
      },
      {
        id: '5',
        name: '"Donald Trump"',
        type: '"user"',
        email: '"donald@ee.proto"'
      },
      {
        id: '6',
        name: '"Vladimir Putin"',
        type: '"user"',
        email: '"vladimir@ee.proto"'
      },
      {
        id: '7',
        name: '"Victoria Beckham"',
        type: '"user"',
        email: '"victoria@ee.proto"'
      },
      {
        id: '8',
        name: '"Kim Kardashian"',
        type: '"user"',
        email: '"kim@ee.proto"'
      },
      {
        id: '9',
        name: '"Charlie Chaplin"',
        type: '"user"',
        email: '"charlie@ee.proto"'
      },
      {
        id: '10',
        name: '"Tesco"',
        type: '"retailer"',
        email: '"tesco@ee.proto"'
      },
      {
        id: '11',
        name: '"Sainsburys"',
        type: '"retailer"',
        email: '"sainsburys@ee.proto"'
      },
    ]
  }
})
