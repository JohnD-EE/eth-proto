<template>
  <v-layout row>
    <v-flex xs12>
      <v-card :class="{ 'px-4': padded, 'py-4': padded }">
        <v-flex xs12>
          <v-select
          :items="prodcutCategories"
          v-model="categoriesFiltered"
          label="Select Product Category:"
          multiple
          hint="Filter the product list"
          persistent-hint
          ></v-select>
        </v-flex>
        <v-list three-line subheader>
          <v-list-tile v-for="(product, p) in products" :key="p" v-if="filteredCategory(product.categories)">
            <img :src="'../../../static/products/' + product.image" onerror="this.src='../../../static/profile/noImage.jpg'" width="76" class="mr-4">
            <v-list-tile-content @click="">
              <v-list-tile-title>{{ product.title }} - {{ product.attributes.size }}</v-list-tile-title>
              <v-list-tile-sub-title>&pound;{{ (product.priceInPence / 100).toFixed(2) }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="productMode === 'promoCreate'">
                <span class="caption" v-for="(category, c) in product.categories" :key="c">{{ category }}<span v-show="c < (product.categories.length -1)">, </span></span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else-if="productMode === 'shopping'">
                <span v-for="(currencyPrice, cp) in convertPrice(product.priceInPence)" :key="cp">
                  {{ currencyPrice.price }} {{ currencyPrice.symbol }}<span v-if="(cp + 1) < convertPrice(product.priceInPence).length">, </span>
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action >
              <v-badge v-model="quantityCheck[p]" right>
              <span slot="badge">{{ quantityCheck[p] }}</span>
              <span>
                <v-checkbox v-model="productsSelected[p]" @click.native="productSelection()"></v-checkbox>
                </span>
              </v-badge>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductsJSON from '../proxyData/products.json'
import Utils from './../../helpers/utils'

export default {
  data () {
    return {
      productsSelected: [],
      quantity: [].fill.call({length: ProductsJSON.length}, 0),
      quantityItems: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      prodcutCategories: ['food', 'beverages', 'healthy', 'non-alchoholic', 'alcoholic', 'salad', 'vegetables', 'fruit', 'nuts', 'seeds'],
      categoriesFiltered: ['food', 'beverages', 'healthy', 'non-alchoholic', 'alcoholic', 'salad', 'vegetables', 'fruit', 'nuts', 'seeds']
    }
  },
  props: ['padded', 'productMode', 'currencies'],
  computed: {
    quantityCheck () {
      let quantities = []
      for (let i = 0; i <= ProductsJSON.length; i++) {
        if (this.quantity[i] && this.productMode === 'shopping') {
          quantities.push(this.quantity[i])
        } else {
          quantities.push(0)
        }
      }
      return quantities
    },
    products () {
      return ProductsJSON
    },
    currencyContracts () {
      let contracts = []
      this.currencies.forEach(res => {
        contracts.push(res.contractAddress)
      })
      return contracts
    },
    retailerCurrencies () {
      let retailerCurrencies = []
      let eip20Currencies = this.$store.getters.allEIP20Contracts
      eip20Currencies.forEach(res => {
        console.log('currencyContracts', this.currencyContracts)
        console.log('res', res.contractAddress)
        if (this.currencyContracts.includes(res.contractAddress)) {
          retailerCurrencies.push(
            {
              name: res.name,
              userBalance: res.userBalance,
              isToken: res.isToken,
              isPointsOnly: res.isPointsOnly,
              userIsIssuer: res.userIsIssuer,
              isTransferable: res.isTransferable,
              contractAddress: res.contractAddress,
              exchangeRateToEth: res.exchangeRateToEth,
              owner: res.owner,
              symbol: res.symbol
            }
          )
        }
      })
      return retailerCurrencies
    }
  },
  methods: {
    init () {
      //
    },
    filteredCategory (categories) {
      let matched = false
      let categoriesFiltered = this.categoriesFiltered
      categoriesFiltered.forEach(res => {
        if (categories.includes(res)) {
          matched = true // as soon as we find a match, return true
        }
      })
      return matched
    },
    productSelection () {
      // emit an array of product SKUs
      let skus = []
      this.productsSelected.forEach((res, i) => {
        skus.push(this.products[i].SKU)
      })
      this.$emit('selected', {products: skus})
      this.updateQuantities()
    },
    updateQuantities () {
      for (let i = 0; i <= ProductsJSON.length; i++) {
        if (this.productsSelected[i]) {
          this.quantity[i] = 1
        } else if (!this.productsSelected[i] && this.quantity[i]) {
          this.quantity[i] = 0
        }
      }
    },
    convertPrice(priceInPence) {
      // itereate through each currency and return an object of converted prices
      let convertedPrices = []
      console.log('retailerCurrencies', this.retailerCurrencies)
      this.retailerCurrencies.forEach(res => {
        console.log('res.exchangeRateToEth', res.exchangeRateToEth)
        let priceInEth = this.convertPenceToEth(priceInPence / 100)
        let convertedPrice = (res.exchangeRateToEth * priceInEth).toFixed(4)
        convertedPrices.push({ 'symbol': res.symbol, 'price': convertedPrice })
      })
      return convertedPrices
    },
    convertPenceToEth (pence) {
      return this.$store.getters.currencyConverter(pence, 'ethgbp', true)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
