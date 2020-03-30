<template>
<div>
    <HeaderNavigation />
     <h5> Bienvenue dans SAMU190 vous pouvez ajouter des patients pour suivre leur état avec le service SAMU de Sfax</h5>
     <button class="btn btn-primary" @click="addpatient()">Ajouter un patient </button>
 </div>   
</template>
<script>
import HeaderNavigation from './HeaderNavigation';
export default {

 methods:{
     addpatient : function(){
         this.$router.push('addpatient') ;  
     }

 },
  components: {
    HeaderNavigation
  }
}
</script>