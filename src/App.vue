<template>
  <div id="app">  
    <div v-if="notificationenable">
    <button class="btn " @click="play()"> play</button>
    <audio id="mySound" src="./assets/redalert.mp3"></audio>
    <div class="sticky">
      <ul v-if=" unreadmessages.length>0" >
        <li v-for="(msg,index) in unreadmessages" :key="index">
          <div class="toast toast-primary ">
              <button class="btn btn-clear float-right" @click="clearnotification(index)"></button>
              {{ msg }}
        </div>
       </li>
    </ul>
    </div> 
    </div>
    <router-view> </router-view>

  </div>
  
</template>  


<script>
import config from "./assets/config";

export default {
  name: 'App',
  data ()
  {
    return{
      routingdisabled : false,
      notificationenable:false,
      unreadmessages:[]
    }
  },
   created() {
       if(this.notificationenable)
       {
        this.initchannel();
       }

    },
   methods: {
    play(){
      document.getElementById("mySound").play();
    },
    clearnotification(index)
    {
        this.unreadmessages.splice(index,  1);
    },
    initchannel: function() {    
      let self = this;  
      config.monitornews((message)=>{
        self.unreadmessages.push(message);
        self.play();
      });
    }

  }
}

</script>
<style >
.sticky {
  position: fixed;
  top: 0;
  width: 50%
}
body {
    font-family: 'Tajawal', sans-serif;
    font-size: 14px;
    direction: rtl;
    text-align: right;
}
.btn{
    background: #fff;
    border: .05rem solid #ca3610;
    border-radius: .1rem;
    color: #ca3610;
    border-color: #a32505;
}
.btn :focus {
   color: #a32505;
   border-color: #a32505;
}
.btn:hover {
    color: #a32505;
   border-color: #a32505;
}

.btn.btn-primary {
 background: #ca3610;
 border-color: #ca3620;
}
.btn.btn-primary:focus {
  background-color: #a32505;
   border-color: #a32505;
}
.btn.btn-primary:hover {
    background-color: #a32505;
    border-color: #a32505;
}

.btn.btn-link{
    background: 0 0;
    border-color: transparent;
    color: #a32505;
}
.btn.btn-link:focus {
    background: 0 0;
    border-color: transparent;
    color: #8f2d14;
}
.btn.btn-link:hover {
    background: 0 0;
    border-color: transparent;
    color: #8f2d14;
}
.navbar.mr-2{
  color: #8f2d14;
}
.label.label-primary {
    background: #a32505;
    color: #fff;
}

 .justifyparagraph {
  text-align: justify;
  text-justify:auto;
  padding-top: 20px;
 } 
 .topspace{
   padding-top: 10px;
 }
  .leftspace{
   padding-left:10px;
 }
.padd20p {
  padding-top : 8%
}
</style>