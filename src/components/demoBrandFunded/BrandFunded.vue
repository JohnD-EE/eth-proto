<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>local_activity</v-icon> Brand Funded</span>
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
            <p>Place <em>Brand</em> promotional funds into the custody of a smart contract which are released to the <em>Retailer</em> when the agreed amount of product is sold.</p>
            <h3>As a Promotions Agent:</h3>
              <ul class="py-2 ml-5">
                <li>I can create a 'Brand Funded' contract between a <em>Brand</em> and a <em>Retailer</em></li>
                <li>I can specify a fee, as a percentage of the transaction value, for my services</li>
              </ul>
            <h3>As a Retailer:</h3>
            <ul class="py-2 ml-5">
              <li>I can confirm that I have sold the required amount of product by approving the deal</li>
              <li>I can void the contract</li>
              <li>I receive payment once the <em>Brand</em> and <em>Retailer</em> have approved the deal</li>
            </ul>
            <h3>As a Brand:</h3>
            <ul class="py-2 ml-5">
              <li>I can deposit funds into the custody of the contract to sponsor a promotion</li>
              <li>I can confirm that the <em>Retailer</em> has sold the required amount by approving the deal</li>
              <li>I can void the contract and have my funds refunded</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-create-brand-funded></app-create-brand-funded>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-view-brand-funded></app-view-brand-funded>
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
import CreateBrandFunded from './CreateBrandFunded.vue'
import ViewBrandFunded from './ViewBrandFunded.vue'

export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-create-brand-funded': CreateBrandFunded,
    'app-view-brand-funded': ViewBrandFunded
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
