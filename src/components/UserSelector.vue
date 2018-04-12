<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-select
          label="Select"
          :items="people"
          v-model="userSelctor"
          item-text="name"
          item-value="name"
          max-height="auto"
          autocomplete
          clearable
          required
        >
          <template slot="selection" slot-scope="data">
            <v-list-tile-avatar>
            <v-icon large>account_circle</v-icon>
          </v-list-tile-avatar>
            {{ data.item.name }} - {{ data.item.account.substring(0,10) + '.......' +
            data.item.account.substr(data.item.account.length - 5) }}
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <v-icon large>account_circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.account"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        userSelctor: []
      }
    },
    computed: {
      people () {
        let selections = [
          { header: 'Select Recipient' }
        ]
        this.$store.getters.allUsers(true).forEach(res => {
          selections.push({name: res.displayName, account: res.ethAccount})
        })
        return selections
      }
    }
  }
</script>
