<template>
  <div class="redirect">
   <bar-loader class="custom-class" color="#c70039" :loading="loading" :size="150" :sizeUnit="px"></bar-loader>
  </div>
   
</template>

<script>
import username from 'superheroes'
import db from '@/firebase/init'
import firebase from 'firebase'
import { BarLoader } from '@saeris/vue-spinners'
export default {
  name: 'redirect',
  components: {
    BarLoader
  },
  data () {
    return {
      id: null
    }
  },
  created(){
    new Vue({ el: '#app', data: { loading: false } })
    this.id=username.random();
    this.id= this.id.replace(/[^A-Z0-9]/ig, "-")
    db.collection('users').doc(this.id).get().then(doc=>{
      if(!doc.exists){
        this.$router.push({name:'home',params:{id: this.id}})
      }else{
        this.$router.push({name:'redirect'}).catch(err=>{})
      }
    })
    this.$router.push({name:'home',params:{id: this.id}})
  }  
}
</script>

<style scoped>
.custom-class{
  margin:auto;
  margin-top: 25%;
  width: 200px;

}
</style>
