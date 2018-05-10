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
    { instance: 'EscrowFactory', name: 'Escrow Factory', address: '0xB8ADA7A5c2bB51D0270518F515b00Fd050Ad1850' },
    { instance: 'BrandFundedFactory', name: 'Brand Funded Factory', address: '0xF6d5D1eF4E262C7Cf0ec648B6a170954b70c6957' }
  ],
  contracts: [],
  auctionContracts: [],
  escrowContracts: [],
  brandFundedContracts: [],
  notificationsQueue: [],
  userOpportunities: [],
  opportunityAnalysis: [
    {
      key: 'registrar',
      title: 'Registrar',
      description: 'Formal registration of something, an asset, or property',
      bullets: [
        'Formal registration, e.g. government',
        'Identification, e.g. an official recognition of a person\'s identity',
        'Proof of ownership, or proof of rights',
        'Licensing, proof of authority, or proof of permission',
        'Autheniticating'
      ],
      applications: ['Voting', 'ID', 'Passports', 'Driver\'s License', 'Membership', 'Authenicity']
    },
    {
      key: 'governance',
      title: 'Governance',
      description: 'Distributed, Autonomous, Organisations',
      bullets: [
        'Administration heavy environments, removing bureaucracy',
        'Accountability of decision making',
        'Consistent application of rules',
        'Rules without rulers',
        'Regulatory compliance',
        'Enforced responsibility',
        'Process automation',
        'Managing many autonomous, accountable, entities',
        'Scrutinisable activities'
      ],
      applications: ['Govt Depts', 'Trade', 'Crowdfunding/ICOs', 'Corporate Voting', 'Transparency', 'Accountable Orgs', 'Employee Empowerment']
    },
    {
      key: 'tech-savvy-millennials',
      title: 'Tech-Savvy Millennials',
      description: 'Markets for tech-savvy, digitally minded, millennials',
      bullets: [
        'Millennials embrace digital tech, they grew up with the Internet',
        'Millennials are more pro-cryptocurrencies',
        'Young people rejecting big financial institutions, failed by the system, open to alternatives',
        'Lives are lived plugged in and always online',
        'Kickstarting a venture with new users is difficult, pitch to the most willing'
      ],
      applications: ['Mobile Apps', 'Alternative Finance', 'Youthful Industries', 'Education']
    },
    {
      key: 'cumbersome-markets',
      title: 'Cumbersome Markets',
      description: 'Opportunities to remove friction from markets',
      bullets: [
        'Broken markets',
        'Slow, clunky, painful, annoying, old markets with many moving parts',
        'Processes prone to delays, or complete market failures',
        'Lots of human intervention required',
        'Highly administrative, lots of red tape & paperwork',
        'High transaction costs',
        'Significant counter-party risk',
        'Process automation',
        'Markets prone to corruption'
      ],
      applications: ['Property Markets', 'Construction', 'Manufacturing', 'Supply Chain', 'Remittences', 'Government']
    },
    {
      key: 'disintermediation',
      title: 'Disintermediation',
      description: 'Many intermediaries, opportunities to remove 3rd parties',
      bullets: [
        'Over reliance on 3rd party services',
        'Reliance on banks, payments services, lawyers, accountants',
        'Removing parisitic 3rd parties',
        'Peer-to-peer economics',
        'Reduce wait time, speed up end-to-end process without 3rd parties',
        'Disrupting service providers, especially the likes of AirBnB and Uber'
      ],
      applications: ['Retail', 'Transactions', 'Accounting', 'Legal', 'Services', 'Trade']
    },
    {
      key: 'sovereignty',
      title: 'Sovereignty of Data',
      description: 'Giving people/busnesses sovereign ownership and control of their data',
      bullets: [
        'Privacy in the hands of the person',
        'Control who can access your data',
        'Control how your data is used',
        'Traceability of data usage',
        'Cryptographically secured data'
      ],
      applications: ['Medical Records', 'Privacy', 'Social Media', 'Data Mining', 'ID', 'Data Monetisation']
    },
    {
      key: 'micropayments',
      title: 'Micropayments',
      description: 'A high volume of small transactions',
      bullets: [
        'Realtime Streaming of payments',
        'Payments too small for Visa/Paypal',
        'Small busuinesses',
        'High velocity transfer of value',
        'Ad-hoc rewards / incentives',
        'Easier peer-to-peer transactions, e.g. trading home generated energy',
        'Micro consumption of services'
      ],
      applications: ['IoT', 'Loyalty Points', 'Tipping', 'Online Reputation', 'Energy Markets', 'Trasnport']
    },
    {
      key: 'tokenization',
      title: 'Tokenization',
      description: 'Ownership and control of any asset via tokens and cryptography',
      bullets: [
        'Digital fingerprinting',
        'Digital representation of an asset, secure transfer of ownership',
        'Utility tokens for applications, fuelling an economic system',
        'Creating new markets with own economic system',
        'Rights management and monetising intellectual property',
        'Share holdings of an asset (e.g. Gold holdings represented by tokens)',
        'All fiat currencies are tokens (e.g. Bio Survival Tokens)',
        'Create new markets through monetisation possibilities'
      ],
      applications: ['Share holdings', 'Security', 'Utility Tokens', 'Bandwidth', 'Rights Management', 'Monetisation of Anything']
    },
    {
      key: 'finance',
      title: 'Finance',
      description: 'Free market programmable money in financial services',
      bullets: [
        'Pure free market economics',
        'Cross border transactions',
        'Uncensored money',
        'Peer-to-peer finance',
        'Move large funds with minimal cost or friction',
        'Banking for the unbanked',
        'Unbanking the banked'
      ],
      applications: ['Banking', 'Insurance', 'Economics', 'Payments', 'Funding']
    },
    {
      key: 'counteparty-risk',
      title: 'Counterparty Risk',
      description: 'Markets relying on a high degree of trust between participants',
      bullets: [
        'Fair and predictable trades',
        'Agreements locked down in code',
        'Proof that the other party has the means to pay',
        'Trasnparancy, all parties have full information',
        'Removal of uncertainty from complex deals',
        'Trustless markets where consensus is distributed'
      ],
      applications: ['Gambling', 'Trade', 'Security', 'Fraud Prevention', 'Legal', 'Remittences']
    },
    {
      key: 'traceabiity',
      title: 'Traceability',
      description: 'Using the immutable qualities Blockchain for end-to-end accountability',
      bullets: [
        'End-to-end process accountability',
        'Sign-off or scanning an item (e.g.RFID) logs immutable record',
        'Avoiding supply chain scandals',
        'Traceability from \'farm to fork\'',
        'Projects - who did what when?',
        'Tracking value flows inside an organisation, e.g. Government spending (Councils, NHS)',
        'What happened to my charity donation or government foreign aid contribution?',
        'Exposing inefficiencies, and avoiding corruption',
        'Product Authenticity'
      ],
      applications: ['Supply Chain', 'Compliance', 'Project Management', 'Government Spending', 'Charity', 'Import/Export']
    },
    {
      key: 'community',
      title: 'Community',
      description: 'Community cohesion, identity, and trade through blockchain',
      bullets: [
        'Singly identifyable communities, with common needs',
        'Creating a branded blockchain based community eco-system',
        'Easy transactions between members',
        'Collective funding, collective projects',
        'Marketing to communities of shared interests',
        'Incentivising action/behaviour for community benefit'
      ],
      applications: ['Clubs/Hobbyist', 'Geographical Communities', 'Shared Interests']
    },
    {
      key: 'distributed-consensus',
      title: 'Distributed Consensus',
      description: 'Where we all agree on the cryptographically secured \'Truth\'',
      bullets: [
        'Verifying the truth',
        'Removing Fraud',
        'Trust, avoid corruption',
        'Shared Ledgers',
        'Remove single point of failure',
        'Syndication of services',
        'E.g. where aircraft need to agree on which version of software to run',
        'Immutability',
        'Proof, reputation and credit worthiness, e.g. Self managed identity proof'
      ],
      applications: ['Legal', 'Business Identity', 'Safety', 'Fraud', 'Security', 'Trust']
    },
    {
      key: 'crowdsourcing',
      title: 'Crowdsourcing',
      description: 'Leveraging the wisdom of the crowd',
      bullets: [
        'Forecasting and prediction markets',
        'Freelance peer to peer markets',
        'Incentivising micro-contributions, e.g. surveys',
        'Research, consulting and analyisis'
      ],
      applications: ['Forecasting/Prediction', 'Freelance', 'Resourcing']
    },
    {
      key: 'uncensorable',
      title: 'Uncensorable',
      description: 'You own your money and can decide how to spend it',
      bullets: [
        'You money can freely cross borders',
        'Very large transfers, without banks',
        'When depositing money in a bank you make an unsecured loan to the bank, the bank owns it and controls how it is used',
        'Illegal activities',
        'Privacy'
      ],
      applications: ['Uncensored Money', 'Illicit Activities', 'Privacy']
    },
    {
      key: 'political',
      title: 'Political and Social',
      description: 'Political and social motivations in favour of decentralisation',
      bullets: [
        'Anarchists and libertarians',
        'Sovereignty of the individual',
        'Free markets, anarchocapitalism',
        'Democratising money and markets, levelling the playing field',
        'Solving social problems, where fiat currency just doesn\'t work, e.g. homelessness',
        'Money creation, and economics in hands of people, not authoritarian control',
        'Disincentivising corruption'
      ],
      applications: ['Political Movements', 'Anti-Political Movements', 'Economics', 'Social Problems']
    }
  ]
}
