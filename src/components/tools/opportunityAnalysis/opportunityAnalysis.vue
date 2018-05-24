<template>
  <v-layout grid-list-xl>
    <v-flex xs 12 md10 offset-md1 py-4>
      <v-toolbar color="primary lighten-2" dark>

      <v-menu bottom>
        <v-toolbar-items slot="activator" class="ml-2">
          <v-btn flat round dark><span v-if="selectedOpportunityId">
              {{ opportunitiesById[selectedOpportunityId].title }}
            </span>
            <span v-else>
              OPPORTUNITY ANALYSIS
            </span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-list>
          <v-list-tile
            v-for="opportunity in opportunities"
            :key="opportunity.title"
            @click="selectOpportunity(opportunity.id)"
            >
              <v-list-tile-title v-text="opportunity.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>

      </v-menu>

        <v-spacer></v-spacer>

        <v-menu bottom>
            <v-btn slot="activator" icon dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="showOpportunityDialog">
                <v-list-tile-title><v-icon left small>add_circle_outline</v-icon> Add New Opportunity</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="deleteCurrentOpportunity">
                <v-list-tile-title><v-icon left small>clear</v-icon> Delete Current Opportunity</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="showBullets = !showBullets">
                <v-list-tile-title><v-icon left small>format_list_bulleted</v-icon> Toggle Bullets</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="showApplicationTags = !showApplicationTags">
                <v-list-tile-title><v-icon left small>label</v-icon> Toggle Tags</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
      </v-toolbar>

      <v-dialog v-model="opportunityDialog" persistent max-width="500px">
          <v-card>
            <v-form v-model="opportunityValid" ref="form" lazy-validation>
            <v-card-title>
              <span class="headline">Add new opportunity</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12>
                    <ul class="py-2 ml-3">
                      <li>Add a title for your new blockchain opportunity</li>
                  </ul>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="opportunity"
                      label="Opportunity Title"
                      hint="Provide a title for the opportunity you wish to study"
                      required
                      v-model="opportunityTitle"
                      :rules="opportunityRules"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*required fields</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" flat @click.native="closeOpportunity">Close</v-btn>
              <v-btn color="primary darken-1" flat @click.native="addNewOpportunity">Submit</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

      <v-card v-show="selectedOpportunityId === null">
        <v-container fluid grid-list-md>
          <v-layout row wrap full-height>
            <v-flex xs12>
              <v-card-text>
                <p class="text-xs-center">
                  Use the toolbar selectors above to add a new opportunity for analysis or create a new one.
                </p>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-card v-show="selectedOpportunityId !== null">
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
                  <star-rating
                  @rating-selected ="setRating($event, card.key)"
                  v-bind:star-size="24"
                  v-bind:show-rating="false"
                  :rating="getRating(card.key)
                  "></star-rating>
                  <v-btn @click="unsetRating(card.key)" v-show="getRating(card.key) !== 0" small flat icon color="red lighten-3">
                    <v-icon>clear</v-icon>
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
import OpportunityAnalysisHelper from '../../../helpers/tools/opportunityAnalysis'
import OpportunitiesJSON from './opportunities.json'

export default {
  data () {
    return {
      showBullets: false,
      showApplicationTags: false,
      opportunityDialog: false,
      opportunityTitle: '',
      opportunityValid: true,
      opportunityRules: [
        v => !!v || 'Title is required'
      ],
      rules: false,
      selectedOpportunityId: null
    }
  },
  computed: {
    cards () {
      return OpportunitiesJSON
    },
    opportunities () {
      return this.$store.getters.userOpportunities
    },
    opportunitiesById () {
      let opportunities = this.$store.getters.userOpportunities
      let opportunitiesById = []
      opportunities.forEach(res => {
        opportunitiesById[res.id] = res
      })
      return opportunitiesById
    }
  },
  components: {
    'star-rating': StarRating
  },
  methods: {
    closeOpportunity () {
      this.clear()
      this.opportunityDialog = false
    },
    addNewOpportunity () {
      OpportunityAnalysisHelper.createOpportunity(this.opportunityTitle)
      this.clear()
      this.opportunityDialog = false
    },
    deleteCurrentOpportunity () {
      OpportunityAnalysisHelper.deleteOpportunity(this.selectedOpportunityId)
      this.selectedOpportunityId = null
    },
    showOpportunityDialog () {
      this.opportunityDialog = true
    },
    clear () {
      this.$refs.form.reset()
    },
    selectOpportunity (id) {
      this.selectedOpportunityId = id
    },
    getRating (opportunityKey) {
      if (this.selectedOpportunityId !== null) {
        if (opportunityKey in this.opportunitiesById[this.selectedOpportunityId].ratings) {
          return this.opportunitiesById[this.selectedOpportunityId].ratings[opportunityKey]
        }
        return 0
      }
    },
    setRating (rating, opportunityKey) {
      if (this.selectedOpportunityId !== null) {
        let opportunityTitle = this.opportunitiesById[this.selectedOpportunityId].title
        OpportunityAnalysisHelper.setRating(this.selectedOpportunityId, opportunityKey, rating, opportunityTitle)
      }
    },
    unsetRating (opportunityKey) {
      if (this.selectedOpportunityId !== null) {
        let opportunityTitle = this.opportunitiesById[this.selectedOpportunityId].title
        OpportunityAnalysisHelper.unsetRating(this.selectedOpportunityId, opportunityKey, opportunityTitle)
      }
    }
  }
}
</script>
