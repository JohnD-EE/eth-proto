<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Auction</h1>
      <h3>Methods Available</h3>
      <h4>Auction Owner/Controller</h4>
      <ul>
        <li>createAction</li>
        <li>getHighestBid</li>
        <li>cancelAuction</li>
        <li>allAuctions</li>
      </ul>
      <h4>Auction Bidders</h4>
      <ul>
        <li>placeBid</li>
        <li>withdraw</li>
      </ul>
      <h4>Anybody</h4>
      <ul>
        <li>allAuctions</li>
        <li>withdraw</li>
      </ul>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {}
</script>
