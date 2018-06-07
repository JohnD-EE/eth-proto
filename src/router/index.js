import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'Signin' },
  { path: '/signup', component: 'Signup' },
  { path: '/wallet', component: 'Wallet', meta: { requiresAuth: true } },
  { path: '/home', redirect: '/wallet' },
  { path: '/system', component: 'System' },
  { path: '*', component: 'NotFound' },
  { path: '/auction', component: 'demoAuction/Auction', meta: { requiresAuth: true } },
  { path: '/escrow', component: 'demoEscrow/Escrow', meta: { requiresAuth: true } },
  { path: '/brand-funded', component: 'demoBrandFunded/BrandFunded', meta: { requiresAuth: true } },
  { path: '/branded-currency', component: 'demoBrandedCurrency/BrandedCurrency', meta: { requiresAuth: true } },
  { path: '/morescenarios', component: 'demoScenarios/MoreScenarios', meta: { requiresAuth: true } },
  { path: '/opportunity-analysis', component: 'tools/opportunityAnalysis/OpportunityAnalysis', meta: { requiresAuth: true } },
  { path: '/proposition', component: 'tools/proposition/Proposition', meta: { requiresAuth: true } }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
