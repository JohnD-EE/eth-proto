<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create Escrow Service
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Become an Escrow Agent</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                label="Seller"
                hint="The seller hex address"
                v-model="sellerAddress"
                :rules="sellerRules"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Buyer"
                hint="The buyer hex address"
                v-model="buyerAddress"
                :rules="buyerRules"
                required>
              </v-text-field>
              </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Item for sale"
                v-model="saleItem"
                :rules="saleItemRules"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Transaction Fee"
                  required
                  :items="['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']"
                  hint="Set your fee as the Escrow agent"
                  v-model="feePercent"
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
          <v-btn color="primary darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="primary darken-1" flat @click.native="submit">Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>

    </v-dialog>
  </v-layout>
</template>

<script>
import escrowHelper from '../../helpers/demoEscrow/escrow'

export default {
  data: () => ({
    dialog: false,
    saleItem: '',
    saleItemRules: [
      v => !!v || 'Sale Item is required',
      v => v.length <= 32 || 'Maximum 32 characters'
    ],
    sellerAddress: null,
    sellerAddressRules: [
      v => !!v || 'Seller address is required'
    ],
    buyerAddress: null,
    buyerAddressRules: [
      v => !!v || 'Buyer address is required'
    ],
    feePercent: null,
      feePercent: [
      v => !!v || 'Transaction fee is required'
    ],
    valid: true,
    rules: false
  }),
  computed: {
    //
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // create the auction
        escrowHelper.createEscrow(
          {
            sellerAddress: this.sellerAddress,
            buyerAddress: this.buyerAddress,
            feePercent: this.feePercent,
            escrowProviderAddress: this.$store.state.userDetails.ethAccount
          }
        )
        // clear screen
        this.dialog = false
      } else {
        console.log('validation failed')
      }
    }
  }
}
</script>
