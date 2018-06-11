<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create Brand Funded
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Become a Promo Agent</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <app-brand-selector @selected="onBrandSelect" selectLabel="Select Brand" userType="brand"></app-brand-selector>
              </v-flex>
              <v-flex xs12>
                <app-retailer-selector @selected="onRetailerSelect" selectLabel="Select Retailer" userType="retailer"></app-retailer-selector>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Promotion Name"
                v-model="saleItem"
                :rules="saleItemRules"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Transaction Fee"
                  required
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  hint="Set your fee as the promotional agency"
                  v-model="feePercent"
                  suffix="%"
                  :rules="feePercentRules"
                  persistent-hint
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="primary darken-1" flat @click.native="submit">Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>

    </v-dialog>
  </v-layout>
</template>

<script>
import brandFundedHelper from '../../helpers/demoBrandFunded/brandFunded'
import UserSelector from '../sharedComponents/UserSelector.vue'

export default {
  data: () => ({
    dialog: false,
    saleItem: '',
    saleItemRules: [
      v => !!v || 'Sale Item is required',
      v => (v && v.length <= 32) || 'Maximum 32 characters'
    ],
    sellerAddress: null,
    sellerAddressRules: [
      v => !!v || 'Retailer address is required'
    ],
    buyerAddress: null,
    buyerAddressRules: [
      v => !!v || 'Brand address is required'
    ],
    feePercent: null,
    feePercentRules: [
      v => !!v || 'Transaction fee is required'
    ],
    valid: true,
    rules: false
  }),
  computed: {
    //
  },
  components: {
    'app-brand-selector': UserSelector,
    'app-retailer-selector': UserSelector
  },
  methods: {
    onRetailerSelect (val) {
      this.sellerAddress = val.account ? val.account : null
    },
    onBrandSelect (val) {
      this.buyerAddress = val.account ? val.account : null
    },
    submit () {
      if (this.$refs.form.validate()) {
        // create the brandFunded contract
        brandFundedHelper.createEscrow(
          {
            sellerAddress: this.sellerAddress,
            buyerAddress: this.buyerAddress,
            feePercent: this.feePercent,
            saleItem: this.saleItem,
            escrowServiceAddress: this.$store.state.userDetails.ethAccount
          }
        )
        this.close()
      } else {
        console.log('validation failed')
      }
    },
    close () {
      this.clear()
      this.dialog = false
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
