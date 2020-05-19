<template>
    <div class="fluid-container bg" id="bg">
       <center> 
           <div class="img"></div>
       </center>
        
        <form >
            <div class="flex-container" id="cont" >
                <form action="https://www.google.com/search" class="searchform" method="get" name="searchform" target="_blank" >
                    <input name="sitesearch" type="hidden" value="">
                    <button class="hide" id="btn1"><i class="fab fa-google ic1" @click.prevent="tb()"></i></button>
                    <input autocomplete="on" class="form-control search" name="q" placeholder="Search" id="textInput" type="text">   
                </form>
                <button class="btn1" id="btn" title="Google-Search" @click.prevent="textbox()"><i class="fab fa-google-wallet ic" id="ic"></i> <span class="spa" id="spa">Jotter</span></button>
                <i class="fas fa-plus ic3" id="lig1" title="New-URL" @click.prevent="url()"></i>
                <i class="fas fa-lightbulb ic2" id="lig" title="Dark/Light-mode" @click.prevent="dark()"></i>
            </div>
            <div> 
                <textarea name="content" class="content" id="content" cols="30" rows="25" wrap="soft" placeholder="Enter Your Text Here...." v-model="content" ></textarea>
            </div>
            <center>
            <div class="cont" id="bot">
                <center>
                <button class="btn btn-primary btn4" id="btn4" title="Click-Add-To-Database" @click.prevent="add()"><i class="fas fa-plus ic4" id="ic4"></i></button>
                <button class="btn btn-primary btn5" id="btn5" title="Delete the contents" @click.prevent="del()"><i class="fas fa-trash-alt ic5" id="ic5"></i></button>
                </center>
            </div></center>
        </form>
    </div>
</template>


<script>
import username from 'superheroes'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
name: 'home',
props: ['id'],
data(){
    return{
        x:1,
        content: null,
        notes: null
    }
},
methods: {
    textbox(){
        document.getElementById("btn").style.display="none"
        document.getElementById("btn1").className="show1"
        document.getElementById("textInput").style.display="block"
        document.getElementById("textInput").className="show"
    },
    tb(){
        document.getElementById("btn1").className="hide"
        document.getElementById("btn1").style.display="none"
        document.getElementById("textInput").style.display="none"
        document.getElementById("textInput").className="search"
        document.getElementById("btn").style.display="block"


    },
    dark(){
           this.x=!this.x
           if(this.x == 0){
           document.getElementById("content").style.backgroundColor="#1b262c"
           document.getElementById("content").style.color="#a8e6cf"
           
           document.getElementById("cont").style.backgroundColor="#323232"
           document.getElementById("cont").style.borderColor="#323232"
           document.getElementById("btn").style.backgroundColor="#323232"
           document.getElementById("btn1").style.backgroundColor="#323232"
           document.getElementById("textInput").style.backgroundColor="white"
           document.getElementById("spa").style.color="white"
           document.getElementById("lig").style.color="white"
           document.getElementById("lig1").style.color="white"
           document.getElementById("bot").style.backgroundColor="#323232"
           document.getElementById("bot").style.borderColor="#323232"
           document.getElementById("btn4").style.borderColor="#323232"
           document.getElementById("btn4").style.backgroundColor="#323232"
           document.getElementById("ic4").style.color="white"
           document.getElementById("btn5").style.backgroundColor="#323232"
           document.getElementById("ic5").style.color="white"
           document.getElementById("btn5").style.borderColor="#323232"
           document.getElementById("bg").style.backgroundColor="#222831"
           }
           else{
           document.getElementById("content").style.backgroundColor="white"
           document.getElementById("content").style.color="black"
           document.getElementById("cont").style.backgroundColor="#f0f0f0"
           document.getElementById("cont").style.borderColor="#f0f0f0"
           document.getElementById("btn").style.backgroundColor="#f0f0f0"
           document.getElementById("btn1").style.backgroundColor="#f0f0f0"
           document.getElementById("textInput").style.backgroundColor="white"
           document.getElementById("spa").style.color="black"
           document.getElementById("lig").style.color="black"
           document.getElementById("lig1").style.color="black"
           document.getElementById("bot").style.backgroundColor="#f0f0f0"
           document.getElementById("bot").style.borderColor="#f0f0f0" 
           document.getElementById("btn4").style.borderColor="#f0f0f0"
           document.getElementById("btn4").style.backgroundColor="#f0f0f0"
           document.getElementById("ic4").style.color="#c70039"   
           document.getElementById("btn5").style.backgroundColor="#f0f0f0"
           document.getElementById("ic5").style.color="#c70039" 
           document.getElementById("btn5").style.borderColor="#f0f0f0"
           document.getElementById("bg").style.backgroundColor="#e1f2fb"
           }

    },
    url(){
         this.id=username.random();
        this.id= this.id.replace(' ','-')
        db.collection('users').doc(this.id).get().then(doc=>{
        if(!doc.exists){
        this.$router.push({name:'home',params:{id:this.id}})
        this.content=null

        }else{
            this.$router.push({name:'redirect'}).catch(err=>{})
        }
        })
        this.$router.push({name:'home',params:{id: this.id}})
    },
    add(){
        if(this.content)
        {
            this.notes=this.content
            console.log(this.notes)
            db.collection("users").doc(this.id).set({
                content: this.notes
            })
            alert("Data Added Successfully")
        }
    },
    del(){
        alert("This will erase the entire Text")
        this.content=null
        db.collection("users").doc(this.id).delete().then(function() {
            console.log("Document successfully deleted!");
            this.content=null
        }).catch(function(error) {
        console.error("Error removing document: ", error);
        });
    }
},
    mounted(){
            db.collection("users").doc(this.id).get().then(doc=>{
            this.content=doc.data().content
        })
    }
}
</script>

