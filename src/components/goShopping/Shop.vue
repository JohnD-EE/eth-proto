<template>
<v-container fluid class="mb-5">
  <v-layout row wrap>
    <v-flex xs12 sm12 md8 offset-md2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>shopping_cart</v-icon> Go Shopping: {{ retailer.displayName }}</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <div class="text-xs-right">
                  <v-avatar size="86px">
                    <img :src="retilerProfileImage" onerror="this.src='../../static/profile/noImage.jpg'">
                  </v-avatar>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-container fluid>
          <v-card-text>
            <p class="text-xs-center">Look at these wonderful goodies on sale today..</p>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CouponsList from './../sharedComponents/CouponsList.vue'
import brandedCurrencyHelper from './../../helpers/demoBrandedCurrency/brandedCurrency'
import smartCouponsHelper from './../../helpers/promotions/smartCoupon'

export default {
  data () {
    return {
      balance: null,
      fetchingEthAccount: true,
      fetchingBalance: false,
    }
  },
  components: {
    'app-coupons-list': CouponsList
  },
  computed: {
    ...mapGetters({
      balanceToEther: 'balanceToEther'
    }),
    retailer () {
      let retailerAc = this.$route.params.retailerAc
      let retailer = this.$store.getters.retailer(retailerAc)
      return retailer
    },
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    currency () {
      return this.$store.state.currency
    },
    usersCoupons () {
      return this.$store.state.userDetails.walletCoupons
    },
    retilerProfileImage () {
      let path = '../../static/profile/'
      let filename = this.retailer.displayName
      filename = filename.split(' ').join('')
      let fileType = '.jpg'
      return path + filename + fileType
    }
  },
  watch: {
    balanceToEther (value) {
      if (!this.fetchingBalance) {
        // balance has updated so show spinner
        this.fetchingBalance = true
        setTimeout(this.balanceUpdated, 800)
        return
      }
      if (value !== null) {
        this.fetchingBalance = false
      } else {
        this.fetchingBalance = true
      }
    }
  },
  methods: {
    convert (eth, conversionKey) {
      return this.$store.getters.currencyConverter(eth, conversionKey)
    },
    balanceUpdated () {
      this.fetchingBalance = false
      brandedCurrencyHelper.updateEIP20Data()
    },
    checkBalance () {
      this.$store.dispatch('updateAccount')
    }
  },
  mounted: function () {
    console.log('retailerAC',this.$route.params.retailerAc)
    this.fetchingBalance = true
    setTimeout(this.balanceUpdated, 1600)
    this.checkBalance()
    brandedCurrencyHelper.updateEIP20Data()
    smartCouponsHelper.updateSmartCouponsData()
  }
}
</script>
