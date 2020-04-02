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
  
  methods :{

    logout : function (){
      localStorage.removeItem("tokenid");
      localStorage.removeItem("samu_token");
      this.$router.push('login') ;    
    }
  }
}
</script>