<style scoped>
.content{
    position: relative;
    display: flex;
    width: 60%;
    height: 400px;
    border-style: groove;
    opacity: 10;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    border-top: none;
    border-bottom: none;
    font-family: 'Roboto Slab', serif;
    color: black;
    font-size: 25px;
    padding: 20px;
    cursor: text;
    scrollbar-width: thin !important;  
    background-color: white;  
}
.content::-webkit-scrollbar {
  width: 6px !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.flex-container{
    width: 60%;
    height: 40px;
    border-style: groove;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    opacity: -1px;
    display: flex;
    margin-top: 30px;
    border-bottom: none;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #f0f0f0;
}
.btn1{
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
}
.ic{
    font-size: 25px;
    color: #c70039;
}
.spa{
    font-weight: bold;
    font-style: italic;
    font-size: 20px;
    color: black;
    opacity: 0.5;
}
.search{
    display: none;

}
.show{
    display: flex !important;
    border: 1px !important;
    border-style:groove!important;
    border-radius: 10px;
    width: 70% !important;
    height: 20px !important;
    border-radius: 10px!important;
    border-color: black!important;
    opacity: 0.5!important;
    padding: 2px!important;
    color: black!important;
    background-color: white!important;
    margin-left: 40px!important;
    margin-top: -27px!important;
}
#content::placeholder{
    color: black;
}
.search::placeholder{
    color: white;
}
.show::placeholder{
    color: black;
    opacity: 1000;
}
.hide{
    display: none;
}
.hide1{
    display: none;

}
.show1{
    display: block!important;
    font-size: 25px;
    color: #c70039;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;

}
.ic2{
    font-size: 20px;
    margin-left: 750px;
    cursor: pointer;
    opacity: 0.7; 
    position:fixed;
    display: flex;
    padding-top: 5px!important;  
}
.ic3{
    font-size: 20px;
    margin-left: 700px;
    cursor: pointer;
    opacity: 0.7; 
    position:fixed;
    display: flex;
    padding-top: 5px!important;  
}
.ic4{
    font-size: 20px;
    font-weight: bold;
    color: #c70039;
    margin-bottom: 2px;
    padding: 3px;
}
.ic5{
    font-size: 20px;
    font-weight: bold;
    color: #c70039;
    margin-bottom: 2px!important;
    padding-bottom: 3px!important;
}
.cont{
    width: 60%;
    height: 40px;
    border-style: groove;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    opacity: -1px;
    display: flex;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #f0f0f0;
}
.img{
   
    width: 7%;
    height: 100px;
    background-image: url("logo.png");
    position: relative;
    background-size: cover;

}
.btn4{
    border-radius: 5px;
    border-style: groove;
    width: 100px;
    cursor: pointer;
    margin-left: 300px;
    background-color:#f0f0f0 ;
    border-color: #f0f0f0;
}

.btn5{
    
    border-radius: 5px;
    border-style: groove;
    width: 100px;
    cursor: pointer;
    background-color:#f0f0f0 ;
    border-color: #f0f0f0;
}
.bg{
    background-color: #e1f2fb;
    min-height: 100vh;
}

@media only screen and (max-width: 600px){
    .content{
    position: relative;
    display: flex;
    width: 97%;
    height: 300px;
    border-style: groove;
    opacity: 10;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    border-top: none;
    border-bottom: none;
    font-family: 'Roboto Slab', serif;
    background-color: white;
    color: black;
    font-size: 20px;
    padding: 10px;
    cursor: text;
    scrollbar-width: thin !important;    
}
.flex-container{
    width: 97%;
    height: 40px;
    border-style: groove;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    opacity: -1px;
    display: flex;
    margin-top: 30px;
    border-bottom: none;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #f0f0f0;
}
.cont{
    width: 97%;
    height: 40px;
    border-style: groove;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    opacity: -1px;
    display: flex;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #f0f0f0;
}
.img{
    width: 25%;
    height: 90px;
    background-image: url("logo.png");
    position: relative;
    background-size: cover;

}
.ic2{
    font-size: 20px;
    margin-left: 310px;
    cursor: pointer;
    opacity: 0.7; 
    position:fixed;
    display: flex;
    padding-top: 5px!important;  
}
.ic3{
    font-size: 20px;
    margin-left: 260px;
    cursor: pointer;
    opacity: 0.7; 
    position:fixed;
    display: flex;
    padding-top: 5px!important;  
}
.btn4{
    border-radius: 5px;
    border-style: groove;
    width: 80px;
    cursor: pointer;
    margin-left: 110px;
    background-color:#f0f0f0 ;
    border-color: #f0f0f0;
}

.btn5{
    
    border-radius: 5px;
    border-style: groove;
    width: 80px;
    cursor: pointer;
    background-color:#f0f0f0 ;
    border-color: #f0f0f0;
}
.bg{
    background-color: #e1f2fb;
    min-height: 100vh;
}

}
</style>