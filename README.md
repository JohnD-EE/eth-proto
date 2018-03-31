# EE Blockchain Prototype

## Project Overviews
* [Main Project](https://eagleeye.atlassian.net/wiki/spaces/blockchain/overview)
* [Prototyping](https://eagleeye.atlassian.net/wiki/spaces/blockchain/pages/301203733/Blockchain+Prototyping)

## Todo
- [x] Create a vue.js front end with user authentication via firebase.
- [ ] Install the Truffle eco-system for smart contract development, compiling, deployment to blockchain and migrations to new version of contracts. Requires learning time...
- [ ] Install Web3.js in as npm package to interact with Smart Contracts from the front-end
- [ ] Create a test smart contract, with front-end funtionality to allow a user to create an ethereum address on the local blockchain. The Ethereum address will be linked to their user login details.  Provide front-end functions to send and receive funds and to query balances and transactions.
- [ ] The above will provide the foundations for doing EE specific prototyping. 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

The initial commit for this project is based off a vue.js / Google Firebase tutual on [medium](https://medium.com/@oleg.agapov/basic-single-page-application-using-vue-js-and-firebase-part-1-9e4c0c11a228)

## Installing the Ethereum components to the local environment

``` bash
# Install truffle, the Ethereum development framework from Consensys
npm install -g truffle
truffle version, to check installed 

# install ganache as a local test Ethereum blockchain
See downloads at http://truffleframework.com/ganache/
```


