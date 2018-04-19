<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
      <v-card>
        <v-card-media class="primary white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline">{{ user.displayName || ''}}</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <p class="text-xs-right">
                  <v-icon left dark>email</v-icon>
                  {{ user.email || '' }}
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-container fluid>
          <v-card-text>
            <span>
                <p class="text-xs-center"><strong>Account:</strong> {{ userDetails.ethAccount || '' }}</p>
                  <h3 class="text-xs-center">Balance:
                    <span v-show="fetchingBalance">
                      <v-progress-circular indeterminate :size="16" color="green"></v-progress-circular>
                    </span>
                    <span v-show="!fetchingBalance">
                      <strong>{{ balanceToEther }} {{ currency.symbol }}</strong>
                    </span>
                  </h3>
            </span>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-transaction-send></app-transaction-send>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-transactions-view></app-transactions-view>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
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
      fetchingBalance: true
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
        setTimeout(this.balanceUpdated, 800)
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
    },
    checkBalance () {
      this.$store.dispatch('updateAccount')
    }
  },
  mounted: function () {
    // check for balance updates every few seconds as blocks are mined
    this.checkBalance()
    setInterval(function () {
      this.checkBalance()
    }.bind(this), 3000)
  }
}
</script>
