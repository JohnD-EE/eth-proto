<template>
<v-container fluid>
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
        <v-container fluid>
          <v-card-text>
            <h3>As a Retailer:</h3>
              <ul class="py-2 ml-5">
                <li>I can create multiple Branded Currencies (token) and configure the monetary policy (Supply, liquidity, exchange mechanism)</li>
                <li>I can reward customers with payments in the Branded Currency</li>
                <li>I can process POS payments in the Branded Currency</li>
                <li>I can create promotions (Vouchers / Coupons) for specific products using discounts, or rewards</li>
                <li>I can run an in-house Staff Rewards programme, using a Branded Currency</li>
                <li>I can spin up multiple currencies to support many promotions (e.g. a Xmas coin)</li>
              </ul>
            <h3>As a Retailer, Customer, Brand, or Partner:</h3>
            <ul class="py-2 ml-5">
              <li>I can exchange ETH for the Branded Currency at a given exchange rate (In real world, customers exchange with £s and $s)</li>
              <li>I can see my currency exchanges in my transction history</li>
              <li>I can see my transactions and balances of the Branded Currency</li>
            </ul>
            <h3>As a Customer:</h3>
            <ul class="py-2 ml-5">
              <li>I can pay with Branded Currency at the checkout (POS)</li>
              <li>I can collect promotions, and have them applied by my wallet at the POS</li>
              <li>I can send accrued Branded Currency to other users (friends/family)</li>
            </ul>
            <h3>As a Brand:</h3>
            <ul class="py-2 ml-5">
              <li>I can fund a promotion, placing funds into Escrow custody, released to a Retailer/Agents upon reaching agreed sales volumes</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-create-currency></app-create-currency>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-view-currencies></app-view-currencies>
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

export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-create-currency': CreateCurrency,
    'app-view-currencies': ViewCurrencies
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
