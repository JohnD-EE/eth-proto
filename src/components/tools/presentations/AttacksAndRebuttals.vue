<template>
  <v-container grid-list-md class="mb-5">
  <v-layout row wrap>
    <v-flex xs12 md12 py-4>
      <v-card>
        <v-tabs
          v-model="active"
          color="primary lighten-2 white--text"
          dark
          slider-color="yellow"
          show-arrows
          prev-icon="arrow_back_ios"
          next-icon="arrow_forward_ios"
          >
          <v-tab ripple v-for="(item, i) in tabItems" :key="i">
          {{ (i + 1) + '. ' + item.tabTitle }}
        </v-tab>

            <v-tab-item v-for="(item, i) in tabItems" :key="i">
              <v-card flat>
                <v-card-text>
                  <h2>{{ (i + 1) + '. ' + item.tabTitle }}</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img :src="'../../../../static/presentations/' + item.image" class="fitImage">
                    <h3>{{ item.imageTitle }}</h3>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card-text v-for="(subItem, s) in item.content" :key="s">
                    <h3>{{ subItem.subHeading }}</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li v-for="(bullet, b) in subItem.bullets" :key="b">{{ bullet }}</li>
                </ul>
              </v-card-text>
              </v-flex>
            </v-layout>
              </v-card>
            </v-tab-item>

          </v-tabs>

        <div class="text-xs-center pb-4">
          <v-btn @click.native="next">Next</v-btn>
        </div>
      </div>

      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<style>
  .fitImage {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<script>

export default {
  data () {
    return {
      active: null,
      tabItems: [
        { tabTitle: 'Regulation', image: 'regulation.jpg', imageTitle: 'Regulation should protect ordinary people from fraud', content: [
          { subHeading: 'Attacks', bullets: [
            'ICO (Initial Coin Offering) has come under much Scrutiny - e.g. SEC',
            'Echanges are unregulated',
            'If a cryptocurrency does not want to be regulated, it is difficult to enforce (Distriuted)'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            '2008 Financial Crisis, Sub-Prime Mortgages, repackaging and hiding risk into derivatives, run on the banks',
            'Regulation did not stop the libor rate fiddling',
            'Regulation did not stop the HSBC money laundering scandal',
            'Fractional reserve banking gives commercial banks free reign to create money as debt. Under any other circumstance this would be called counterfeitting',
            'Cryptocurrencies offer complete traceability, easier to build regulation into a cryptocurrency than with fiat currencies'
          ]}
        ]},
        { tabTitle: 'Scalability and TPS', image: 'transaction.jpg', imageTitle: 'Merchants and customers expect Visa level transaction capabilities', content: [
          { subHeading: 'Attack',
          bullets: [
            'Bitcoin processes a new block, on average, every 10 minutes, Ethereum every 14 seconds this is too slow for modern retail',
            'Visa claims the capacity to process 24,000 transactions per second'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Privacy', image: 'privacy.jpg', imageTitle: 'Who owns and controls your data?', content: [
          { subHeading: 'Attacks', bullets: [
            'There is no privacy if a distributed ledger is open and can be scrutinised by anyone',
            'The blockechain transaction forensic trail can be traced from transaction to transaction, unlocking clues to who the transaction and account belongs to'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Incumbent Resistance', image: 'banksUK.jpg', imageTitle: 'Government, banks and payments services derive their powerbase from the current system', content: [
          { subHeading: 'Attacks', bullets: [
            'Government, banks and payments services will do everything in the power to delay, disrupt, and discourage the threat of cryptocurrency adoption',
            'Use of cryptocurrency will be impeded by government imposed legal restrictions, and through banks preventing fiat currency exchanges with cryptocurrency',
            'People will not adopt cryptocurrency in light of the negative perception spread by incumbets, and the risk of legal repurcussions from doing the wrong thing'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1',
            'bullet2'
          ]}
        ]},
        { tabTitle: 'Crime', image: 'wannaCry.png', imageTitle: 'The WannaCry hackers used Ransomeware demanding payment in Cryptocurrency', content: [
          { subHeading: 'Attacks', bullets: [
            'Inherrent anonymity facilitates criminal use',
            'Money Laundering',
            'Ransomware',
            'Silk Road and Illegal Drugs'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'Car deaths does not affect car usage',
            'The Internet is used for crime, does not hinder legitimate usage',
            'USD still the primary currecny of criminal activity',
            'And the banks keep on counterfeitting - lending money into existence'
          ]}
        ]},
        { tabTitle: 'Onboarding', image: 'onboarding.jpg', imageTitle: 'Moving fiat currency into cryptocurrency is not straightforward', content: [
          { subHeading: 'Attacks', bullets: [
            'Buying into cryptocurrency is difficult due to KYC (Know Your Customer), and AML (Anti Money Laundering) compliance',
            'Need to run the gauntlet of unregulated Exchanges',
            'Unfamiliar terms, concepts and processes to navigate',
            'Scammers lurk around every corner'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1',
            'bullet2'
          ]}
        ]},
        { tabTitle: 'Poor UX', image: 'mosaicBrowser.jpg', imageTitle: 'The Mosaic Browser, launched in 1993, making the Internet accessible to all', content: [
          { subHeading: 'Attacks', bullets: [
            'Hassle, too technical',
            'Too many cryptocurrency coins, not widely accepted by mainstream merchants'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'Internet had a bad UX until the Mosaic browser abstracted away all the technical stuff',
            'Remember how paiful it was to access the Internet with a modem dial-up? People still persisted',
            'Cars had a bad UX when they were first invented',
            'Cash and cheques had an awful UX, but we still used them',
            'Vynil and cassette tapes didn\'t stop great music being made',
            'Killer apps will emerge',
            'Millenials used to the digital world won\'t care about poor UX',
            'The Internet required vast infrastructure investments to get where it is today, whereas cryptocurrency, the \'Internet of Money\', can leverage this investment, thus enhancing the case for more rapid adoption.'
          ]}
        ]},
        { tabTitle: 'Security and Hacks', image: 'hacker.jpg', imageTitle: 'Mr Robot\'s Hacker, Elliot Alderson' , content: [
          { subHeading: 'Attacks', bullets: [
            'Bad programming of smart contracts introduces vulnerabilities',
            'Mining pools have developed where the control off mining ahs become centralised into a few hands. These may collude to comprimise the integrity and security of the network',
            'People will be inheerrently bad at storing and managing their private keys and passwords'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1',
            'bullet2'
          ]}
        ]},
        { tabTitle: 'Price Volatility', image: 'priceVolatility.png', imageTitle: 'Cryptocurrency Candlestick Chart', content: [
          { subHeading: 'Attacks', bullets: [
            'Market currency prices are volatile and merchants will not accept payments in an upredictable currency',
            'Its akin to Tulip Mania or The South Sea Bubble, everything will collapse leaving foolish \'investors\' penniless'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1',
            'bullet2'
          ]}
        ]},
        { tabTitle: 'Scam / Ponzi', image: 'ponzi.jpg', imageTitle: 'Charles Ponzi, the Itallian con man, originator of the eponymously named fraud', content: [
          { subHeading: 'Attacks', bullets: [
            'Bitcoin and crypto is a scam, a Ponzi Scheme to line the pockets of the early contributors and investors',
            'There has been a slew of unregulated scam ICOs (Initial Coin Offerings), cycnically devised to enrich the founders',
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Utopianism', image: 'utopia.jpg', imageTitle: 'The \'Yellow Brick Road\' to the utopia of Oz', content: [
          { subHeading: 'Attacks', bullets: [
            'Blockchain advocates just want to decentralise or tokenise everything',
            'Peak of inflated expectations (Gartner Hype Cycle)',
            'Rush to launch ventures, feels like a \'Gold Rush\' crypto land grab, vastly overvalued projects reminiscent of the dot.com bubble of early 2000s'
          ]},
          { subHeading: 'Rebuttals', bullets: [
            'We should consider opportunities which would lie on Gartner groups \'Slope of Enlightenment\' rather than seeing Blockchain technology as a panacea',
            'Opportuity analysis should be based \'first principles\', the values and qualities inherrent in blockchain technology: Immutability, Autonomous Governance, Disintermediation, Reducing Counterparty Risk, Removing the Single Point of Failure, Traceability, Autonomous Transactions, Distributed Consensus, Uncensorable and Accessible Finance',
            'Be realistic and pragmatic, allowing change to happen organically, rather than expecting everything now'
          ]}
        ]}
      ]
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < this.tabItems.length - 1 ? active + 1 : 0).toString()
      }
  }
}
</script>
