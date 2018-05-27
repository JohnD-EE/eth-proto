<template>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-card>
        <v-toolbar dark color="primary" @click.native="clickClose">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Definitions: Promotion Types</v-toolbar-title>
        </v-toolbar>

        <v-tabs
          v-model="active"
          color="primary lighten-2 white--text"
          dark
          slider-color="yellow"
          >
          <v-tab ripple>
          Smart Offers
          </v-tab>
          <v-tab ripple>
          Smart Vouchers
          </v-tab>
          <v-tab ripple>
          Smart Coupons
          </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h3>Smart Offers Characteristics:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>Consumer behaviour is 'rewarded' financially with discounts against the purchases in their shopping basket, or with promises of future financial rewards upon performing desired future behaviours</li>
                    <li>Smart Offers are intrinsic to the currency itself, automatically increasing the purchasing power of the currency to reward behaviours</li>
                  </ul>

                  <h3>Smart Offers Behaviours:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>A Smart Offer is automatically applied at the till if the consumer's behaviour qualifies</li>
                  </ul>

                  <h3>Smart Offers Examples:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>Buy One, Get Discount on 2nd</li>
                    <li>Share to Activate Discount</li>
                    <li>Buy one now, get next one free next month.</li>
                    <li>Spend £50 units and get Points</li>
                    <li>Spend £50 and get Discount</li>
                    <li>Spend £20 on Fruit and get discount</li>
                  </ul>

                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h3>Smart Voucher Characteristics:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>A Smart Voucher is owned by the customer. It is a living object with a balanced, controlled only by the user customer</li>
                    <li>A Voucher can be provided to a specific user, has a value and can be redeemed against purchases</li>
                    <li>It could be a gift voucher or any other kind of voucher e.g. a customer services goodwill voucher or staff rewards voucher</li>
                    <li>A voucher is often bought for money (e.g. gift voucher) or is deliberately intended to represent money (goodwill voucher)</li>
                  </ul>

                  <h3>Smart Voucher Behaviours:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>A voucher may be stored in a users wallet and applied to purchases</li>
                    <li>A voucher may be redeemed</li>
                    <li>A voucher may be redeemed against a specific range of goods, or within a specific store</li>
                    <li>A voucher may have limits on when it can be applied to a purchase (redemption windows) or time limits</li>
                    <li>A voucher may me usable against a single purchase or multiple purchases (if multiple purchase its value is diminished each time it is used)</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h3>Smart Coupon Characteristics:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>Consumer behaviour is incetivised via the offer of financial incentives (e.g. discounts) upon the performance of qualifying behaviour (buy certain goods or spending qualifying amounts)</li>
                  </ul>
                  <h3>Smart Coupon Behaviours:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>A Smart Coupon is not owned by a single customer, like a Smart Voucher, it is broadcast and available to anyone who wants it</li>
                    <li>A Smart Coupon is broadcast to any number of users who can be picked up by a user, placed in their wallet and redeemed against purchases</li>
                    <li>A Smart Coupon will typically give a fixed discount or a percentage discount</li>
                    <li>A Smart Coupon can be distributed online (voucherCloud / wowcher etc) or offlne (newspapers)</li>
                    <li>A Smart Coupon can be redeemed once, or multiple times</li>
                    <li>A Smart Coupon can be time constrained with an expiry date or have certain timeframes when it can be redeemed (redmeption windows)</li>
                  </ul>
                  <h3>Smart Coupon Examples:</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>A Smart Coupon is made available by Wowcher or Coucher Cloud, a consumer adds it to their wallet and redeems it against in-store purchases</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs>

        <div class="text-xs-center mt-3">
          <v-btn @click.native="next">Next</v-btn>
        </div>
      </div>

      </v-card>
    </v-dialog>
</template>

<script>

export default {
  data () {
    return {
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      active: null,
      tabItems: [
        { tabTitle: 'Intrinsic Offers', content: [{


        }] },
        { tabTitle: 'Vouchers', text: 'vouchers' },
        { tabTitle: 'Coupons', text: 'coupons' }
      ]
    }
  },
  props: ['openDialog'],
  components: {
    //
  },
  computed: {
    dialog () {
      return this.openDialog
    }
  },
  methods: {
    clickClose () {
      this.$emit('close', {promotionTypesDialog: false})
    },
    next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0).toString()
      }
  }
}
</script>
