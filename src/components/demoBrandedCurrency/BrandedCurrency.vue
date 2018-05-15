<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>payment</v-icon> Branded Currency</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <div class="text-xs-right">
                  <v-avatar size="86px">
                    <img :src="profileImage" onerror="this.src='../../../static/profile/noImage.jpg'">
                  </v-avatar>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-container fluid>
          <v-card-text>
            <h3>As a Retailer:</h3>
              <ul class="py-2 ml-5">
                <li>I can create an Escrow service for two parties</li>
                <li>I can specify a fee, as a percentage of the transaction value, for my services</li>
              </ul>
            <h3>As a Seller in an Escrow contract:</h3>
            <ul class="py-2 ml-5">
              <li>I can confirm that I have supplied the goods/services by approving the deal</li>
              <li>I can void the contract</li>
              <li>I receive payment once Buyer and Seller have approved the deal</li>
            </ul>
            <h3>As a Buyer in an Escrow contract:</h3>
            <ul class="py-2 ml-5">
              <li>I can deposit funds into the custody of the contract</li>
              <li>I can confirm that I'm happy with the goods/services by approving the deal</li>
              <li>I can void the contract and have my depsit refunded</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-create-currency></app-create-currency>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-view-currencies></app-view-currencies>
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
import CreateCurrency from './CreateCurrency.vue'
import ViewCurrencies from './ViewCurrencies.vue'

export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-create-currency': CreateCurrency,
    'app-view-currencies': ViewCurrencies
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
    },
    profileImage () {
      let path = '../../../static/profile/'
      let filename = this.$store.state.user.displayName
      filename = filename.split(' ').join('')
      let fileType = '.jpg'
      return path + filename + fileType
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
