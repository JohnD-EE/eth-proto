<template>
  <v-layout row>
    <v-btn outline small fab color="primary" slot="activator" dark @click.native.stop="viewCoupons">{{ coupons.length }}</v-btn>

    <v-dialog v-model="couponDialog" max-width="490">
        <v-card>

    <v-flex xs12>
      <v-card>
        <v-card-title class="headline">Coupons</v-card-title>

        <v-list three-line subheader>
          <v-list-tile v-for="(coupon, c) in coupons" :key="c">
            <div :id="'coupon' + c" class="text-xs-center"><canvas height="76" width="76" style="width: 76px;" class="blue-grey lighten-2 mr-4"></canvas></div>
            <v-list-tile-content @click="" class="ml-3">
              <v-list-tile-title>{{ coupon.promotionName }}
                </v-list-tile-title>
              <v-list-tile-sub-title>{{ offerText(coupon) }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                {{ detailsText(coupon) }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-chip small :color="coupon.status.color" text-color="white">{{coupon.status.text}}</v-chip>
            </v-list-tile-action>
            <v-list-tile-action v-if="checkable">
              <v-checkbox v-model="couponChecked[c]" @click.native=""></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat="flat" @click.native="couponDialog=false">Close</v-btn>
    </v-card-actions>

  </v-card>
  </v-dialog>

  </v-layout>

</template>

<script>
import EthereumQRPlugin from 'ethereum-qr-code'

export default {
  data () {
    return {
      couponDialog: false,
      couponChecked: []
    }
  },
  props: ['coupons', 'currencySymbol', 'checkable'],
  computed: {
    //
  },
  methods: {
    createQRCode (couponAddress, c) {
      const qr = new EthereumQRPlugin()
      const sendDetails = {
        to: couponAddress
      }
      const configDetails = {
        size: 76,
        selector: '#coupon' + c,
        options: {
          margin: 2
        }
      }
      qr.toCanvas(sendDetails, configDetails)
    },
    viewCoupons () {
      this.couponDialog = true
      this.coupons.forEach((res, c) => {
        this.createQRCode(res.contractAddress, c)
      })
    },
    offerText (coupon) {
      let discountType = coupon.couponDiscountType
      let fixedDiscount = coupon.couponFixedDiscount
      let percentDiscount = coupon.couponPercentDiscount
      let qualifyingSpend = coupon.couponQualifyingSpend
      let reusable = coupon.couponReusePolicy === 'multi'

      let text = 'Offer: '

      // discounts
      if (discountType === 'percentDiscount') {
        text += percentDiscount + '% Off'
      } else if (discountType === 'fixedDiscount') {
        text += fixedDiscount + ' ' + this.currencySymbol + ' Off'
      }

      if (qualifyingSpend > 0) {
        text += ' when you spend over ' + qualifyingSpend + ' ' + this.currencySymbol
      }

      if (reusable) {
        text += ' (Multi-use)'
      }

      return text
    },
    detailsText (coupon) {
      let expiryBlock = coupon.couponExpiryBlock
      let status = coupon.status.code

      let text = ''

      if (status === 'active') {
        text += 'Expiry: Block ' + expiryBlock
      } else {
        text += 'Expired at block ' + expiryBlock
      }

      return text
    }
  }
}
</script>
