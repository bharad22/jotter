import Vue from 'vue'
import Router from 'vue-router'
import redirect from '@/components/redirect'
import home from '@/components/home'
import db from '@/firebase/init'
import firebase from 'firebase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: redirect
    },
    {
      path: '/:id',
      name: 'home',
      component: home,
      props: true
    }
  ]
})
