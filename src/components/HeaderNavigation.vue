<template>
  <div class="header-navigation">
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
        <a href="/patients" class="btn btn-primary">قائمة المرضى</a>
        <a href="/home" class="navbar mr-2">الرئيسية</a>
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