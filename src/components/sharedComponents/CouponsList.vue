<template>

  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-card-title class="headline">Coupons</v-card-title>
        <v-card-text>My Coupons</v-card-text>
        <v-list three-line subheader>
          <v-list-tile v-for="(coupon, c) in coupons" :key="c">
            <div id="coupon" class="text-xs-center"><canvas height="76" width="76" style="width: 76px;" class="blue-grey lighten-2 mr-4"></canvas></div>
            <v-list-tile-content @click="">
              <v-list-tile-title>{{ coupon.promotionName }}</v-list-tile-title>
              <v-list-tile-sub-title>Info</v-list-tile-sub-title>
              <v-list-tile-sub-title>
                More Info
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox v-model="couponChecked[c]" @click.native=""></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import EthereumQRPlugin from 'ethereum-qr-code'

export default {
  data () {
    return {
      couponChecked: []

    }
  },
  props: ['coupons'],
  computed: {
    //
  },
  methods: {
    createQRCode (couponAddress) {
        const qr = new EthereumQRPlugin()

        const sendDetails = {
          to: couponAddress
        }
        const configDetails = {
          size: 76,
          selector: '#coupon',
          options: {
            margin: 2
          }
        }
        qr.toCanvas(sendDetails, configDetails)
    }
  },
  mounted: function () {
    this.coupons.forEach(res => {
      console.log('creatingQRCoupon: ', res.contractAddress)
      this.createQRCode(res.contractAddress)
    })
  }
}
</script>
