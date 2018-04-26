<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
      <v-card>
        <v-card-media class="primary white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left>account_balance</v-icon> Escrow</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <div class="text-xs-right">
                  <v-icon left dark>person</v-icon>
                  {{ user.displayName }}
                </div>
              </v-flex>
              <v-flex xs12 align-end flexbox>
              <div>The 'Escrow' scenario demonstrates the Smart Contract control of an Escrow agreement,
                 placing funds in custody of a 3rd party until conditions are met.</div>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-container fluid>
          <v-card-text>
            <h3>As an Escrow Agent:</h3>
              <ul class="py-2 ml-5">
                <li>I can create an Escrow service for two parties</li>
                <li>I can specify a fee, as a percentage of the transaction value, for my services</li>
              </ul>
            <h3>As a Seller in an Escrow contract:</h3>
            <ul class="py-2 ml-5">
              <li>I can confirm that I have supplied the goods/services by approving the deal</li>
              <li>I can void the contract (requires other party to also void the contract)</li>
              <li>I receive payment (after fees are deducted) once all parties have approved the contract</li>
            </ul>
            <h3>As a Buyer in an Escrow contract:</h3>
            <ul class="py-2 ml-5">
              <li>I can confirm that I am happy with the goods/services provided by approving the deal</li>
              <li>I can void the contract (requires other party to also void the contract)</li>
              <li>I can deposit the required funds onto the contract</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-create-escrow></app-create-escrow>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  My Auctions
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
import CreateEscrow from './CreateEscrow.vue'
// import ViewAuctions from './ViewAuctions.vue'

export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-create-escrow': CreateEscrow
    // 'app-view-auctions': ViewAuctions
  },
  computed: {
    ...mapGetters({
      //
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
    //
  },
  methods: {
    //
  }
}
</script>
