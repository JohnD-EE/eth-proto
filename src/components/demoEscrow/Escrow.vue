<template>
<v-container fluid class="mb-5">
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-media class="primary lighten-2 white--text" height="120px">
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6 align-end flexbox>
                <span class="headline"><v-icon dark left large>account_balance</v-icon> Escrow</span>
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

        <v-card-text class="grey lighten-4">
          <v-flex xs12>
            <h3>Description:</h3>
            <p>Place funds into the custody of a Smart Contract and released when conditions are met.</p>
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
                  <app-create-escrow></app-create-escrow>
                </v-flex>
                <v-flex sm12 md6 align-end flexbox>
                  <app-view-escrow></app-view-escrow>
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
import CreateEscrow from './CreateEscrow.vue'
import ViewEscrow from './ViewEscrow.vue'

export default {
  data () {
    return {
      storyItems: [{
        header: 'As an Escrow Agent:',
        descriptions: [
          'I can create an Escrow service for two parties',
          'I can specify a fee, as a percentage of the transaction value, for my services'
        ]
      },
      {
        header: 'As a Seller in an Escrow contract:',
        descriptions: [
          'I can confirm that I have supplied the goods/services by approving the deal',
          'I can void the contract',
          'I receive payment once Buyer and Seller have approved the deal'
        ]
      },
      {
        header: 'As a Buyer in an Escrow contract:',
        descriptions: [
          'I can deposit funds into the custody of the contract',
          'I can confirm that I\'m happy with the goods/services by approving the deal',
          'I can void the contract and have my depsit refunded'
        ]
      }
      ]
    }
  },
  components: {
    'app-create-escrow': CreateEscrow,
    'app-view-escrow': ViewEscrow
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
