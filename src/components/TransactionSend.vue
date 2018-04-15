<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="success" dark slot="activator" @click="clickSend">
        <v-icon left>add</v-icon>New Transaction
      </v-btn>
      <v-card>
        <v-toolbar dark color="success">
          <v-btn icon @click.native="clickClose" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Send Transaction</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="submit">
              <v-icon large left>send</v-icon>
              Send
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader>From Account Details</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Account Owner</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon left>account_circle</v-icon>
                {{user.displayName}}
                <v-spacer></v-spacer>
                <v-icon left>email</v-icon>
                {{user. email}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Account Address</v-list-tile-title>
              <v-list-tile-sub-title>{{userDetails.ethAccount}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Current Balance</v-list-tile-title>
              <v-list-tile-sub-title>{{balanceToEther}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <v-subheader>To Account Details</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <app-user-selector></app-user-selector>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile >
            <v-list-tile-content>
              <template>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    label="Amount"
                    v-model="txAmount"
                    :rules="txAmountRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
              </v-layout>
              </v-container>
              </template>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import UserSelector from './UserSelector.vue'
import transactionsHelper from '../helpers/transactions'

export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      fullScreen: true, // todo detect screen size here and make true for sm screens
      valid: true,
      balance: 0,
      txAmountRules: [
        v => !!v || 'Amount is required',
        v => (!isNaN(parseFloat(v)) && isFinite(v) && v > 0) || 'Amount must be a valid number larger than zero',
        v => v <= this.balance || 'Insufficent funds'
      ],
      txAmount: null,
      txComposer: null,
      rules: false
    }
  },
  components: {
    'app-user-selector': UserSelector
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    balanceToEther () {
      this.balance = this.$store.getters.balanceToEther
      return this.$store.getters.balanceToEther
    }
  },
  methods: {
    clickSend () {
      // clear any pre-existing composed transactions
      this.$store.dispatch('composeTransaction', {})
      this.clear()
      // todo must also clear child component
    },
    clickClose () {
      // clear any pre-existing composed transactions and clear form
      this.$store.dispatch('composeTransaction', {})
      this.clear()
      this.dialog = false
      // todo must also clear child component
    },
    submit () {
      if (this.$refs.form.validate()) {
        let weiAmount = window.web3.utils.toWei(this.txAmount, 'ether')
        this.$store.dispatch('composeTransaction', {
          fromAddress: this.$store.state.userDetails.ethAccount,
          fromName: this.$store.state.user.displayName,
          toAddress: this.$store.state.txComposer.toAccount,
          toName: this.$store.state.txComposer.toName,
          amount: weiAmount
        })
        this.txComposer = this.$store.state.txComposer
        let sendTx = transactionsHelper.sendTransaction(this.txComposer)
        console.log(sendTx)
        // show notification

        // clear screen
        this.dialog = false
      } else {
        console.log('validation failed')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
