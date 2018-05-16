<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="info" dark slot="activator" @click.native="viewCurrencies">
        <v-icon left>visibility</v-icon>View Currencies
      </v-btn>
      <v-card>
        <v-toolbar dark color="info" @click.native="clickClose">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>View Currencies</v-toolbar-title>
        </v-toolbar>

        <template>
          <v-card>
            <v-card-title>
              {{user.displayName}} <br/>
              {{userDetails.ethAccount}}<br/>
              Balance: {{balanceToEther}} {{ currency.symbol }}<br/>
              Latest Block: {{latestBlockNumber}}
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.symbol }}</td>
                <td class="text-xs-center">
                  <v-chip small :color="props.item.status.color" text-color="white">{{props.item.status.text}}</v-chip>
                </td>
                <td class="text-xs-center">{{ props.item.totalSupply }}</td>
                <td class="text-xs-center">{{ props.item.decimals }}</td>
                <td class="text-xs-center">

                  <template>
                    <v-layout row justify-center>
                      <v-dialog v-model="exchangeDialog" persistent max-width="500px">
                        <v-btn small round color="green" slot="activator" dark @click="">Exchange</v-btn>
                          <v-card>
                            <v-form v-model="exchangeValid" ref="form" lazy-validation>
                              <v-card-title>
                                <span class="headline">Exchange Currency</span>
                              </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout row wrap>
                                      <v-flex xs12 class="py-2">
                                        <p>Choose to Buy or Sell {{props.item.name}}:</p>
                                        <v-btn-toggle v-model="exchangeMode">
                                          <v-btn flat value="buy" class="px-5">
                                            BUY
                                          </v-btn>
                                          <v-btn flat value="sell" class="px-5">
                                            SELL
                                          </v-btn>
                                        </v-btn-toggle>
                                      </v-flex>
                                      <v-flex xs12 sm6>
                                        <v-text-field v-show="exchangeMode === 'sell'"
                                        label="Sell Amount"
                                        v-model="sellAmount"
                                        :rules="sellAmountRules"
                                        required>
                                        </v-text-field>
                                        <v-text-field v-show="exchangeMode === 'buy'"
                                        label="Buy Amount"
                                        v-model="buyAmount"
                                        :rules="buyAmountRules"
                                        required>
                                        </v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                <small>*required fields</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="primary darken-1" flat @click.native="exchangeClose">Close</v-btn>
                                  <v-btn color="primary darken-1" flat @click.native="exchangeMode === 'buy' ? exchangeSubmitBuy(props.item.contractAddress) : exchangeSubmitSell(props.item.contractAddress)">{{exchangeMode === 'buy' ? 'Buy' : 'Sell'}}</v-btn>
                                </v-card-actions>
                                </v-form>
                              </v-card>
                            </v-dialog>
                          </v-layout>
                        </template>
                      </td>
                </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import brandedCurrencyHelper from '../../helpers/demoBrandedCurrency/brandedCurrency'

export default {
  data () {
    return {
      exchangeDialog: false,
      buyAmount: null,
      buyAmountRules: null,
      sellAmount: null,
      sellAmountRules: null,
      exchangeValid: [],
      exchangeMode: 'buy',
      rules: false,
      dialog: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Currency Name', value: 'name', sortable: false, align: 'left' },
        { text: 'Symbol', value: 'symbol', sortable: false, align: 'center' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Total Supply', value: 'totalSupply', sortable: false, align: 'center' },
        { text: 'Decimals', value: 'decimals', sortable: false, align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    balanceToEther () {
      return this.$store.getters.balanceToEther
    },
    items () {
      return this.$store.getters.allEIP20Contracts
    },
    currency () {
      return this.$store.state.currency
    },
    latestBlockNumber () {
      return this.$store.state.web3.latestBlock.number
    }
  },
  methods: {
    clickClose () {
      this.dialog = false
    },
    viewCurrencies () {
      this.$store.dispatch('resetEIP20Contracts')
      brandedCurrencyHelper.updateEIP20Data()
    },
    exchange () {
      console.log('Exchange')
      this.exchangeDialog = true
    },
    exchangeSubmitBuy (contractAddress) {
      console.log('Buy Currency')
    },
    exchangeSubmitSell (contractAddress) {
      console.log('Sell Currency')
    },
    exchangeClose () {
      this.exchangeDialog = false
      this.exchangeMode = 'buy'
      this.clear()
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>