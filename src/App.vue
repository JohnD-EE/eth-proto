<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" disable-resize-watcher app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
        <v-list-group v-if="isAuthenticated"
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Demo Scenarios</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="demo in demos"
            :key="demo.title"
            :to="demo.path"
            @click=""
          >
          <v-list-tile-action>
            <v-icon v-text=" demo.icon"></v-icon>
          </v-list-tile-action>
            <v-list-tile-title v-text=" demo.title"></v-list-tile-title>

          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark class="primary">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>

      </span>
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor: pointer">
          <v-toolbar-items>
          <img src="./assets/eeLogo.png" height="36" class="pr-2">
          <span>
           {{ appTitle }}
          </span>
           </v-toolbar-items>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-menu v-if="isAuthenticated">
          <v-btn flat  dark slot="activator">Demo Scenarios
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="demo in demos" :key="demo.title" :to="demo.path" @click="">
              <v-list-tile-title><v-icon left>{{ demo.icon }}</v-icon> {{ demo.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        
  <v-btn v-if="!isAuthenticated"
    flat
    v-for="item in menuItems"
    :key="item.title"
    :to="item.path">
    {{ item.title }}
  </v-btn>

  <v-menu v-if="isAuthenticated">
    <v-btn flat dark slot="activator">
      <v-icon left>account_circle</v-icon>
      {{ user.displayName || ''}}
      <v-icon dark>arrow_drop_down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile :to="'/wallet'" @click="">
        <v-list-tile-title><v-icon left>account_balance_wallet</v-icon> Wallet</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="userSignOut">
        <v-list-tile-title><v-icon left>exit_to_app</v-icon> Sign Out</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>

</v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
      <v-footer class="mt-4 pa-3" fixed>
          <span class="pr-1">Latest Block: </span><span v-show="!blockchainLoading" >
            <v-chip label outline color="primary" small>{{ latestBlock }}</v-chip>
          </span>
        <v-progress-circular class="pl-2" size="14" indeterminate color="green" v-show="blockchainLoading"></v-progress-circular>
        <span class="pl-2 caption grey--text" v-show="blockchainLoading"> Polling Blockcain</span>
      <v-spacer></v-spacer>
      <div><span class="primary--text"><h3>#PurpleInnovation</h3></span></div>
    </v-footer>

    <template>
      <v-card>
        <v-snackbar
          :snackbar="notifications.length > 0"
          :timeout="6000"
          :bottom="true"
          :vertical="true"
          :value="notifications"
          >
        {{ notifications.title }}: </br>
        {{ notifications.text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        blockchainLoading: false,
        sidebar: false,
        demos: [
          { title: 'Auction', path: '/auction', icon: 'gavel' },
          { title: 'Escrow', path: '/escrow', icon: 'account_balance' },
          { title: 'Coupon', path: '/morescenarios', icon: 'redeem' },
          { title: 'Voucher', path: '/morescenarios', icon: 'redeem' },
          { title: 'Loyalty', path: '/morescenarios', icon: 'loyalty' },
          { title: 'Branded Currency', path: '/morescenarios', icon: 'payment' }
        ]
      }
    },
    computed: {
      appTitle () {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
              { title: 'Wallet', path: '/wallet', icon: 'account_balance_wallet' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'account_circle' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' },
            { title: 'System', path: '/system', icon: 'settings' }
          ]
        }
      },
      latestBlock () {
        return this.$store.state.web3.latestBlock.number
      },
      notifications () {
        let notification = this.$store.getters.getNotification
        if (notification) {
          return {
            title: notification.title,
            text: notification.text,
            type: notification.type
          }
        }
        return false
      },
      user () {
        return this.$store.state.user
      },
      userDetails () {
        return this.$store.state.userDetails
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      },
      refreshBlockchainData () {
        this.$store.dispatch('registerWeb3', window.web3)
        .then(
         //
        )
      }
    },
    watch: {
      latestBlock: function(val) {
        this.blockchainLoading = true
        setTimeout(function ()
        { this.blockchainLoading = false }.bind(this), 1200)
      }
    },
    mounted: function () {
      // Poll blockchain for latest block
      this.refreshBlockchainData()
      setInterval(function () {
        this.refreshBlockchainData()
      }.bind(this), 1200)
    }
  }
</script>
