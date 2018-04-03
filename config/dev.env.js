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
    apiKey: '""',
    authDomain: '""',
    databaseURL: '""',
    projectId: '""'
  },

  web3: {
    injectedProvider: false, // default to an injected provider (e.g. Metamask) if available
    localProviderUrl: '"http://localhost:8545"' // use ganach-cli as a dev ethereum blockchain
  }

})
