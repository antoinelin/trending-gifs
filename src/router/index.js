import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import SearchPage from '@/containers/SearchPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search/:term',
      name: 'search',
      component: SearchPage,
    },
  ],
})
