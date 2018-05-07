<template>
  <v-layout grid-list-xl>
    <v-flex xs 12 md10 offset-md1 pt-4>
      <v-toolbar color="primary lighten-2" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Opporunity Analysis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6
              v-for="card in cards"
              :key="card.title"
            >
              <v-card class="mb-4">
                <div class="grey lighten-2">
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
                <v-card-text>
                  <v-flex xs12>
                  <ul class="pl-3">
                    <li
                    v-for="bullet in card.bullets"
                    :key="application">
                    {{bullet}}
                    </li>
                  </ul>
                </v-flex>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-text>
                  <v-chip
                  v-for="application in card.applications"
                  :key="application"
                  label color="pink" text-color="white" small>
                    {{application}}
                  </v-chip>
                </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                  <v-spacer></v-spacer>
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

<script>
import StarRating from 'vue-star-rating'
  export default {
    computed: {
      cards () {
        return this.$store.state.opportunityAnalysis
      }
    },
    components: {
      'star-rating': StarRating
    }
  }
</script>
