<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>gavel</v-icon> Auction</span>
              </v-flex>
              <v-flex xs12 sm6 align-end flexbox>
                <div class="text-xs-right">
                  <v-avatar size="86px">
                    <img :src="profileImage" onerror="this.src='../../../static/profile/noImage.jpg'">
                  </v-avatar>
                </div>
              </v-flex>
              <v-flex xs12 align-end flexbox>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-container fluid>
          <v-card-text>
            <h3>As an Auction Host:</h3>
              <ul class="py-2 ml-5">
                <li>I can create an auction for a specified item</li>
                <li>I can specify the auction start and end dates/times</li>
                <li>I can receive funds from the highest bidder when the Auction ends</li>
                <li>I can cancel the Auction at any time prior to the specified end date</li>
              </ul>
            <h3>As an Auction Bidder:</h3>
            <ul class="py-2 ml-5">
              <li>I can place bids on an item</li>
              <li>I can withdraw any unused funds when the auction is over</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex sm12 md6 align-end flexbox>
                  <app-create-auction></app-create-auction>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-view-auctions></app-view-auctions>
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
import CreateAuction from './CreateAuction.vue'
import ViewAuctions from './ViewAuctions.vue'

export default {
  data () {
    return {
      //
    }
  },
  components: {
    'app-create-auction': CreateAuction,
    'app-view-auctions': ViewAuctions
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
