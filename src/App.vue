<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>  


<script>

export default {
  name: 'App',
  data ()
  {
    return{
      routingdisabled : false
    }
  }
}
</script>
<style >

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
  padding-top: 50px;
 } 
 .topspace{
   padding-top: 10px;
 }
  .leftspace{
   padding-left:10px;
 }
</style>