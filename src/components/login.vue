<template>
<div class="fluid-container fc">
<div class="log">
       <center> 
           <div class="img" id="img"></div>
       </center>
    <input type="password" name="password" id="pd" placeholder="password" v-model="passwd" >
    <center><button @click.prevent="logi">login</button>
    <p v-if="feedback">{{feedback}}</p></center>
</div>
</div> 
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
name: 'login',
props: ['id'],
data(){
    return{
        pass: "",
        feedback:null,
        passwd:null
    }
},
 methods:{
    logi(){
        console.log(this.pass)
        if(this.pass === this.passwd){
            this.$router.push({name:'home', params:{id:this.id}})
        }
        else{
            this.feedback="Incorrect Password"
        }
    }
},
mounted(){
     db.collection("users").doc(this.id).get().then(doc=>{
         if(doc.exists){
         this.pass=doc.data().password
         console.log(this.pass)
         }

     })
}
}
</script>

<style>
.log{
    background-color: white;
    margin-left: 390px;
    margin-right: auto;
    margin-top:18% !important;
    width: 40%;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position:absolute;
}
.fc{
    background-color: #e1f2fb;
    background-size: cover;
    min-height: 100vh;
}
@media only screen and (max-width: 650px){
.log{
    background-color: white;
    margin-left: 37px;
    margin-right: auto;
    margin-top:68%!important;
    width: 80%;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
}
.fc{
    background-color: #e1f2fb;
    background-size: cover;
    min-height: 100vh;
}
}
</style>