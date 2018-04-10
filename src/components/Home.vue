<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Hello {{ user.displayName || ''}}</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p><v-icon left>email</v-icon>
          {{ user.email || ''}}
        </p>
        <p>Ethereum Account: {{ userDetails.ethAccount || '' }}</p>
        <p>Current Balance: {{ userDetails.ethBalance || '' }}</p>
      </v-flex>
    </v-layout>
    <app-transaction-send></app-transaction-send>
  </v-container>
</template>

<script>
import TransactionSend from './TransactionSend.vue'
export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-transaction-send': TransactionSend
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    }
  }
}
</script>
