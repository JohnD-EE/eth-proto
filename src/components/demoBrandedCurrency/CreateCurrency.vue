<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create Currency
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-stepper v-model="currencyStepper" vertical>
            <v-card-title>
              <span class="headline">Create a Branded Currency</span>
            </v-card-title>
            <v-stepper-step :rules="step1Rules" step="1">Currency Naming</v-stepper-step>
            <v-stepper-content step="1">
              <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs10>
                      <v-text-field
                        label="Currency Name"
                        v-model="currencyName"
                        :rules="currencyNameRules"
                        clearable
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs10>
                      <v-text-field
                        label="Currency Symbol"
                        v-model="currencySymbol"
                        :rules="currencySymbolRules"
                        clearable
                        required>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-btn color="primary" @click.native="currencyStepper = 2, step1Continued = true">Continue</v-btn>
              </v-stepper-content>
              <v-stepper-step :rules="step2Rules" step="2">Monetary Config</v-stepper-step>
                <v-stepper-content step="2">
                  <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs10>
                          <v-text-field
                            label="Initial Supply"
                            v-model="initialSupply"
                            :rules="initialSupplyRules"
                            hint="The initial money supply"
                            required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs10>
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
                  </v-card>
                  <v-btn color="primary" @click.native="currencyStepper = 3, step2Continued = true">Continue</v-btn>
                  <v-btn @click.native="currencyStepper = 1">Back</v-btn>
                </v-stepper-content>
                <v-stepper-step step="3">Type</v-stepper-step>
                <v-stepper-content step="3">
                  <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs10>
                          <p>Choose points only or exchangeable currency:</p>
                          <v-btn-toggle v-model="tokenType" mandatory>
                            <v-btn flat value="points" class="px-5">
                              Points
                            </v-btn>
                            <v-btn flat value="currency" class="px-5">
                              Currency
                            </v-btn>
                          </v-btn-toggle>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-btn color="primary" @click.native="currencyStepper = 4, step3Continued = true">Continue</v-btn>
                  <v-btn @click.native="currencyStepper = 2">Back</v-btn>
                </v-stepper-content>
                <v-stepper-step step="4">Exchange and Transfer Mechanisms</v-stepper-step>
                <v-stepper-content step="4">
                  <v-card color="grey lighten-3" class="mb-5 pb-3 pl-3">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs10>
                          <v-checkbox
                            v-model="isTransferable"
                            :rules="isTransferableRules"
                            hint="Determines whether the currency be transferred between users"
                            persistent-hint
                            label="Transferable?"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs10 v-show="tokenType === 'currency'" mandatory>
                          <p>Choose floating or fixed exchange rate:</p>
                          <v-btn-toggle v-model="exchangeRate" mandatory>
                            <v-btn flat value="floating" class="px-5">
                              Floating
                            </v-btn>
                            <v-btn flat value="fixed" class="px-5">
                              Fixed
                            </v-btn>
                          </v-btn-toggle>
                        </v-flex>
                        <v-flex xs10 v-show="exchangeRate === 'fixed' && tokenType === 'currency'">
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
                  </v-card>
                  <v-btn @click.native="currencyStepper = 3">Back</v-btn>
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
import brandedCurrencyHelper from '../../helpers/demoBrandedCurrency/brandedCurrency'

export default {
  data: () => ({
    currencyStepper: 1,
    step1Continued: false,
    step2Continued: false,
    step3Continued: false,
    dialog: false,
    tokenType: 'points',
    exchangeRate: 'floating',
    fixedExchangeRate: '1',
    fixedExchangeRateRules: [
      // v => !!v || 'Exchange rate is required',
      // v => (!isNaN(parseFloat(v)) && isFinite(v) && v > 0) || 'Maximum 8 characters'
    ],
    currencyName: '',
    currencySymbol: '',
    currencySymbolRules: [
      v => !!v || 'Currency Symbol is required',
      v => (v && v.length <= 8) || 'Maximum 8 characters'
    ],
    initialSupply: '',
    initialSupplyRules: [
      v => !!v || 'Initial Supply is required',
      v => (!isNaN(parseInt(v)) && isFinite(v) && v > 0) || 'Initial Supply must be a valid integer number larger than zero'
    ],
    decimals: '',
    decimalsRules: [
      v => !!v || 'The Decimals field is required',
      v => (!isNaN(parseInt(v)) && v <= 255 && v >= 0) || 'Decimals must be a valid integer number less than 256'
    ],
    isTransferable: true,
    isTransferableRules: [],
    valid: true,
    rules: false
  }),
  computed: {
    step1Rules () {
      if (this.step1Continued && (!this.currencyName || !this.currencySymbol || this.currencySymbol.length > 8 || this.currencyName.length > 32)) {
        return [() => false]
      }
    },
    step2Rules () {
      if (this.step2Continued && (!this.initialSupply || !this.decimals || !(!isNaN(parseInt(this.initialSupply)) && isFinite(this.initialSupply) && this.initialSupply > 0) || !(!isNaN(parseInt(this.decimals)) && this.decimals <= 255 && this.decimals >= 0))) {
        return [() => false]
      }
    },
    currencyNameRules () {
      return [
        v => !!v || 'Currency Name is required',
        v => (v && v.length <= 32) || 'Maximum 32 characters'
      ]
    }
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
          if (this.fixedExchangeRate > 0) {
            exchangeRateToEth = this.fixedExchangeRate.toString()
          } else {
            exchangeRateToEth = '1'
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
            owner: this.$store.state.userDetails.ethAccount,
            isTransferable: this.isTransferable
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
      this.currencyStepper = 1
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
