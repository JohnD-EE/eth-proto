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
            {{ data.item.name }}
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
                <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
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
        userSelctor: [],
        people: [
          { header: 'Select Recipient' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: 'n/a' },
          { name: 'Ali Connors', group: 'Group 1', avatar: 'n/a' },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: 'n/a' },
          { name: 'Tucker Smith', group: 'Group 1', avatar: 'n/a' },
          { name: 'Britta Holt', group: 'Group 2', avatar: 'n/a' },
          { name: 'Jane Smith ', group: 'Group 2', avatar: 'n/a' },
          { name: 'John Smith', group: 'Group 2', avatar: 'n/a' },
          { name: 'Sandra Williams', group: 'Group 2', avatar: 'n/a' }
        ]
      }
    }
  }
</script>
