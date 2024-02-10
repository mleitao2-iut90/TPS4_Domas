import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/orga',
    name: 'orga',
    component: () => import('../views/ShowOrganisations.vue')
  },
  {
    path: '/orga/detail',
    name: 'orgaDetail',
    component: () => import('../views/DetailOrganisation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
