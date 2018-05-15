<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create Currency
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Create a Branded Currency</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                Enter the currency parameters:
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Currency Name"
                v-model="currencyName"
                :rules="currencyNameRules"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Currency Symbol"
                v-model="currencySymbol"
                :rules="currencySymbolRules"
                required>
              </v-text-field>
              <v-text-field
              label="Initial Supply"
              v-model="initialSupply"
              :rules="initialSupplyRules"
              hint="The initial money supply"
              required>
            </v-text-field>
              <v-text-field
              label="Decimals"
              v-model="decimals"
              :rules="decimalsRules"
              hint="Digits after the decimal point"
              required>
            </v-text-field>
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
import brandedCurrencyHelper from '../../helpers/demoBrandedCurrency/brandedCurrency'

export default {
  data: () => ({
    dialog: false,
    currencyName: '',
    currencyNameRules: [
      v => !!v || 'Currency Name is required',
      v => v.length <= 32 || 'Maximum 32 characters'
    ],
    currencySymbol: '',
    currencySymbolRules: [
      v => !!v || 'Currency Symbol is required',
      v => v.length <= 8 || 'Maximum 8 characters'
    ],
    initialSupply: null,
    initialSupplyRules: [
      v => !!v || 'Initial Supply is required',
      v => (!isNaN(parseInt(v)) && isFinite(v) && v > 0) || 'Initial Supply must be a valid integer number larger than zero'
    ],
    decimals: null,
    decimalsRules: [
      v => !!v || 'The Decimals field is required',
      v => (!isNaN(parseInt(v)) && v <= 255 && v >= 0) || 'Decimals must be a valid integer number less than 256'
    ],
    valid: true,
    rules: false
  }),
  computed: {
    //
  },
  components: {
    //
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // create the Branded Currency contract
        brandedCurrencyHelper.createCurrency(
          {
            initialSupply: Number(this.initialSupply),
            currencyName: this.currencyName,
            decimals: Number(this.decimals),
            currencySymbol: this.currencySymbol,
            owner: this.$store.state.userDetails.ethAccount
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
