<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator">
        <v-icon left>add</v-icon>Create an Auction
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Create an Auction</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                label="Start block"
                hint="In a live app Date/Time would be used"
                v-model="startBlock"
                :rules="startBlockRules"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                label="End block"
                hint="In a live app Date/Time would be used"
                v-model="endBlock"
                :rules="endBlockRules"
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
                  label="Bid increment"
                  required
                  :items="['1', '2', '3', '4', '5', '10', '15', '20']"
                  hint="Set the increase for a new bid to beat the previously highest bid"
                  v-model="bidIncrement"
                  :rules="bidIncrementRules"
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
import auctionHelper from '../../helpers/demoAuction/auction'

export default {
  data: () => ({
    dialog: false,
    saleItem: '',
    saleItemRules: [
      v => !!v || 'Sale Item is required',
      v => v.length <= 32 || 'Maximum 32 characters'
    ],
    startBlock: null,
    startBlockRules: [
      v => !!v || 'Start block is required',
      v => (!isNaN(parseInt(v)) && isFinite(v) && v > 0) || 'Amount must be a valid integer number larger than zero'
    ],
    endBlock: null,
    endBlockRules: [
      v => !!v || 'End block is required',
      v => (!isNaN(parseInt(v)) && isFinite(v) && v > 0) || 'Amount must be a valid integer number larger than zero'
      // v => v > this.startBlock || 'End block must be larger that start block'
    ],
    bidIncrement: null,
    bidIncrementRules: [
      v => !!v || 'Bid increment is required'
    ],
    valid: true,
    rules: false
  }),
  computed: {
    latestBlock() {
      return this.$store.state.web3.latestBlock.number
    },
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // create the auction
        auctionHelper.createAuction(
          {
            saleItem: this.saleItem,
            startBlock: this.startBlock,
            endBlock: this.endBlock,
            bidIncrement: this.bidIncrement,
            hostAddress: this.$store.state.userDetails.ethAccount
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
