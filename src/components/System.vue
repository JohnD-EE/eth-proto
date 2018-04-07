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
                          <v-list-tile-sub-title
                          v-for="item in provider"
                          :key="item.id"
                          >
                            {{ item.title }}: {{ item.value }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Latest Block</v-list-tile-title>
                          <v-list-tile-sub-title
                          v-for="item in latestBlock"
                          :key="item.id"
                          >
                            {{ item.title }}: {{ item.value }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Network</v-list-tile-title>
                          <v-list-tile-sub-title
                          v-for="item in network"
                          :key="item.id"
                          >
                            {{ item.title }}: {{ item.value }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list two-line subheader>
                      <v-subheader>Actions</v-subheader>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="restartBlockchain"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Restart Blockchain</v-list-tile-title>
                          <v-list-tile-sub-title>Restart Blockchain using Seed</v-list-tile-sub-title>
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
          <v-card-text class="grey lighten-3">{{ accountsStatus }}</v-card-text>
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
        restartBlockchain: false
      }
    },
    computed: {
      provider () {
        return [
          { title: 'Current Provider', value: this.$store.state.web3.currentProvider || 'No current provider' },
          { title: 'Host Address', value: this.$store.state.web3.host || 'N/A' }
        ]
      },
      latestBlock () {
        return [
          { title: 'Block Number', value: this.$store.state.web3.latestBlock.number || 'No blocks have been processed' },
          { title: 'Block Hash', value: this.$store.state.web3.latestBlock.hash || 'N/A' }
        ]
      },
      network () {
        return [
          { title: 'Network ID', value: this.$store.state.web3.networkId || 'Not connected to network' },
          { title: 'Network Type', value: this.$store.state.web3.networkType || 'Not connected to network' }
        ]
      },
      firebaseStatus () {
        return 'CONNECTED'
      },
      accountsStatus () {
        return 'EMPTY'
      }
    }
  }
</script>
