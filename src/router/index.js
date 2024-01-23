import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/authentification',
    name: 'authentification',
    component: () => import('../views/AuthenticationView.vue')
  },
  {
    path: '/orga/add',
    name: 'AddOrga',
    component: () => import('../views/AddOrgaView.vue'),
  },
  {
    path: '/orga',
    name: 'orga',
    component: () => import('../views/ShowOrgaView.vue'),
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('../views/ShowTeamsView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
