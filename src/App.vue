<template>
  <v-app v-scroll="onScroll">
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

        <v-list-group v-if="isAuthenticated"
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Tools</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="tool in tools"
            :key="tool.title"
            :to="tool.path"
            @click=""
          >
          <v-list-tile-action>
            <v-icon v-text="tool.icon"></v-icon>
          </v-list-tile-action>
            <v-list-tile-title v-text="tool.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group v-if="isAuthenticated"
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Go Shopping</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="shop in shops"
            :key="shop.title"
            :to="shop.path"
            @click=""
          >
          <v-list-tile-action>
            <v-icon v-text="shop.icon"></v-icon>
          </v-list-tile-action>
            <v-list-tile-title v-text="shop.title"></v-list-tile-title>
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

        <v-menu v-if="isAuthenticated">
          <v-btn flat  dark slot="activator">Tools
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="tool in tools" :key="tool.title" :to="tool.path" @click="">
              <v-list-tile-title><v-icon left>{{ tool.icon }}</v-icon> {{ tool.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu v-if="isAuthenticated">
          <v-btn flat  dark slot="activator">Go Shopping
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="shop in shops" :key="shop.title" :to="shop.path" @click="">
              <v-list-tile-title><v-icon left>{{ shop.icon }}</v-icon> {{ shop.title }}</v-list-tile-title>
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

        <v-slide-y-reverse-transition>
        <span v-show="!blockchainLoading" >
          <v-chip label color="primary lighten-2" text-color="white" small>Latest Block:&nbsp;<strong>{{ latestBlock }}</strong></v-chip>
        </span>
        </v-slide-y-reverse-transition>

      <v-spacer></v-spacer>
      <div>
        <span class="primary--text"><h3>#PurpleInnovation</h3></span>
      </div>
    </v-footer>

    <template>
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="6000"
          :bottom="true"
          :vertical="true"
          :value="notifications"
          >
        {{ notifications.title }}: <br/>
        {{ notifications.text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<v-scale-transition>
  <v-btn v-show="showScroller" fab dark bottom right fixed small @click="$vuetify.goTo(0, {
    duration: 600,
    offset: 0,
    easing: 'easeInOutCubic'
    })" color="pink lighten-1 mb-4">
      <v-icon dark>keyboard_arrow_up</v-icon>
    </v-btn>
</v-scale-transition>

  </v-app>
</template>

<script>
import auctionHelper from './helpers/demoAuction/auction'
import escrowHelper from './helpers/demoEscrow/escrow'
import brandFundedHelper from './helpers/demoBrandFunded/brandFunded'
import brandedCurrencyHelper from './helpers/demoBrandedCurrency/brandedCurrency'

export default {
  data () {
    return {
      snackbar: false,
      offsetTop: 0,
      blockchainLoading: false,
      sidebar: false,
      tools: [
        { title: 'Opportunity Analysis', path: '/opportunity-analysis', icon: 'lightbulb_outline' },
        { title: 'Proposition', path: '/proposition', icon: 'announcement' },
        { title: 'Attacks and Rebuttals', path: '/attacksandrebuttals', icon: 'sentiment_dissatisfied' }
      ],
      demos: [
        { title: 'Auction', path: '/auction', icon: 'gavel' },
        { title: 'Escrow', path: '/escrow', icon: 'account_balance' },
        { title: 'Brand Funded Promo', path: '/brand-funded', icon: 'local_activity' },
        { title: 'Branded Currency', path: '/branded-currency', icon: 'payment' },
        { title: 'Coupon', path: '/morescenarios', icon: 'redeem' },
        { title: 'Voucher', path: '/morescenarios', icon: 'redeem' },
        { title: 'Loyalty', path: '/morescenarios', icon: 'loyalty' }
      ]
    }
  },
  computed: {
    showScroller () {
      return this.offsetTop > 150
    },
    appTitle () {
      return this.$store.state.appTitle
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    shops () {
      let allRetailers = this.$store.getters.allRetailers
      let shops = []
      allRetailers.forEach(res => {
        shops.push(
          {title: res.displayName, path: '/shop/' + res.ethAccount, icon: 'shopping_cart'}
        )
      })
      return shops
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
      return this.$store.state.web3.latestBlock.number || 'No Network Detected'
    },
    notifications () {
      let notification = this.$store.getters.getNotification
      if (notification) {
        this.snackbar = true
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
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
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
    $route (to, from) {
      switch (to.path) {
        case '/auction':
          //
          break
        case '/escrow':
          //
          break
        case '/brand-funded':
          //
          break
        case '/branded-currency':
          //
          break
        default:
          //
      }
      switch (from.path) {
        case '/auction':
          this.$store.dispatch('resetAuctionContracts')
          break
        case '/escrow':
          this.$store.dispatch('resetEscrowContracts')
          break
        case '/brand-funded':
          this.$store.dispatch('resetBrandFundedContracts')
          break
        case '/branded-currency':
        case '/wallet':
          this.$store.dispatch('resetEIP20Contracts')
          break
        default:
          //
      }
      this.show = false
    },
    latestBlock: function (val) {
      this.blockchainLoading = true
      if (this.isAuthenticated && this.$route) {
        if (this.$route.path === '/auction') {
          auctionHelper.updateAuctionData()
        }
        if (this.$route.path === '/escrow') {
          escrowHelper.updateEscrowData()
        }
        if (this.$route.path === '/brand-funded') {
          brandFundedHelper.updateEscrowData()
        }
        if (this.$route.path === '/branded-currency') {
          brandedCurrencyHelper.updateEIP20Data()
        }
        if (this.$route.path === '/wallet') {
          brandedCurrencyHelper.updateEIP20Data()
        }
        this.$store.dispatch('userTxs')
        this.$store.dispatch('updateAccount')
      }
      setTimeout(function () {
        this.blockchainLoading = false
      }.bind(this), 350)
    }
  },
  mounted: function () {
    // Poll blockchain for latest block
    this.refreshBlockchainData()
    setInterval(function () {
      this.refreshBlockchainData()
    }.bind(this), 6500)
  }
}
</script>
