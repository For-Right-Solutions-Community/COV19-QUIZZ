<template>
  aaa
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
 
</style>
 