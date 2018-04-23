<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="success" dark slot="activator" @click="clickCreate">
        <v-icon left>add</v-icon>Create an Auction
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create an Auction</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                label="Start block"
                hint="In a live app Date/Time would be used"
                v-model="startBlock"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                label="End block"
                hint="In a live app Date/Time would be used"
                v-model="endBlock"
                required>
              </v-text-field>
              </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Item for sale"
                v-model="saleItem"
                required>
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Bid increment"
                  required
                  :items="['0.5', '1', '2', '3', '4', '5', '10', '15', '20']"
                  hint="Set the increase for a new bid to beat the previously highest bid"
                  v-model="bidIncrement"
                  persistent-hint
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      saleItem: null,
      startBlock: null,
      endBlock: null,
      bidIncrement: null
    })
  }
</script>
