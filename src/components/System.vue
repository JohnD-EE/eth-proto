<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>System Settings</h1>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex mt-3 mb-5 xs12 sm10 offset-sm1 md8 offset-md2>
      <v-expansion-panel focusable>
        <v-expansion-panel-content>
          <div slot="header">Blockchain</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <v-list two-line subheader>
                <v-subheader>Ethereum Blockchain Connections</v-subheader>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Current Provider:</v-list-tile-title>
                    <v-list-tile-sub-title v-for="item in provider" :key="item.id">
                      {{ item.title }}: {{ item.value }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Latest Block</v-list-tile-title>
                    <v-list-tile-sub-title v-for="item in latestBlock" :key="item.id">
                      {{ item.title }}: {{ item.value }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-progress-circular indeterminate color="green" v-show="blockchainLoading"></v-progress-circular>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Network</v-list-tile-title>
                    <v-list-tile-sub-title v-for="item in network" :key="item.id">
                      {{ item.title }}: {{ item.value }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Firebase</div>
          <v-card>
            <v-card-text class="grey lighten-3">{{ firebaseStatus }}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Accounts</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <v-list two-line subheader>
                <v-subheader>Accounts Created and Assigned</v-subheader>
                <v-list-tile v-for="item in accountsStatus" :key="item.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.account }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="item.user" class="deep-purple--text">
                      {{ item.user }}
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else>
                      unassigned
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list one-line subheader>
                <v-subheader>Actions</v-subheader>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-btn color="warning" @click="deleteUserAccountsData">
                      <v-icon left>refresh</v-icon>
                      Delete User Accounts Data
                    </v-btn>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-btn color="success" @click="seedUserAccountsData" :disabled="accountSeedingLoading">
                      <v-icon left>refresh</v-icon>
                      Seed User Accounts Data
                    </v-btn>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-progress-circular indeterminate color="green" v-show="accountSeedingLoading"></v-progress-circular>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import userAccounts from '../helpers/userAccounts'
export default {
  data () {
    return {
      blockchainLoading: false
    }
  },
  methods: {
    refreshBlockchainData () {
      this.blockchainLoading = true
      this.$store.dispatch('registerWeb3', window.web3)
        .then(
          setTimeout(() => { this.blockchainLoading = false }, 850))
    },
    deleteUserAccountsData () {
      userAccounts.deleteAllUserDetails()
    },
    seedUserAccountsData () {
      userAccounts.createUsersDetailsFromConfig()
    }
  },
  computed: {
    provider () {
      return [{
        title: 'Current Provider',
        value: this.$store.state.web3.currentProvider || 'No current provider'
      },
      {
        title: 'Host Address',
        value: this.$store.state.web3.host || 'N/A'
      }]
    },
    latestBlock () {
      return [{
        title: 'Block Number',
        value: this.$store.state.web3.latestBlock.number || 'No blocks have been processed'
      },
      {
        title: 'Block Hash',
        value: this.$store.state.web3.latestBlock.hash || 'N/A'
      }]
    },
    network () {
      return [{
        title: 'Network ID',
        value: this.$store.state.web3.networkId || 'Not connected to network'
      },
      {
        title: 'Network Type',
        value: this.$store.state.web3.networkType || 'Not connected to network'
      }]
    },
    firebaseStatus () {
      return 'CONNECTED'
    },
    accountsStatus () {
      let usersByAccount = []
      let ganacheAccounts = []
      this.$store.getters.allUsers(false).forEach(res => {
        usersByAccount[res.ethAccount] = res.displayName
      })
      this.$store.state.ganacheAccounts.forEach(res => {
        ganacheAccounts.push({
          account: res,
          user: usersByAccount[res] ? usersByAccount[res] : ''
        })
      })
      return ganacheAccounts
    },
    accountSeedingLoading () {
      return this.$store.state.accountSeedingLoading
    }
  },
  mounted: function () {
    //check for balance updates every few seconds as blocks are mined
    this.refreshBlockchainData()
    setInterval(function () {
      this.refreshBlockchainData()
    }.bind(this), 3000)
  }
}
</script>
