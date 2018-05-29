<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-flex xs12>
          <v-select
          :items="prodcutCategories"
          v-model="categoriesFiltered"
          label="Select"
          multiple
          hint="Filter the product list"
          persistent-hint
          ></v-select>
        </v-flex>
        <v-list three-line subheader>
          <v-list-tile v-for="(product, p) in products" :key="p" v-if="filteredCategory(product.categories)">
            <img :src="'../../../static/products/' + product.image" onerror="this.src='../../../static/profile/noImage.jpg'" width="76" class="mr-4">
            <v-list-tile-content @click="">
              <v-list-tile-title>{{ product.title }} - {{ product.attributes.size }}</v-list-tile-title>
              <v-list-tile-sub-title>£{{ (product.priceInPence / 100).toFixed(2) }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="caption" v-for="(category, c) in product.categories" :key="c">{{ category }}<span v-show="c < (product.categories.length -1)">, </span></span>
              </v-list-tile-sub-title>
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
      productsSelected: [],
      prodcutCategories: ['food', 'beverages', 'healthy', 'non-alchoholic', 'alcoholic', 'salad', 'vegetables', 'fruit', 'nuts', 'seeds'],
      categoriesFiltered: ['food', 'beverages', 'healthy', 'non-alchoholic', 'alcoholic', 'salad', 'vegetables', 'fruit', 'nuts', 'seeds']
    }
  },
  computed: {
    products () {
      return ProductsJSON
    }
  },
  methods: {
    filteredCategory (categories) {
      let matched = false
      let categoriesFiltered = this.categoriesFiltered
      categoriesFiltered.forEach(res => {
        if (categories.includes(res)) {
          matched = true // as soon as we find a match, return true
        }
      })
      return matched
    }
  }
}
</script>
