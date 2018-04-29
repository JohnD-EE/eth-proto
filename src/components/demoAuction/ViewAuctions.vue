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
              Balance: {{balanceToEther}} {{ currency.symbol }}</br>
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
                <td>{{ props.item.saleItem }}</td>
                <td>{{ props.item.host }}</td>
                <td class="text-xs-center">
                  <span v-if="latestBlockNumber >= props.item.startBlock && latestBlockNumber <= props.item.endBlock">
                    <v-chip small color="green" text-color="white">Active</v-chip>
                  </span>
                  <span v-if="latestBlockNumber > props.item.endBlock">
                    <v-chip small color="orange" text-color="white">Ended</v-chip>
                  </span>
                  <span v-if="latestBlockNumber < props.item.startBlock">
                    <v-chip small color="light-blue" text-color="white">Pending</v-chip>
                  </span>
                </td>
                <td class="text-xs-left">{{ props.item.startBlock }}</td>
                <td class="text-xs-left">{{ props.item.endBlock }}</td>
                <td class="text-xs-left">{{ props.item.bidIncrement }} {{ currency.symbol }}</td>
                <td class="text-xs-left">{{ props.item.myBids }}</td>
                <td class="text-xs-left">{{ props.item.highestBid }} {{ currency.symbol }}</td>
                <td class="text-xs-left">
                  <div class="text-xs-center" v-if="props.item.userIsHost &&
                  (latestBlockNumber <= props.item.endBlock)">
                    <v-btn small round color="warning" dark @click="cancelAuction">Cancel</v-btn>
                  </div>
                  <div class="text-xs-center" v-if="props.item.userIsHost &&
                  (latestBlockNumber > props.item.endBlock)">
                    <v-btn small round color="green" dark @click="withdrawFunds">Withdraw Funds</v-btn>
                  </div>
                  <div class="text-xs-center" v-if="!props.item.userIsHost &&
                  (latestBlockNumber >= props.item.startBlock && latestBlockNumber <= props.item.endBlock)">
                    <template>
                      <v-layout row justify-center>
                        <v-dialog v-model="bidDialog" persistent max-width="500px">
                          <v-btn small round color="green" slot="activator" dark @click="">Bid</v-btn>
                          <v-card>
                            <v-form v-model="valid" ref="form" lazy-validation>
                            <v-card-title>
                              <span class="headline">Place a Bid</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout row wrap>
                                  <v-flex xs12 sm6>
                                    <v-select
                                      label="Bid Amount"
                                      required
                                      :items="[1, 2, 3, 4, 5, 10, 15, 20]"
                                      hint="Select a bid amound"
                                      v-model="bidValue"
                                      :rules="bidValueRules"
                                      persistent-hint
                                    ></v-select>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                              <small>*required fields</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="primary darken-1" flat @click.native="bidDialog = false">Close</v-btn>
                              <v-btn color="primary darken-1" flat @click.native="placeBid(props.item.contractAddress)">Submit Bid</v-btn>
                            </v-card-actions>
                            </v-form>
                          </v-card>

                        </v-dialog>
                      </v-layout>
                    </template>


                  </div>
                  <div class="text-xs-center" v-if="!props.item.userIsHost &&
                  (latestBlockNumber > props.item.endBlock)">
                    <v-btn small round color="green" dark @click="withdrawFunds">Withdraw Funds</v-btn>
                  </div>
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
import auctionHelper from '../../helpers/demoAuction/auction'

export default {
  data () {
    return {
      dialog: false,
      bidDialog: false,
      bidValue: null,
      bidValueRules: [
        v => !!v || 'Bid increment is required'
      ],
      valid: true,
      rules: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Sale Item', value: 'saleItem', sortable: false, align: 'left' },
        { text: 'Host', value: 'host', sortable: false },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Start Block', value: 'startBlock', sortable: true },
        { text: 'End Block', value: 'endBlock', sortable: true },
        { text: 'Bid Increment', value: 'bidIncrement', sortable: false },
        { text: 'My Bids', value: 'myBids', sortable: true },
        { text: 'Highest Bid', value: 'highestBid', sortable: false },
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
      return this.$store.getters.allAuctionContracts
    },
    currency () {
      return this.$store.state.currency
    },
    latestBlockNumber () {
      return this.$store.state.web3.latestBlock.number
    },
    withdrawFunds () {
      console.log('Withdraw Funds')
    }
  },
  methods: {
    clickClose () {
      this.dialog = false
    },
    viewAuctions () {
      this.$store.dispatch('resetAuctionContracts')
      auctionHelper.getAuctionData()
    },
    placeBid (contractAddress) {
      if (this.$refs.form.validate()) {
        auctionHelper.placeBid(contractAddress, this.bidValue)
        this.$store.dispatch('resetAuctionContracts')
        auctionHelper.getAuctionData()
        // clear screen - todo: this is a bit dirty
        this.bidDialog = false
      } else {
        console.log('validation failed')
      }
    },
    cancelAuction () {
      console.log('Cancel Auction:')
    }
  }
}
</script>
