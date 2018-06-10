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
        { tabTitle: 'Regulation', image: 'regulation.jpg', content: [
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
        { tabTitle: 'Transaction Speed', image: 'transaction.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Privacy', image: 'privacy.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Incumbent Resistance', image: 'banksUK.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Crime', image: 'wannaCry.png', content: [
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
        { tabTitle: 'Onboarding', image: 'onboarding.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'UX', image: 'mosaicBrowser.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'Hassle, too technical',
            'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'Internet had a bad UX until the Mosaic browser abstracted away all the technical stuff',
          'Cars had a bad UX when they were first invented',
          'Cash and cheques had an awful UX, but we still used them',
          'Vynil and cassette tapes didn\'t stop great music being made',
          'Killer apps will emerge',
          'Millenials used to the digital world won\'t care about poor UX'
          ]}
        ]},
        { tabTitle: 'Security and Hacks', image: 'hacker.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'Bad programming of smart contracts introduces vulnerabilities', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Price Volatility', image: 'priceVolatility.png', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Scam / Ponzi', image: 'ponzi.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Utopianism', image: 'utopia.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
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
