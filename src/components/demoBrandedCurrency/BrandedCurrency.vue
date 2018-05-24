<template>
<v-container fluid class="mb-5">

  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm7 align-end flexbox>
                <span class="headline"><v-icon dark left large>payment</v-icon> Branded Currency</span>
              </v-flex>
              <v-flex xs12 sm5 align-end flexbox>
                <div class="text-xs-right">
                  <v-avatar size="86px">
                    <img :src="profileImage" onerror="this.src='../../../static/profile/noImage.jpg'">
                  </v-avatar>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>

        <v-card-text class="grey lighten-4">
          <v-flex xs12>
            <h3>Description:</h3>
          <p>Create a points based loaylty system, or a real cryptocurency for whatever purpose you choose, fully controlled by Smart Contracts</p>
        </v-flex>
          <template>

              <v-layout row wrap>
                <v-flex xs12 md8 class="mb-3">
                  <v-expansion-panel popout>
                    <v-expansion-panel-content v-for="(item,i) in storyItems" :key="i">
                      <div slot="header">{{ item.header }}</div>
                      <v-card class="grey lighten-3">
                        <v-card-text>
                          <Ul class="ml-4" style="list-style-type:disc">
                            <li v-for="(listItem,l) in item.descriptions" :key="l">
                              {{ listItem }}
                            </li>
                          </ul>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
                <v-flex xs12 md4 class="text-md-right">
                    <v-tooltip v-for="(item,i) in qualities" :key="i" bottom min-width="100px">
                  <v-chip small color="orange" text-color="white" slot="activator">
                    {{ item.quality }}
                  </v-chip>
                    <span>{{ item.description }}</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
          </template>
        </v-card-text>

        <v-container fluid>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md4 align-end flexbox>
                  <app-create-currency></app-create-currency>
                </v-flex>
                <v-flex sm12 md4 align-end flexbox>
                  <app-view-currencies></app-view-currencies>
                </v-flex>
                <v-flex sm12 md4 align-end flexbox>
                  <app-create-promotion></app-create-promotion>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-container>

      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateCurrency from './CreateCurrency.vue'
import ViewCurrencies from './ViewCurrencies.vue'
import CreatePromotion from './CreatePromotion.vue'

export default {
  data () {
    return {
      storyItems: [{
        header: 'As a Retailer:',
        descriptions: [
          'I can create multiple Branded Currencies (token) and configure the monetary policy (Supply, liquidity, exchange mechanism)',
          'I can reward customers with payments in the Branded Currency',
          'I can process POS payments in the Branded Currency',
          'I can create promotions (Vouchers / Coupons) for specific products using discounts, or rewards',
          'I can run an in-house Staff Rewards programme, using a Branded Currency',
          'I can spin up multiple currencies to support many promotions (e.g. a Xmas coin)'
        ]
      },
      {
        header: 'As a Retailer, Customer, Brand, or Partner:',
        descriptions: [
          'I can exchange ETH for the Branded Currency at a given exchange rate (In real world, customers exchange with £s and $s)',
          'I can see my currency exchanges in my transction history',
          'I can see my transactions and balances of the Branded Currency'
        ]
      },
      {
        header: 'As a Customer:',
        descriptions: [
          'I can pay with Branded Currency at the checkout (POS)',
          'I can collect promotions, and have them applied by my wallet at the POS',
          'I can send accrued Branded Currency to other users (friends/family)'
        ]
      },
      {
        header: 'As a Brand:',
        descriptions: [
          'I can fund a promotion, placing funds into Escrow custody, released to a Retailer/Agents upon reaching agreed sales volumes'
        ]
      }],
      qualities: [{
        quality: 'Secure',
        description: 'A distributed ledger stores all balances, no single point of failure'
      },
      {
        quality: 'Fraud Proof',
        description: 'Historical transactions, once written to the blockchain, are tamper proof'
      },
      {
        quality: 'Traceable',
        description: 'A timestamped audit trail of all transactions'
      },
      {
        quality: 'Low Cost Transactions',
        description: '3rd party payments services (Visa) and banks are not required, large transactions are inexpensive'
      },
      {
        quality: 'Programmable',
        description: 'Prgrammable money, flexible, configurable to your needs'
      },
      {
        quality: 'Brandable',
        description: 'Currency as a marketing tool: beyond a medium of exchange and store of value'
      }
      ]
    }
  },
  components: {
    'app-create-currency': CreateCurrency,
    'app-view-currencies': ViewCurrencies,
    'app-create-promotion': CreatePromotion
  },
  computed: {
    ...mapGetters({
      //
    }),
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    currency () {
      return this.$store.state.currency
    },
    profileImage () {
      let path = '../../../static/profile/'
      let filename = this.$store.state.user.displayName
      filename = filename.split(' ').join('')
      let fileType = '.jpg'
      return path + filename + fileType
    }
  },
  watch: {
    //
  },
  methods: {
    //
  }
}
</script>
