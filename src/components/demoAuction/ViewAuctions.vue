<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="info" dark slot="activator" @click.native="viewAuctions">
        <v-icon left>visibility</v-icon>View Auctions
      </v-btn>
      <v-card>
        <v-toolbar dark color="info" @click.native="clickClose">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>View Auctions</v-toolbar-title>
        </v-toolbar>

        <template>
          <v-card>
            <v-card-title>
              {{user.displayName}} </br>
              {{userDetails.ethAccount}}</br>
              Balance: {{balanceToEther}} {{ currency.symbol }}
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
                <td>{{ props.item.saleItem }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
                <td class="text-xs-left">{{ props.item.startBlock }}</td>
                <td class="text-xs-left">{{ props.item.endBlock }}</td>
                <td class="text-xs-left">{{ props.item.bidIncrement }} {{ currency.symbol }}</td>
                <td class="text-xs-left">{{ props.item.myBids }}</td>
                <td class="text-xs-left">{{ props.item.highestBid }} {{ currency.symbol }}</td>
                <td class="text-xs-left">{{ props.item.actions }}</td>
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
import auctionHelper from '../../helpers/demoAuction/auction'

export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Sale Item', value: 'saleItem', sortable: false, align: 'left' },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Start Block', value: 'startBlock', sortable: false },
        { text: 'End Block', value: 'endBlock', sortable: false },
        { text: 'Bid Increment', value: 'bidIncrement', sortable: false },
        { text: 'My Bids', value: 'myBids', sortable: false },
        { text: 'Highest Bid', value: 'highestBid', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
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
      return this.$store.getters.allAuctionContracts
    },
    currency () {
      return this.$store.state.currency
    }
  },
  methods: {
    clickClose () {
      this.dialog = false
    },
    viewAuctions () {
      console.log('Calling: getAllAuctions')
      this.$store.dispatch('resetAuctionContracts')
      auctionHelper.getAuctionData()
    }
  }
}
</script>
