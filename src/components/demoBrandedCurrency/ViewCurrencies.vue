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
                <td class="text-xs-center">{{ props.item.initialAmount }}</td>
                <td class="text-xs-center">{{ props.item.decimals }}</td>

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
      dialog: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Currency Name', value: 'name', sortable: false, align: 'left' },
        { text: 'Symbol', value: 'symbol', sortable: false, align: 'left' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Initial Amount', value: 'initialAmount', sortable: false, align: 'center' },
        { text: 'Decimals', value: 'decimals', sortable: false, align: 'center' }
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
      return this.$store.getters.allBrandedCurrencyContracts
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
      console.log('Calling: getAllCurrencies')
      brandedCurrencyHelper.getAllCurrencies()
      //this.$store.dispatch('resetCurrencies')
      //brandedCurrencyHelper.updateCurrencyData()
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
