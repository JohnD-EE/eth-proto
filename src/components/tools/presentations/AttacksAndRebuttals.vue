<template>
  <v-container grid-list-md class="mb-5">
  <v-layout row wrap>
    <v-flex xs12 md12 py-4>
      <v-card>
        <v-tabs
          v-model="active"
          color="primary lighten-2 white--text"
          dark
          slider-color="yellow"
          show-arrows
          prev-icon="arrow_back_ios"
          next-icon="arrow_forward_ios"
          >
          <v-tab ripple v-for="(item, i) in tabItems" :key="i">
          {{ (i + 1) + '. ' + item.tabTitle }}
        </v-tab>

            <v-tab-item v-for="(item, i) in tabItems" :key="i">
              <v-card flat>
                <v-card-text>
                  <h2>{{ (i + 1) + '. ' + item.tabTitle }}</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img :src="'../../../../static/presentations/' + item.image" class="fitImage">
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card-text v-for="(subItem, s) in item.content" :key="s">
                    <h3>{{ subItem.subHeading }}</h3>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li v-for="(bullet, b) in subItem.bullets" :key="b">{{ bullet }}</li>
                </ul>
              </v-card-text>
              </v-flex>
            </v-layout>
              </v-card>
            </v-tab-item>

          </v-tabs>

        <div class="text-xs-center pb-4">
          <v-btn @click.native="next">Next</v-btn>
        </div>
      </div>

      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<style>
  .fitImage {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<script>

export default {
  data () {
    return {
      active: null,
      tabItems: [
        { tabTitle: 'Regulation', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Transaction Speed', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Privacy', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Incumbent Resistance', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Crime', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Onboarding', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'UX', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Security and Hacks', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]},
        { tabTitle: 'Price Volatility', image: 'prometheus.jpg', content: [
          { subHeading: 'Attacks', bullets: [
            'bullet1', 'bullet2'
          ]},
          { subHeading: 'Rebuttals', bullets: [
          'bullet1', 'bullet2'
          ]}
        ]}
      ]
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < this.tabItems.length - 1 ? active + 1 : 0).toString()
      }
  }
}
</script>
