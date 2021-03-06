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
    email: null,
    uid: null
  },
  userDetails: {
    displayName: null,
    ethAccount: null,
    ethBalance: null,
    walletCoupons: []
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
  userTxsLatestBlock: 0,
  defaultContractAddresses: [
    { instance: 'AuctionFactory', name: 'Auction Factory', address: '0x782A2a5109718F1B9cE2aEcBb6900Cd30Eba2832' },
    { instance: 'EscrowFactory', name: 'Escrow Factory', address: '0xB8ADA7A5c2bB51D0270518F515b00Fd050Ad1850' },
    { instance: 'BrandFundedFactory', name: 'Brand Funded Factory', address: '0xF6d5D1eF4E262C7Cf0ec648B6a170954b70c6957' },
    { instance: 'EIP20Factory', name: 'EIP20 Factory', address: '0xA47AE1210aC9Cd35457242503c4b0254905F8574' },
    { instance: 'SmartCouponFactory', name: 'Smart Coupon Factory', address: '0xb5008670CCfcfb36Cf993494Ee426d34F0891fE1' },
    { instance: 'SmartVoucherFactory', name: 'Smart Voucher Factory', address: '0xA7C893C79e5faB65B4eA8dC89760972E030599f4' },
    { instance: 'SmartOfferFactory', name: 'Smart Offer Factory', address: '0x6186A48B091a8B5bCaF89D30471856782f42189a' }
  ],
  contracts: [],
  auctionContracts: [],
  escrowContracts: [],
  brandFundedContracts: [],
  eip20Contracts: [],
  smartCouponContracts: [],
  smartVoucherContracts: [],
  smartOfferContracts: [],
  notificationsQueue: [],
  userOpportunities: [],
  currencyConversionRates: {
    ethusd: '700',
    ethgbp: '523'
  }
}
