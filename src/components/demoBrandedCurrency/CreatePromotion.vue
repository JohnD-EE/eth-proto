<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="570px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create Promotion
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-stepper v-model="promotionStepper" vertical>
            <v-card-title>
              <span class="headline">Create a Promotion</span>
            </v-card-title>
            <v-stepper-step @click.native="promotionStepper = 1" :rules="step1Rules" step="1">Promotion Details</v-stepper-step>
            <v-stepper-content step="1">
              <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field
                        label="Promotion name"
                        v-model="promotionName"
                        :rules="promotionNameRules"
                        clearable
                        required>
                      </v-text-field>
                      <v-radio-group v-model="promotionType" required>
                        <v-radio
                          label="Smart coupon"
                          value="smartCoupon"
                        ></v-radio>
                        <v-radio
                          label="Smart voucher"
                          value="smartVoucher"
                        ></v-radio>
                        <v-radio
                          label="Smart offers"
                          value="smartOffers"
                        ></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-btn color="primary" @click.native="promotionStepper = 2, step1Continued = true">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step @click.native="promotionStepper = 2" :rules="step2Rules" step="2">Configure promotion: {{ promotionTypeText }}</v-stepper-step>
                <v-stepper-content step="2">
                  <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">

                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs10>
                      <div v-if="!promotionType">
                        Please select a 'Promotion Type' in Step 1
                      </div>
                      <div v-else-if="promotionType === 'smartOffer'">
                        Smart Offer: (not yet complete, choose Smart Coupon instead)
                        <ul class="ml-4 mb-3" style="list-style-type:disc">
                          <li>Buy One, Get Discount on 2nd</li>
                          <li>Share to Activate Discount</li>
                          <li>Buy one now, get next one free next month.</li>
                          <li>Spend £50 units and get Points</li>
                          <li>Spend £50 and get Discount</li>
                          <li>Spend £20 on Fruit and get discount</li>
                        </ul>
                      </div>
                      <div v-else-if="promotionType === 'smartVoucher'">
                        Smart Voucher, not yet complete, choose Smart Coupon instead
                      </div>
                      <div v-else-if="promotionType === 'smartCoupon'">
                        <span class="grey--text">Qualifying products:</span><br/>
                        <v-radio-group v-model="couponQualifyingProducts" required>
                          <v-radio
                            label="Specified products"
                            value="specificProducts"
                          ></v-radio>
                          <v-radio
                            label="Product categories"
                            value="productCategories"
                          ></v-radio>
                          <v-radio
                            label="All products"
                            value="allProducts"
                          ></v-radio>
                        </v-radio-group>

                        <span class="grey--text">Discount Percent:</span><br/>

                        <v-select
                          label="Percent discount"
                          required
                          :items="percentItems"
                          item-text='text'
                          item-value='value'
                          v-model="couponPercentDiscount"
                            :rules="couponPercentDiscountRules"
                          clearable
                        ></v-select>

                        <span class="grey--text">Qualyfying Currency:</span><br/>
                        <v-select class="mt-3"
                          :items="currencyItems"
                          item-text='text'
                          item-value='value'
                          v-model="couponQualifyingCurrency"
                          :rules="couponQualifyingCurrencyRules"
                          label="Select"
                          chips
                          hint="Which currency qualifies for this promotion?"
                        ></v-select>

                        <span class="grey--text">Qualyfying Spend:</span><br/>
                        <v-text-field class="mt-3"
                          label="Total basket spend"
                          v-model="couponQualifyingSpend"
                          :rules="couponQualifyingSpendRules"
                          hint="Leave blank to not apply total spend constraints. @todo needs spend per currency"
                          clearable>
                        </v-text-field>

                        <span class="grey--text">3rd Party Promoters:</span><br/>
                        <v-checkbox class="mt-3"
                          v-model="couponPromotersAllowed"
                          label="Available to Promoters"
                          clearable>
                        </v-checkbox>

                        <v-select v-show = "couponPromotersAllowed"
                          label="Promoter fee percent"
                          required
                          :items="percentItems"
                          item-text='text'
                          item-value='value'
                          hint="Set the fee for 3rd party promoters"
                          v-model="couponPromoterFee"
                          :rules="couponPromoterFeeRules"
                          clearable
                        ></v-select>

                        <span class="grey--text">Single / Multiple Use:</span><br/>
                        <v-radio-group v-model="couponReusePolicy" required>
                          <v-radio
                            label="Single Use"
                            value="singleUse"
                          ></v-radio>
                          <v-radio
                            label="Multiple Use"
                            value="multipleUse"
                          ></v-radio>
                        </v-radio-group>

                        <span class="grey--text">Coupon Expiry:</span><br/>
                        <v-text-field class="mt-3"
                          label="Coupon Expiry Block"
                          v-model="couponExpiryBlock"
                          :rules="couponExpiryBlockRules"
                          clearable
                          required
                          hint="Specify the block number (In production we would use date/time)">
                        </v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>

                  </v-card>
                  <v-btn color="primary" @click.native="promotionStepper = 3, step2Continued = true">Continue</v-btn>
                  <v-btn @click.native="promotionStepper = 1">Back</v-btn>
                </v-stepper-content>

              <v-stepper-step  @click.native="promotionStepper = 3" :rules="step3Rules" step="3">Select Products</v-stepper-step>
                <v-stepper-content step="3">
                  <v-card color="grey lighten-3" class="mb-5">

                    <v-flex xs12>
                      <app-product-picker
                        @selected="onSelectProducts"
                        productMode="promoCreate"
                        padded="true"
                        v-if="couponQualifyingProducts === 'specificProducts'"></app-product-picker>
                      <span v-else-if="couponQualifyingProducts === 'productCategories'">
                        <v-container>
                          @todo - Show a Product Category picker
                        </v-container>
                      </span>
                      <span v-else-if="couponQualifyingProducts === 'allProducts'">
                        <v-container>
                          This promotion applies to all products
                        </v-container>
                      </span>
                    </v-flex>

                  </v-card>
                  <v-btn color="primary" @click.native="promotionStepper = 4, step3Continued = true">Continue</v-btn>
                  <v-btn @click.native="promotionStepper = 2">Back</v-btn>
                </v-stepper-content>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" flat @click.native="close">Close</v-btn>
                  <v-btn color="primary darken-1" flat @click.native="submit">Save</v-btn>
                </v-card-actions>
              </v-stepper>
            </v-form>
          </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ProductPicker from '../sharedComponents/ProductPicker.vue'
