export default {
  appTitle: 'EE Blockchain Prototype',
  error: null,
  loading: false,
  user: {
    loggedIn: false,
    displayName: null,
    email: null
  },
  userDetails: {
    displayName: null,
    ethAccount: null,
    ethBalance: null
  },
  web3: {
    host: null,
    coinbase: null,
    networkId: null,
    networkType: null,
    currentProvider: null,
    latestBlock: {}
  },
  ganacheAccounts: [],
  allUsers: []
}
