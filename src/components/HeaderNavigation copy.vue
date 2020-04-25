<template>
  <div class="container grid-lg header-navigation">
    <header class="navbar">
      <section class="navbar-section">
        <div class="input-group input-inline">          
          <div class="dropdown">
            <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
                الحساب
              <i class="icon icon-caret"></i>
            </a>
            <!-- menu component -->
            <ul class="menu">
              <button class="btn btn-link input-group-btn" @click="logout()"><i class="icon icon-shutdown"></i>   خروج</button>
              <label class="label label-default" > {{ username }} </label>
            </ul>
          </div>
        </div>
      </section>
      <section class="navbar-section">
        <div class="navabrspace">
          <a href="/addpatient" class="btn btn-primary">إضافة مريض</a>
        </div>
         <div class="navabrspace">
           <a href="/patients" class="btn btn-primary">قائمة المرضى</a>
        </div> 
               
         <div class="navabrspace">
           <a href="/home" class="navbar mr-2">الرئيسية</a>
        </div>  
        
        
        
      </section>
    </header>
  </div>
</template>
<script>
export default {
      data () {
        return{
            userconnected : this.$user,
            password:'',
            signinrror : false,
            signinmsgerror:'',
            loading : false,
        }
    },
  methods :{

    logout : function (){
      localStorage.removeItem("tokenid");
      localStorage.removeItem("samu_token");
      localStorage.removeItem("user");
      this.$router.push('login') ;    
    }
  }
  ,
  computed:{
    username(){
     let user = JSON.parse(localStorage.getItem("user"));
      return user.username;
    }
  }
}
</script>
<style scoped>
 .navabrspace{
   padding-left:10px;
   padding-top:5px;
 }
 .site-logo img
 {
   max-width: 120px;
   margin-top : 15px;
 }
  .navbar-collapse {
          display: flex !important; 
          flex-basis: auto;
        }
</style>
<div class="site-logo">
        <a class="navbar-brand" href="index.html">
          <img src="img/AMU190.png" class="img-fluid" alt="Img">
        </a>
      </div>