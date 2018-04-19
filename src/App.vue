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
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark class="primary">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>

      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
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
  <v-btn
    flat
    v-for="item in menuItems"
    :key="item.title"
    :to="item.path">
    {{ item.title }}
  </v-btn>
  <v-btn flat v-if="isAuthenticated" @click="userSignOut">
    Sign Out
  </v-btn>
</v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="mt-4 pa-3" fixed>
    <v-spacer></v-spacer>
    <div><span class="primary--text"><h3>#PurpleInnovation</h3></span></div>
  </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: false
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
              { title: 'Home', path: '/home', icon: 'home' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'account_circle' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' },
            { title: 'System', path: '/system', icon: 'settings' }
          ]
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>
