<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>System Settings</h1>
    </v-flex>
  </v-layout>

  <v-flex mt-3>
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
            <v-divider></v-divider>
            <v-list two-line subheader>
              <v-subheader>Actions</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-btn color="success" @click="refreshBlockchainData">
                    <v-icon left>refresh</v-icon>
                    Refresh Data
                  </v-btn>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-progress-circular indeterminate color="green" v-show="blockchainLoading"></v-progress-circular>
                </v-list-tile-action>
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

            <v-list>
              <v-subheader>Accounts Status</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Ganache Accounts:</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 ml-3>
                  <ul>
                    <li v-for="item in accountsStatus" :key="item.id">
                      {{ item }}
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
            </v-container>
            </v-list>
            <v-divider></v-divider>
            <v-list two-line subheader>
              <v-subheader>Actions</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-btn color="success" @click="refreshAccountsData">
                    <v-icon left>refresh</v-icon>
                    This Button Doesn't Do Anything Yet
                  </v-btn>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-progress-circular indeterminate color="green" v-show="accountsLoading"></v-progress-circular>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

          </v-card-text>
        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      blockchainLoading: false,
      accountsLoading: false
    }
  },
  methods: {
    refreshBlockchainData () {
      this.blockchainLoading = true
      this.$store.dispatch('registerWeb3', window.web3)
        .then(
          setTimeout(() => { this.blockchainLoading = false }, 400))
    },
    refreshAccountsData () {
      //
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
      return this.$store.state.ganacheAccounts || 'No accounts have been set'
    }
  }
}
</script>