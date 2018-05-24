<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Some Info</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Info</v-list-tile-title>
              <v-list-tile-sub-title>Words</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile v-for="(product,p) in products" :key="p">

              <img :src="'../../../static/products/' + product.image" onerror="this.src='../../../static/profile/noImage.jpg'" width="60" class="mr-4">

            <v-list-tile-content @click="">
              <v-list-tile-title>{{ product.title }} - {{ product.attributes.size }}</v-list-tile-title>
              <v-list-tile-sub-title>£{{ (product.priceInPence / 100).toFixed(2) }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox v-model="productsSelected[p]"></v-checkbox>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductsJSON from '../proxyData/products.json'

export default {
  data () {
    return {
      productsSelected: [1]
    }
  },
  computed: {
    products () {
      return ProductsJSON
    }
  }
}
</script>
