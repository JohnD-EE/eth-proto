<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="info" dark slot="activator" @click.native="viewEscrowContracts">
        <v-icon left>visibility</v-icon>View Escrow Contracts
      </v-btn>
      <v-card>
        <v-toolbar dark color="info" @click.native="clickClose">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>View Escrow Contracts</v-toolbar-title>
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
                <td>{{ props.item.saleItem }}</td>
                <td class="text-xs-center">
                  <v-chip small :color="props.item.status.color" text-color="white">{{props.item.status.text}}</v-chip>
                </td>
                <td class="text-xs-center">{{ props.item.agent }}</td>
                <td class="text-xs-center">{{ props.item.buyer }}</td>
                <td class="text-xs-center">{{ props.item.seller }}</td>
                <td class="text-xs-center">

                  <template v-if="props.item.userIsBuyer && props.item.balance === 0">
                    <v-layout row justify-center>
                      <v-dialog v-model="depositDialog" persistent max-width="500px">
                        <v-btn small round color="green" slot="activator" dark @click="">Deposit</v-btn>
                        <v-card>
                          <v-form v-model="depositValid.valid" ref="form" lazy-validation>
                          <v-card-title>
                            <span class="headline">Deposit Funds</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container grid-list-md>
                              <v-layout row wrap>
                                <v-flex xs12>
                                  As the buyer, you are required to deposit funds onto the contract.<br/>
                                  Your funds are transferred to the Seller when both parties approve the contract<br/>
                                  You may void the contract and withdraw you funds at any time prior to approval.
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-text-field
                                    name="deposit-amount"
                                    label="Your Deposit"
                                    hint="Provide the total amount you wish to deposit"
                                    required
                                    v-model="depositValue"
                                    :rules="depositRules"
                                    persistent-hint
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                            <small>*required fields</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary darken-1" flat @click.native="closeDeposit">Close</v-btn>
                            <v-btn color="primary darken-1" flat @click.native="depositBuyerFunds(props.item.contractAddress)">Submit Deposit</v-btn>
                          </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-dialog>
                    </v-layout>
                  </template>
                  <div v-else>
                    {{ props.item.balance }} {{ currency.symbol }}
                  </div>
                </td>
                <td class="text-xs-center">{{ props.item.feePercent }}%</td>
                <td class="text-xs-center">
                  <v-btn v-if="
                    (props.item.balance > 0 &&
                      (props.item.userIsSeller || props.item.userIsBuyer)) &&
                      ((props.item.userIsBuyer && !props.item.buyerApprove) ||
                      (props.item.userIsSeller && !props.item.sellerApprove))
                    " small round color="green" dark @click="approveContract(props.item.contractAddress)">Approve</v-btn>
                  <v-chip v-else-if="
                      (props.item.balance > 0 &&
                      (props.item.userIsSeller || props.item.userIsBuyer))
                    " small color="primary" text-color="white">
                    <v-avatar>
                      <v-icon>check_circle</v-icon>
                    </v-avatar>
                    You Approve</v-chip>
                </td>
                <td class="text-xs-center">
                  <v-btn v-if="!props.item.escrowComplete && (props.item.userIsSeller || props.item.userIsBuyer)" small round color="orange" dark @click="voidContract(props.item.contractAddress)">Void</v-btn>
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
import escrowHelper from '../../helpers/demoEscrow/escrow'

export default {
  data () {
    return {
      dialog: false,
      depositDialog: false,
      depositValue: null,
      depositRules: [
        v => !!v || 'A deposit amount is required',
        v => (!isNaN(parseFloat(v)) && isFinite(v) && v > 0) || 'Amount must be a valid number larger than zero',
        v => v <= this.balanceToEther || 'Insufficent funds'
      ],
      depositValid: [],
      rules: false,
      depositValueRules: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      search: '',
      headers: [
        { text: 'Description/Ref', value: 'saleItem', sortable: false, align: 'left' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
        { text: 'Agent', value: 'agent', sortable: false, align: 'center' },
        { text: 'Buyer', value: 'buyer', sortable: false, align: 'center' },
        { text: 'Seller', value: 'seller', sortable: false, align: 'center' },
        { text: 'Contract Value', value: 'value', sortable: false, align: 'center' },
        { text: 'Agency Fees', value: 'feePercent', sortable: false, align: 'center' },
        { text: 'Approval', value: 'approval', sortable: false, align: 'center' },
        { text: 'Void', value: 'void', sortable: false, align: 'center' }
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
      return this.$store.getters.allEscrowContracts
    },
    currency () {
      return this.$store.state.currency
    },
    latestBlockNumber () {
      return this.$store.state.web3.latestBlock.number
    }
  },
  methods: {
    closeDeposit () {
      this.depositDialog = false
      this.clear()
    },
    clickClose () {
      this.dialog = false
    },
    viewAuctions () {
      this.$store.dispatch('resetAuctionContracts')
      escrowHelper.updateEscrowData()
    },
    viewEscrowContracts () {
      console.log('Calling: getAllEscrowContracts')
      this.$store.dispatch('resetEscrowContracts')
      escrowHelper.updateEscrowData()
    },
    depositBuyerFunds (contractAddress) {
      // buyer can deposit to the contract
      console.log('deposit', {address: contractAddress, val: this.depositValue})
      if (this.$refs.form.validate()) {
        escrowHelper.depositBuyerFunds(contractAddress, this.depositValue)
        this.depositDialog = false
        this.clear()
      } else {
        console.log('validation failed')
      }
    },
    voidContract (contractAddress) {
      // seller or buyer can void the contract
      console.log('void')
      escrowHelper.voidContract(contractAddress)
    },
    approveContract (contractAddress) {
      // seller or buyer can agree the deal
      console.log('agree')
      escrowHelper.approveContract(contractAddress)
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
