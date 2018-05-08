<template>
  <v-layout grid-list-xl>
    <v-flex xs 12 md10 offset-md1 py-4>
      <v-toolbar color="primary lighten-2" dark>
        <v-toolbar-title>Opportunity Analysis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom>
            <v-btn slot="activator" icon dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click.native="showBullets = !showBullets">
                <v-list-tile-title>Toggle Bullets</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click.native="showApplicationTags = !showApplicationTags">
                <v-list-tile-title>Toggle Tags</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
      </v-toolbar>

      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap full-height>
            <v-flex xs12 sm6 md6
              v-for="card in cards"
              :key="card.title"
            >
              <v-card class="ma-1" hover>
                <div class="blue-grey lighten-5">
                <v-card-title primary-title >
                  <v-flex xs12>
                  <h3 class="headline mb-0">{{card.title}}</h3>
                </v-flex>
                <v-flex xs12>
                  <p class="h2 black--text" v-text="card.description"></p>
                </v-flex>
                </v-card-title>
              </div>
                <v-divider></v-divider>
                <div style="padding-bottom: 60px">
                <v-card-text v-show="showBullets">
                  <v-flex xs12 >
                  <ul class="pl-3">
                    <li
                    v-for="bullet in card.bullets"
                    :key="bullet">
                    {{bullet}}
                    </li>
                  </ul>
                </v-flex>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text v-show="showApplicationTags">
                  <v-chip
                  v-for="application in card.applications"
                  :key="application"
                  label color="pink" text-color="white" small>
                    {{application}}
                  </v-chip>
                </v-card-text>
                  <v-divider></v-divider>
                </div>

                  <v-card-actions class="bottom-right">
                  <star-rating v-bind:star-size="24"></star-rating>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
.full-height .flex {
  display: flex;
}
.full-height .flex > .card {
  flex: 1 1 auto;
}
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
</style>

<script>
import StarRating from 'vue-star-rating'
  export default {
    data () {
      return {
        showBullets: false,
        showApplicationTags: false
      }
    },
    computed: {
      cards () {
        return this.$store.state.opportunityAnalysis
      }
    },
    components: {
      'star-rating': StarRating
    },
    methods: {
      //
    }
  }
</script>
