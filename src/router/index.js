import Vue from 'vue'
import Router from 'vue-router'
import redirect from '@/components/redirect'
import home from '@/components/home'
import db from '@/firebase/init'
import firebase from 'firebase'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: redirect,
      props:true
    },
    {
      path: '/:id',
      name: 'home',
      component: home,
      props:true,
      beforeEnter(to,from,next){
        let pass=null
        db.collection("users").doc(to.params.id).get().then(doc=>{
          if(doc.exists){
            pass=doc.data().password
            if(pass && from.path=="/"){
              //console.log(from)
              //console.log(to.params.id)
              //console.log(pass)
              next({name:'login', params:{id:to.params.id}})
            }
            else{
              next()
              
            }
          }
          else{
            next()
          }
        })
      }
    },
    {
      path: '/:id/login', 
      name: 'login',
      component: login,
      props:true
    }
  ]
})