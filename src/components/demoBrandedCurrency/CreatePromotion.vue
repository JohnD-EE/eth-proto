<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
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
                    <v-flex xs10>
                      <v-text-field
                        label="Promotion Name"
                        v-model="promotionName"
                        :rules="promotionNameRules"
                        clearable
                        required>
                      </v-text-field>
                      <v-radio-group v-model="promotionType" required>
                        <v-radio
                          label="Smart Coupon"
                          value="smartCoupon"
                        ></v-radio>
                        <v-radio
                          label="Smart Voucher"
                          value="smartVoucher"
                        ></v-radio>
                        <v-radio
                          label="Smart Offers"
                          value="smartOffers"
                        ></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-btn color="primary" @click.native="promotionStepper = 2, step1Continued = true">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step  @click.native="promotionStepper = 2" :rules="step2Rules" step="2">Cofigure Promotion</v-stepper-step>
                <v-stepper-content step="2">
                  <v-card color="grey lighten-3" class="mb-5">

                    <v-flex xs12>
                      <div v-if="!promotionType">
                        No Promotion Type selected
                      </div>
                      <div v-else-if="promotionType === 'smartOffer'">
                        Smart Offer:
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
                        Smart Voucher
                      </div>
                      <div v-else-if="promotionType === 'smartCoupon'">
                        Smart Coupon<br/>
                        Apply to Product Category<br/>
                        Select Specific products<br/>
                        Percent Discount / Fixed Discount<br/>
                        Qualyfying Spend<br/>
                        Available to Promoters? (e.g. Wowcher)  Promoter fee percent?<br/>
                        Use once or Multiple?<br/>
                        Redemption Windows?<br/>
                      </div>
                    </v-flex>

                  </v-card>
                  <v-btn color="primary" @click.native="promotionStepper = 3, step2Continued = true">Continue</v-btn>
                  <v-btn @click.native="promotionStepper = 1">Back</v-btn>
                </v-stepper-content>

              <v-stepper-step  @click.native="promotionStepper = 3" :rules="step3Rules" step="3">Select Products</v-stepper-step>
                <v-stepper-content step="3">
                  <v-card color="grey lighten-3" class="mb-5">

                        <v-flex xs12>
                          <app-product-picker></app-product-picker>
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

export default {
  data: () => ({
    promotionStepper: 1,
    step1Continued: false,
    step2Continued: false,
    step3Continued: false,
    dialog: false,
    promotionName: '',
    promotionType: '',
    valid: true,
    rules: false
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
    step2Rules () {
      //
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
    submit () {
      if (this.$refs.form.validate()) {
        // create the Promotions contract
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
