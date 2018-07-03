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
          <v-card-text>
            <p class="text-xs-center">Products Selected: {{ basket.length }}</p>

            <v-layout row justify-center>
              <v-dialog v-model="shopDialog" persistent max-width="580px">
                <v-btn color="success" dark slot="activator">
                  <v-icon left>add</v-icon>Choose Products
                </v-btn>
                <v-card>
                  <v-form v-model="productsValid" ref="form" lazy-validation>
                    <v-card-title>
                      <span class="headline">Fill your basket</span>
                    </v-card-title>
                    <v-card-text>
                      <v-card color="grey lighten-3" class="mb-5">
                        <v-flex xs12>
                          <app-product-picker @selected="onSelectProducts" :currencies="currenciesAvailable" productMode="shopping" padded="true"></app-product-picker>
                        </v-flex>
                      </v-card>
                    </v-card-text>
                  </v-form>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" flat @click.native="close">Close</v-btn>
                    <v-btn color="primary darken-1" flat @click.native="submit">Save</v-btn>
                  </v-card-actions>

                </v-card>

              </v-dialog>
            </v-layout>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductPicker from '../sharedComponents/ProductPicker.vue'
import CouponsList from './../sharedComponents/CouponsList.vue'
import brandedCurrencyHelper from './../../helpers/demoBrandedCurrency/brandedCurrency'
import smartCouponsHelper from './../../helpers/promotions/smartCoupon'

export default {
  data () {
    return {
      shopDialog: false,
      balance: null,
      fetchingEthAccount: true,
      fetchingBalance: false,
      basket: [],
      productsValid: true,
      retailerAc: this.$route.params.retailerAc
    }
  },
  components: {
    'app-coupons-list': CouponsList,
    'app-product-picker': ProductPicker
  },
  computed: {
    ...mapGetters({
      balanceToEther: 'balanceToEther'
    }),
    currenciesAvailable () {
      let allEIP20 = this.$store.getters.allEIP20Contracts
      let items = []
      let retailerAc = this.retailerAc
      allEIP20.forEach(res => {
        if (res.owner === retailerAc) {
          items.push({text: res.name, symbol: res.symbol, contractAddress: res.contractAddress})
        }
      })
      return items
    },
    retailer () {
      let retailerAc = this.retailerAc
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
    onSelectProducts (value) {
      if (value.products) {
        this.basket = []
        value.products.forEach(res => {
          this.basket.push(res)
        })
      } else {
        console.log('No Products Selected')
      }
    },
    convert (eth, conversionKey) {
      return this.$store.getters.currencyConverter(eth, conversionKey)
    },
    balanceUpdated () {
      this.fetchingBalance = false
      brandedCurrencyHelper.updateEIP20Data()
    },
    checkBalance () {
      this.$store.dispatch('updateAccount')
    },
    close () {
      this.clear()
      this.shopDialog = false
    },
    clear () {
      this.$refs.form.reset()
    },
    submit () {
      this.close()
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
