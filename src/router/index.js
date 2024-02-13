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
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('../views/ShowTeamsView.vue')
  },
  {
    path: '/teams/add',
    name: 'teamsAdd',
    component: () => import('../views/AddTeamsView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
