<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>account_balance_wallet</v-icon> Wallet</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <div class="text-xs-right">
                  <v-avatar size="86px">
                    <img :src="profileImage" onerror="this.src='../../static/profile/noImage.jpg'">
                  </v-avatar>
                </div>
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
      fetchingBalance: false
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
    },
    profileImage () {
      let path = '../../static/profile/'
      let filename = this.$store.state.user.displayName
      filename = filename.split(' ').join('')
      let fileType = '.jpg'
      console.log(path + filename + fileType)
      return path + filename + fileType
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
    this.checkBalance()
  }
}
</script>
