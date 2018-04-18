<template>
  <v-container fluid>
    <template>
      <v-container fluid>
        <v-layout ro wrap>
          <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
            <v-card>
              <v-container fluid>

              <v-flex xs12>
                  <v-card color="primary" class="white--text">
                    <v-card-title primary-title>
                      <div class="headline">{{ user.displayName || ''}}</div>
                    </v-card-title>

                    <v-card-text>
                      <span><v-icon left dark>email</v-icon>
                        {{ user.email || '' }}
                      </span>
                    </br>
                      <span>Account: {{ userDetails.ethAccount || '' }}</span>
                    </v-card-text>
                  </v-card>
                </v-flex>
              <v-card-text>

                <span>
                  <h2  class="text-xs-center">Current Balance:
                    <span v-show="fetchingBalance">
                      <v-progress-circular indeterminate :size="16" color="green"></v-progress-circular>
                    </span>
                    <span v-show="!fetchingBalance">
                      <strong>{{ balanceToEther }} {{ currency.symbol }}</strong>
                    </span>
                  </h2>
                </span>

                </v-card-text>
              <v-card-text>
                <app-transaction-send></app-transaction-send>
                <app-transactions-view></app-transactions-view>
              </v-card-text>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionSend from './TransactionSend.vue'
import TransactionsView from './TransactionsView.vue'
export default {
  data () {
    return {
      balance: null,
      fetchingEthAccount: true,
      fetchingBalance: true,
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
    }
  },
  components: {
    'app-transaction-send': TransactionSend,
    'app-transactions-view': TransactionsView
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
    },
    currency () {
      return this.$store.state.currency
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
