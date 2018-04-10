<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Hello {{ displayName }}</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Email: {{ email }}</p>
        <p>Ethereum Account: {{ ethAccount }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  computed: {
    displayName () {
      return this.$store.state.user.displayName || 'Name not set'
    },
    email () {
      return this.$store.state.user.email || 'Email not set'
    },
    ethAccount () {
      return this.$store.state.userDetails.ethAccount
    }
  }
}
</script>
