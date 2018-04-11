<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" :fullscreen="fullScreen" transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="primary" dark slot="activator">Send Transaction</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Send Transaction</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="submit">
              <v-icon large left>send</v-icon>
              Send
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader>From Account Details</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Account Owner</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon left>account_circle</v-icon>
                {{user.displayName}}
                <v-spacer></v-spacer>
                <v-icon left>email</v-icon>
                {{user. email}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Account Address</v-list-tile-title>
              <v-list-tile-sub-title>{{userDetails.ethAccount}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Current Balance</v-list-tile-title>
              <v-list-tile-sub-title>{{balanceToEther}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <v-subheader>To Account Details</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <app-user-selector></app-user-selector>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile >
            <v-list-tile-content>
              <template>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    label="Amount"
                    v-model="amount"
                    :rules="amountRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
              </v-layout>
              </v-container>
              </template>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import UserSelector from './UserSelector.vue'
export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      fullScreen: false, // todo detect screen size here and make true for sm screens
      valid: true,
      amountRules: [
        v => !!v || 'Amount is required',
        v => (!isNaN(parseFloat(v)) && isFinite(v) && v > 0) || 'Amount must be a valid number larger than zero'
      ],
      amount: null,
      rules: false
    }
  },
  components: {
    'app-user-selector': UserSelector
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    userDetails () {
      return this.$store.state.userDetails
    },
    balanceToEther () {
      return this.$store.getters.balanceToEther
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        console.log('submit success')
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //  name: this.name,
        //  email: this.email,
        //  select: this.select,
        //  checkbox: this.checkbox
      } else {
        console.log('validation failed')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
