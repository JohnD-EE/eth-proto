<template>
<v-container fluid class="mb-5">
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

        <v-card-text class="grey lighten-4">
          <v-flex xs12>
            <h3>Description:</h3>
            <p>An auction, fully controlled by Smart Contracts</p>
          </v-flex>


          <template>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-expansion-panel popout>
                    <v-expansion-panel-content v-for="(item,i) in storyItems" :key="i">
                      <div slot="header">{{ item.header }}</div>
                      <v-card class="grey lighten-3">
                        <v-card-text>
                          <Ul class="ml-4" style="list-style-type:disc">
                            <li v-for="(listItem,l) in item.descriptions" :key="l">
                              {{ listItem }}
                            </li>
                          </ul>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>
          </template>
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
      storyItems: [{
        header: 'As an Auction Host:',
        descriptions: [
          'I can create an auction for a specified item',
          'I can specify the auction start and end dates/times',
          'I can receive funds from the highest bidder when the Auction ends',
          'I can cancel the Auction at any time prior to the specified end date'
        ]
      },
      {
        header: 'As an Auction Bidder:',
        descriptions: [
          'I can place bids on an item',
          'I can withdraw any unused funds when the auction is over'
        ]
      }
      ]
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
