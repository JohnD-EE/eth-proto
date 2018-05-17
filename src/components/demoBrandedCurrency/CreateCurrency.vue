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

              <v-flex xs12 sm6>
                <v-text-field
                label="Currency Name"
                v-model="currencyName"
                :rules="currencyNameRules"
                clearable
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                label="Currency Symbol"
                v-model="currencySymbol"
                :rules="currencySymbolRules"
                clearable
                required>
              </v-text-field>
            </v-flex>
              <v-flex xs12 sm6>
              <v-text-field
              label="Initial Supply"
              v-model="initialSupply"
              :rules="initialSupplyRules"
              hint="The initial money supply"
              required>
            </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
              label="Decimals"
              v-model="decimals"
              :rules="decimalsRules"
              hint="Digits after the decimal point"
              required>
            </v-text-field>
            </v-flex>
            <v-flex xs12 class="py-2">
              <p>Choose points only or exchangeable currency:</p>
              <v-btn-toggle v-model="tokenType">
                <v-btn flat value="points" class="px-5">
                  Points
                </v-btn>
                <v-btn flat value="currency" class="px-5">
                  Currency
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex xs12 class="py-2" v-show="tokenType === 'currency'">
              <p>Choose floating or fixed exchange rate:</p>
              <v-btn-toggle v-model="exchangeRate">
                <v-btn flat value="floating" class="px-5">
                  Floating
                </v-btn>
                <v-btn flat value="fixed" class="px-5">
                  Fixed
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex xs12 sm6 v-show="exchangeRate === 'fixed' && tokenType === 'currency'">
              <v-text-field
              label="Fixed Exchange Rate"
              v-model="fixedExchangeRate"
              :rules="fixedExchangeRateRules"
              hint="E.g. 0.5 means 2 Tokens = 1 Ether"
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
    tokenType: 'points',
    exchangeRate: 'floating',
    fixedExchangeRate: '1',
    fixedExchangeRateRules: [
      // v => !!v || 'Exchange rate is required',
      // v => (!isNaN(parseFloat(v)) && isFinite(v) && v > 0) || 'Maximum 8 characters'
    ],
    currencyName: '',
    currencyNameRules: [
      v => !!v || 'Currency Name is required',
      v => (v && v.length <= 32) || 'Maximum 32 characters'
    ],
    currencySymbol: '',
    currencySymbolRules: [
      v => !!v || 'Currency Symbol is required',
      v => (v && v.length <= 8) || 'Maximum 8 characters'
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
        let exchangeRateToEth = ''
        if (this.tokenType === 'currency' && this.exchangeRate === 'fixed') {
          this.fixedExchangeRate = Number(this.fixedExchangeRate)
          if (this.fixedExchangeRate.length > 0) {
            exchangeRateToEth = this.fixedExchangeRate.toString()
          } else {
            exchangeRateToEth = 1
          }
        }
        brandedCurrencyHelper.createCurrency(
          {
            initialSupply: Number(this.initialSupply),
            currencyName: this.currencyName,
            decimals: Number(this.decimals),
            currencySymbol: this.currencySymbol,
            isPointsOnly: this.tokenType === 'points', // e.g. points = true, otherwise false and currency selected
            exchangeRateToEth: exchangeRateToEth,
            owner: this.$store.state.userDetails.ethAccount
          }
        )
        this.close()
      } else {
        console.log('validation failed')
      }
    },
    close () {
      this.tokenType = 'points'
      this.exchangeRate = 'floating'
      this.fixedExchangeRate = '1'
      this.clear()
      this.dialog = false
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
