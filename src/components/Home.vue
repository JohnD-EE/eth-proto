<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Hello {{ user.displayName || ''}}</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p><v-icon left>email</v-icon>
          {{ user.email || '' }}
        </p>
        <p>Ethereum Account: {{ userDetails.ethAccount || '' }}
        </p>
        <p>Current Balance:
          <span v-show="fetchingBalance">
            <v-progress-circular indeterminate :size="16" color="green"></v-progress-circular>
          </span>
          <span v-show="!fetchingBalance">
            {{ balanceToEther }}
          </span>
        </p>
      </v-flex>
    </v-layout>
    <app-transaction-send></app-transaction-send>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionSend from './TransactionSend.vue'
export default {
  data () {
    return {
      balance: null,
      fetchingEthAccount: true,
      fetchingBalance: true
    }
  },
  components: {
    'app-transaction-send': TransactionSend
  },
  computed: {
    ...mapGetters({
      balanceToEther: 'balanceToEther'
    }),
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    }
  },
  watch: {
    balanceToEther (value) {
      if (!this.fetchingBalance) {
        // balance has updated so show spinner
        this.fetchingBalance = true
        setTimeout(this.balanceUpdated, 1000)
        return
      }
      if (value !== null) {
        this.fetchingBalance = false
      } else {
        this.fetchingBalance = true
      }
    }
  },
  methods: {
    balanceUpdated () {
      this.fetchingBalance = false
    }
  }
}
</script>
