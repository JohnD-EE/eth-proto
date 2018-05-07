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
  auctionContracts: [],
  escrowContracts: [],
  notificationsQueue: [],
  opportunityAnalysis: [
    {
      key: 'registration',
      title: 'Registration',
      description: 'Formal registration of something, perhaps an asset, or property',
      bullets: [
        'Formal registration, e.g. government',
        'Identification, e.g. an official recognition of a person\'s identity',
        'Proof of ownership, or proof of rights',
        'Licensing, proof of authority, or proof of permission'
      ],
      applications: ['Voting', 'ID', 'Passports', 'Driver\'s license', 'Membership']
    },
    {
      key: 'governance',
      title: 'Governance',
      description: 'Distributed, Autonomous Organisations',
      bullets: [
        'Administration heavy environments, removing bureaucracy',
        'Accountability of decision making',
        'Consistent application of rules',
        'Rules without rulers',
        'Regulatory compliance',
        'Enforced responsibility',
        'Managing many autonomous, accountable, entities',
        'Scrutinisable activities'
      ],
      applications: ['Govt depts', 'Trade', 'Crowdfunding/ICOs', 'Corporate voting', 'Transparency', 'Accountable org', 'Employee empowerment']
    },
    {
      key: 'tech-savvy-millenials',
      title: 'Tech Savvy Millenials',
      description: 'Markets for the tech savvy. digitally minded, millenials',
      bullets: [
        'Millenials embrace digital tech, they grew up with the Internet',
        'Millenials are more pro-cryptocurrencies',
        'Young people rejecting big financial institutions, failed by the system',
        'Lives are lived plugged in and always online'
      ],
      applications: ['Mobile Apps', 'Alternative Finance', 'Youth Industries', 'Education']
    },
    {
      key: 'cumbersome-markets',
      title: 'Cumbersome Markets',
      description: 'Opportunities to remove friction from markets',
      bullets: [
        'Broken markets',
        'Slow, clunky, painful, annoying, old markets with many moving parts',
        'Delays and lots of human intervention required'
      ],
      applications: ['Housing market / real estate', 'Supply chain', 'Remittences']
    },
    {
      key: 'disintermediation',
      title: 'Disintermediation',
      description: 'Many intermediaries, opportunities to remove 3rd parties',
      bullets: [
        'Over reliance on 3rd party services',
        'Reliance on banks, payments services, lawyers, accountants',
        'Parisitic 3rd parties',
        'Reduce wait time, speed up end to end process without 3rd parties'
      ],
      applications: ['Retail', 'Transactions', 'Accounting', 'Legal']
    },
    {
      key: 'sovereignty',
      title: 'Sovereignty of Data',
      description: 'Giving people sovereign ownership and contole of their data',
      bullets: [
        'Privacy in the hands of the person',
        'Contol who can access your data',
        'Control how your data is used',
        'Traceability of data usage',
        'Cryptographically secured data'
      ],
      applications: ['Medical Records', 'Privacy', 'Social Media', 'Data Mining', 'ID']
    },
    {
      key: 'micropayments',
      title: 'Micropayments',
      description: 'A high volume of small transactions',
      bullets: [
        'Realtime Streaming of payments',
        'Payments too small for Visa/Paypal',
        '',
        ''
      ],
      applications: ['IoT', 'Loyalty Points', 'Tipping', 'Energy Markets']
    },
    {
      key: 'tokenization',
      title: 'Tokenization',
      description: 'Ownership and control of any asset via tokens',
      bullets: [
        'Utility tokens for applications, fuelling an economic system',
        'Creating new markets with own economic system',
        'Share holdings of an asset (e.g. Gold holdings represented by tokens)',
        'All money is a token (e.g. Bio Survival Tokens)'
      ],
      applications: ['Share holdings', 'Utility tokens', 'Attention (advertising)', 'Bandwidth']
    },
    {
      key: '',
      title: '',
      description: '',
      bullets: [
        '',
        '',
        '',
        ''
      ],
      applications: ['', '', '', '']
    },
    {
      key: '',
      title: '',
      description: '',
      bullets: [
        '',
        '',
        '',
        ''
      ],
      applications: ['', '', '', '']
    },
    {
      key: '',
      title: '',
      description: '',
      bullets: [
        '',
        '',
        '',
        ''
      ],
      applications: ['', '', '', '']
    },
    {
      key: '',
      title: '',
      description: '',
      bullets: [
        '',
        '',
        '',
        ''
      ],
      applications: ['', '', '', '']
    },
    {
      key: '',
      title: '',
      description: '',
      bullets: [
        '',
        '',
        '',
        ''
      ],
      applications: ['', '', '', '']
    }


  ]
}