import smartCouponHelper from '../../helpers/promotions/smartCoupon'

export default {
  data: () => ({
    percentItems: [
      {text: '0%', value: 0},
      {text: '5%', value: 5},
      {text: '10%', value: 10},
      {text: '15%', value: 15},
      {text: '20%', value: 20},
      {text: '25%', value: 25},
      {text: '30%', value: 30},
      {text: '35%', value: 35},
      {text: '40%', value: 40},
      {text: '45%', value: 45},
      {text: '50%', value: 50},
      {text: '55%', value: 55},
      {text: '60%', value: 60},
      {text: '65%', value: 65},
      {text: '70%', value: 70},
      {text: '75%', value: 75},
      {text: '80%', value: 80},
      {text: '85%', value: 85},
      {text: '90%', value: 90},
      {text: '95%', value: 95},
      {text: '100%', value: 100}
    ],
    promotionStepper: 1,
    step1Continued: false,
    step2Continued: false,
    step3Continued: false,
    dialog: false,
    promotionName: '',
    promotionType: '',
    couponQualifyingProducts: '',
    couponQualifyingProductSKUs: [],
    couponPercentDiscount: '',
    couponQualifyingCurrency: [],
    couponQualifyingSpend: '',
    couponReusePolicy: '',
    couponPromoterFee: '',
    couponExpiryBlock: '',
    couponFixedDiscountRules: [],
    couponPercentDiscountRules: [],
    couponQualifyingCurrencyRules: [],
    couponQualifyingSpendRules: [],
    couponPromoterFeeRules: [],
    couponReusePolicyRules: [],
    couponExpiryBlockRules: [],
    valid: true,
    rules: false,
    couponPromotersAllowed: ''
  }),
  computed: {
    step1Rules () {
      if (this.step1Continued && (!this.promotionName || this.promotionName.length > 32)) {
        return [() => false]
      }
    },
    step2Rules () {
      //
    },
    step3Rules () {
      //
    },
    currencyItems () {
      let allEIP20 = this.$store.getters.allEIP20Contracts
      let items = []
      allEIP20.forEach(res => {
        if (res.userIsIssuer) {
          items.push({text: res.name, value: res.contractAddress})
        }
      })
      return items
    },
    promotionTypeText () {
      let text = ''
      switch (this.promotionType) {
        case 'smartCoupon':
          text = 'Smart Coupon'
          break
        case 'smartVoucher':
          text = 'Smart Voucher'
          break
        case 'smartOffer':
          text = 'Smart Offer'
          break
        default:
          text = 'Not Selected (Step 1)'
      }
      return text
    },
    promotionNameRules () {
      return [
        v => !!v || 'Promotion Name is required',
        v => (v && v.length <= 32) || 'Maximum 32 characters'
      ]
    }
  },
  components: {
    'app-product-picker': ProductPicker
  },
  methods: {
    onSelectProducts (value) {
      if (value.products) {
        this.couponQualifyingProductSKUs = []
        value.products.forEach(res => {
          this.couponQualifyingProductSKUs.push(res)
        })
      } else {
        console.log('No Products Selected')
      }
    },
    submit () {
      switch (this.promotionType) {
        case 'smartCoupon':
          this.submitCouponCreate()
          break
        case 'smartVoucher':
          this.submitVoucherCreate()
          break
        case 'smartOffer':
          this.submitOfferCreate()
          break
        default:
          return false
      }
    },
    submitCouponCreate () {
      if (this.$refs.form.validate()) {
        // create the Coupon contract
        console.log('Submitting Coupon')
        smartCouponHelper.createSmartCoupon(
          {
            owner: this.$store.state.userDetails.ethAccount,
            promotionName: this.promotionName,
            couponQualifyingProductSKUs: this.couponQualifyingProductSKUs,
            couponPercentDiscount: Number(this.couponPercentDiscount),
            couponQualifyingCurrency: this.couponQualifyingCurrency,
            couponQualifyingSpend: Number(this.couponQualifyingSpend),
            couponReusePolicy: this.couponReusePolicy,
            couponPromoterFee: Number(this.couponPromoterFee),
            couponExpiryBlock: Number(this.couponExpiryBlock)
          }
        )
        this.close()
      } else {
        console.log('validation failed')
      }
    },
    submitVoucherCreate () {
      if (this.$refs.form.validate()) {
        // create the Voucher contract

        this.close()
      } else {
        console.log('validation failed')
      }
    },
    submitOfferCreate () {
      if (this.$refs.form.validate()) {
        // create the Offer contract

        this.close()
      } else {
        console.log('validation failed')
      }
    },
    close () {
      this.promotionStepper = 1
      this.step1Continued = false
      this.step2Continued = false
      this.step3Continued = false
      this.clear()
      this.dialog = false
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
