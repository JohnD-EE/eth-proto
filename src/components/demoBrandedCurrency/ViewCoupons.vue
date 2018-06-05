<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="info" dark slot="activator" @click.native="viewCoupons">
        <v-icon left>visibility</v-icon>View Coupons
      </v-btn>
      <v-card>
        <v-toolbar dark color="info" @click.native="clickClose">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>View Coupons</v-toolbar-title>
        </v-toolbar>

        <template>
          <v-card>
            <v-card-title>
              {{user.displayName}} <br/>
              {{userDetails.ethAccount}}<br/>
              Balance: {{balanceToEther}} {{ currency.symbol }}<br/>
              Latest Block: {{latestBlockNumber}}
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.promotionName }}</td>
                <td class="text-xs-center">
                  <v-chip small :color="props.item.status.color" text-color="white">{{props.item.status.text}}</v-chip>
                </td>
                <td class="text-xs-center">{{ props.item.couponPercentDiscount }}% Off</td>
                <td class="text-xs-center">
                  <span v-for="(productSKU, p) in props.item.couponQualifyingProductSKUs"
                    :key="p">
                     {{ productListBySku[productSKU].title }}<span v-show="(p + 1) < props.item.couponQualifyingProductSKUs.length">, </span>
                   </span>
                 </td>
                <td class="text-xs-center">
                 <span v-for="(currency, c) in props.item.couponQualifyingCurrencies"
                   :key="c">
                    {{ currencyListByAddress[currency].name }}<span v-show="(c + 1) < props.item.couponQualifyingCurrencies.length">, </span>
                  </span>
                </td>
                <td class="text-xs-center">{{ props.item.couponQualifyingSpend }}</td>
                <td class="text-xs-center">{{ props.item.couponReusePolicy }}</td>
                <td class="text-xs-center">{{ props.item.couponPromotersAllowed ? props.item.couponPromoterFee + '% Fee' : 'N/A' }}</td>
                <td class="text-xs-center">{{ props.item.couponExpiryBlock }}</td>
                <td class="text-xs-center">Actions</td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import smartCouponsHelper from '../../helpers/promotions/smartCoupon'
import ProductsJSON from '../proxyData/products.json'

export default {
  data () {
    return {
      rules: false,
      dialog: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Promotion Name', value: 'promotionName', sortable: false, align: 'left' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Discount', value: 'discount', sortable: false, align: 'center' },
        { text: 'Products', value: 'couponQualifyingProductSKUs', sortable: false, align: 'center' },
        { text: 'Currencies', value: 'couponQualifyingCurrencies', sortable: false, align: 'center' },
        { text: 'Qualifying Spend', value: 'couponQualifyingSpend', sortable: false, align: 'center' },
        { text: 'Re-use Policy', value: 'couponReusePolicy', sortable: false, align: 'center' },
        { text: '3rd Party Promoters', value: 'promotionPolicy', sortable: false, align: 'center' },
        { text: 'Expiry Block', value: 'couponExpiryBlock', sortable: false, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    balanceToEther () {
      return this.$store.getters.balanceToEther
    },
    items () {
      return this.$store.getters.allSmartCouponContracts
    },
    currency () {
      return this.$store.state.currency
    },
    latestBlockNumber () {
      return this.$store.state.web3.latestBlock.number
    },
    productListBySku () {
      let productList = []
      ProductsJSON.forEach(res => {
        productList[res.SKU] = res
      })
      return productList
    },
    currencyListByAddress () {
      let currencyList = []
      let allEIP20 = this.$store.getters.allEIP20Contracts
      allEIP20.forEach(res => {
        currencyList[res.contractAddress] = res
      })
      return currencyList
    }
  },
  components: {
    //
  },
  watch: {
    //
  },
  methods: {
    viewCoupons () {
      this.$store.dispatch('resetSmartCouponContracts')
      smartCouponsHelper.updateSmartCouponsData()
    },
    clickClose () {
      this.dialog = false
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
