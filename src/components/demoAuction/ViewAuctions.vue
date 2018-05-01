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
                  <span v-if="props.item.cancelled">
                    <v-chip small color="black" text-color="white">Cancelled</v-chip>
                  </span>
                  <span v-else-if="latestBlockNumber >= props.item.startBlock && latestBlockNumber <= props.item.endBlock">
                    <v-chip small color="green" text-color="white">Active</v-chip>
                  </span>
                  <span v-else-if="latestBlockNumber > props.item.endBlock">
                    <v-chip small color="orange" text-color="white">Ended</v-chip>
                  </span>
                  <span v-else-if="latestBlockNumber < props.item.startBlock">
                    <v-chip small color="light-blue" text-color="white">Pending</v-chip>
                  </span>
                </td>
                <td class="text-xs-center">{{ props.item.startBlock }}</td>
                <td class="text-xs-center">{{ props.item.endBlock }}</td>
                <td class="text-xs-center">{{ props.item.bidIncrement }} {{ currency.symbol }}</td>
                <td class="text-xs-center" v-bind:class="{
                  'green--text': props.item.highestBidder === userDetails.ethAccount,
                  'orange--text': props.item.myBid > 0 && props.item.highestBidder !== userDetails.ethAccount
                  }">
                  <div v-if="!props.item.userIsHost">
                    {{ props.item.myBid }} {{ currency.symbol }}
                  </div>
                  <div v-else>
                    N/A
                  </div>
                </td>
                <td class="text-xs-center" v-bind:class="{
                  'green--text': props.item.highestBidder === userDetails.ethAccount}">
                  <div class="text-xs-center" v-if="
                      !props.item.userIsHost &&
                      (latestBlockNumber > props.item.endBlock &&
                      props.item.highestBidder === userDetails.ethAccount)
                      ">
                        <v-chip small color="primary" text-color="white"><v-avatar>
                      <v-icon>check_circle</v-icon>
                      </v-avatar>
                      Winner!
                    </v-chip>
                  </div>
                  <div v-else>
                    {{ props.item.highestBid }} {{ currency.symbol }}
                  </div>

                </td>
                <td class="text-xs-center" v-bind:class="{
                  'green--text': props.item.highestBidder === userDetails.ethAccount}">{{ props.item.highestBindingBid }} {{ currency.symbol }}
                </td>
                <td class="text-xs-center">

                  <div class="text-xs-center" v-if="
                    props.item.userIsHost &&
                    !props.item.cancelled &&
                    (latestBlockNumber <= props.item.endBlock)
                  ">
                    <v-btn small round color="warning" dark @click="cancelAuction(props.item.contractAddress)">Cancel</v-btn>
                  </div>

                  <div class="text-xs-center" v-if="
                      props.item.userIsHost &&
                      !props.item.cancelled &&
                      !props.item.ownerHasWithdrawn &&
                      (latestBlockNumber > props.item.endBlock)
                    ">
                    <v-btn small round color="green" dark @click="withdrawFunds(props.item.contractAddress)">Withdraw Payment</v-btn>
                  </div>
                  <div class="text-xs-center" v-if="
                      (
                        !props.item.userIsHost &&
                        latestBlockNumber > props.item.endBlock &&
                        props.item.myBid > 0
                      ) ||
                      (
                        props.item.highestBidder === userDetails.ethAccount &&
                        props.item.myBid > props.item.highestBindingBid &&
                        latestBlockNumber > props.item.endBlock
                      )
                    ">
                    <v-btn small round color="green" dark @click="withdrawFunds(props.item.contractAddress)">Withdraw Funds</v-btn>
                  </div>
                  <div class="text-xs-center" v-if="
                      !props.item.userIsHost &&
                      !props.item.cancelled &&
                      (latestBlockNumber >= props.item.startBlock && latestBlockNumber <= props.item.endBlock)
                    ">
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
                                  <v-flex xs12>
                                    Your current bid fund is: {{ props.item.myBid }} {{ currency.symbol }}</br>
                                    The highest binding bid is: {{ props.item.highestBindingBid }} {{ currency.symbol }}</br>
                                    You are <span v-show="props.item.highestBidder !== userDetails.ethAccount">not</span> currently the highest bidder</br>
                                  </v-flex>
                                  <v-flex xs12 sm6>
                                    <v-text-field
                                      name="bid-amount"
                                      label="Your bid"
                                      hint="Provide the total amount you wish to bid"
                                      required
                                      v-model="bidValue"
                                      :rules="bidValueRules"
                                      persistent-hint
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                              <small>*required fields</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="primary darken-1" flat @click.native="bidDialog = false">Close</v-btn>
                              <v-btn color="primary darken-1" flat @click.native="placeBid(props.item.contractAddress, props.item.myBid, props.item.bidIncrement,)">Submit Bid</v-btn>
                            </v-card-actions>
                            </v-form>
                          </v-card>
                        </v-dialog>
                      </v-layout>
                    </template>
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
        { text: 'Start Block', value: 'startBlock', sortable: true, align: 'center' },
        { text: 'End Block', value: 'endBlock', sortable: true, align: 'center' },
        { text: 'Bid Increment', value: 'bidIncrement', sortable: false, align: 'center' },
        { text: 'My Bid Funds', value: 'myBid', sortable: true, align: 'center' },
        { text: 'Highest Bid', value: 'highestBid', sortable: false, align: 'center' },
        { text: 'Highest Binding Bid', value: 'highestBindingBid', sortable: false, align: 'center' },
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
    refreshAuctionData () {
      auctionHelper.getAuctionData()
    },
    placeBid (contractAddress, myBid, bidIncrement) {
      if (this.$refs.form.validate()) {
        auctionHelper.placeBid(contractAddress, this.bidValue - myBid)
        this.bidDialog = false
      } else {
        console.log('validation failed')
      }
    },
    cancelAuction (contractAddress) {
      auctionHelper.cancelAuction(contractAddress)
    },
    withdrawFunds (contractAddress) {
      console.log('Withdrawing Funds')
      auctionHelper.withdrawFunds(contractAddress)
    }
  },
  mounted: function () {
    // Poll blockchain for latest block
    this.refreshAuctionData()
    setInterval(function () {
      this.refreshAuctionData()
    }.bind(this), 2000)
  }
}
</script>
