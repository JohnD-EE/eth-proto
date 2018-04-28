export default {
  appTitle: 'Blockchain Prototype',
  currency: {
    name: 'Ethereum',
    symbol: 'ETH'
  },
  error: null,
  loading: false,
  accountSeedingLoading: false,
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
  allUsers: [],
  txComposer: [],
  userTxs: [],
  defaultContractAddresses: [
    { instance: 'AuctionFactory', name: 'Auction Factory', address: '0x782A2a5109718F1B9cE2aEcBb6900Cd30Eba2832' },
    { instance: 'EscrowFactory', name: 'Escrow Factory', address: '0xB8ADA7A5c2bB51D0270518F515b00Fd050Ad1850' }
  ],
  contracts: [],
  auctionContracts: []
}
