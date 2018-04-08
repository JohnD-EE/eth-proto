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
    userAccounts: [{
        id: '1',
        name: '"Admin"',
        type: '"admin"',
        email: '"admin@ee.proto"'
      },
      // Contract owners - Ethereum addresses used to launch contracts
      {
        id: '2',
        name: '"Contract1"',
        type: '"contactOwner"',
        email: '"contract1@ee.proto"'
      },
      {
        id: '3',
        name: '"Contract2"',
        type: '"contactOwner"',
        email: '"contract2@ee.proto"'
      },
      // Users - a List of initial users
      {
        id: '4',
        name: '"Homer"',
        type: '"user"',
        email: '"homer@ee.proto"'
      },
      {
        id: '5',
        name: '"Marge"',
        type: '"user"',
        email: '"marge@ee.proto"'
      },
      {
        id: '6',
        name: '"Bart"',
        type: '"user"',
        email: '"bart@ee.proto"'
      },
      {
        id: '7',
        name: '"Lisa"',
        type: '"user"',
        email: '"lisa@ee.proto"'
      }
    ]
  }
})
