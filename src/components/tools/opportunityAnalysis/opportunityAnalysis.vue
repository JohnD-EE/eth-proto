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
            <v-flex xs12 sm6 md4
              v-for="card in cards"
              :key="card.title"
            >
              <v-card>
                <v-card-media

                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline black--text" v-text="card.title"></span>
                        <span class="subheader black--text" v-text="card.description"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
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
  export default {
    computed: {
      cards () {
        return this.$store.state.opportunityAnalysis
      }
    }
  }
</script>
