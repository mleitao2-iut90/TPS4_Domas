import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: { name: 'home' }
  },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
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
    {
        path: '/login',
        name:'login',
        component: () => import('../views/Login.vue')
    },
  {
    path: '*',
    name: 'error404',
    component: () => import('../App.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
