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
          <v-tab ripple>
          1. Money as Technology
          </v-tab>
          <v-tab ripple>
          2. Technology Evolves
          </v-tab>
          <v-tab ripple>
          3. Cryptocurrency Paradigm
          </v-tab>
          <v-tab ripple>
          4. Adoption
          </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h2>1. Money as Technology</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img src="../../../../static/presentations/syrian50PoundNote.png" class="fitImage">
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card-text>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>The central proposition is that money is a technology.</li>
                    <li>A technology which transmits information about the relative prices of goods and services, acts as a store of value, a medium of exchange and a unit of account.</li>
                    <li>In technology terms, money is a protocol, a language - the earliest forms of human writing, cuneiform, is actually clay tablets of accounts.</li>
                    <li>It seems that money is one of the oldest technologies of human invention.</li>
                </ul>
              </v-card-text>
              </v-flex>
            </v-layout>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h2>2. Technology Evolves:</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img src="../../../../static/presentations/dispenseWithAHorse.jpg" height="360" class="fitImage">
                  </v-card-text>
                </v-flex>
                  <v-flex xs12 md6>
                    <v-card-text>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>Technology always changes, sometimes slowly as an evolution over time, and sometimes quickly as a revolution, or a paradigm shift.</li>
                    <li>New paradigms are often met with skepticism, especially by the poweful whose powerbase is firmly rooted in the old incumbent paradigm.</li>
                  </ul>
                </v-card-text>
              </v-flex>
            </v-layout>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <h2>3. Cryptocurrency, a Paradigm Shift in Money?</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img src="../../../../static/presentations/prometheus.jpg" class="fitImage">
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card-text>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>Just as the Greek Titan, Prometheus, stole the technology of fire from the Gods and gave it to humanity, cryptocurrency wrestles the issuance, control and exchange of money from the 'gods' of government, banks and payments service providers, and puts it in the hands of everyday people.</li>
                    <li>Cryptocurrency is potentially a technological paradigm shift in money.</li>
                    <li>It changes the way money is created, controlled and exchnaged.</li>
                    <li>It makes money programmable and extremely flexible.</li>
                    <li>People can create their own economic systems, applying their own monetary policy, unleashing all kinds of new use cases.</li>
                  </ul>
                </v-card-text>
              </v-flex>
            </v-layout>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>

                <v-card-text>
                  <h2>4. Widespread Adoption?</h2>
                </v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                  <v-card-text class="text-xs-center">
                    <img src="../../../../static/presentations/crossingTheChasm.png" class="fitImage">
                  </v-card-text>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card-text>
                  <ul class="ml-4 mb-3" style="list-style-type:disc">
                    <li>So if a new technology offers significant improvements, such as being more inherrently secure, cheaper to use, more accessible, more open, more scalable, more flexible and adaptable then it seems reasonable to conclude that market forces will eventually lead to its widespread adoption.</li>
                    <li>However, a genuine paradigm shift will receive much resistance and obstacles of convservatism to overcome...</li>
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
      active: null
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 3 ? active + 1 : 0).toString()
    }
  }
}
</script>
