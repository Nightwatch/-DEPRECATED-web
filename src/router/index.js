import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store'

Vue.use(Vuetify)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.authenticated && to.meta.authenticate) {
    return next({name: 'Home'})
  }
  next()
})

export default router
