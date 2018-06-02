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
                <td>Status</td>
                <td class="text-xs-center">{{ props.item.couponPercentDiscount }}</td>
                <td class="text-xs-center">
                  <span v-for="(product, p) in props.item.couponQualifyingProductSKUs"
                    :key="p">
                     {{ product }}
                   </span>
                 </td>
                <td class="text-xs-center">{{ props.item.couponQualifyingSpend }}</td>
                <td class="text-xs-center">{{ props.item.couponReusePolicy }}</td>
                <td class="text-xs-center">{{ props.item.couponPromotersAllowed }}</td>
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
        { text: 'Qualifying Spend', value: 'couponQualifyingSpend', sortable: false, align: 'center' },
        { text: 'Re-use Policy', value: 'couponReusePolicy', sortable: false, align: 'center' },
        { text: 'Promotion Policy', value: 'promotionPolicy', sortable: false, align: 'center' },
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
