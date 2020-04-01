<template>
<div align="right">
    <HeaderNavigation />
     <h5> <p>مرحبا بك في هذا الموقع الذي يسمح لك بالإتصال بالإسعاف المخصص لمرض الكورنا.
هذا الموقع  يهدف إلى التسجيل في خدمة الإستعجالي في حال ظهرت عليك  أو لأحد أفراد عائلتك أعراض هذا المرض أو بعضا من مضاعفاته.
تسطيع من هذا الموقع تسجيل قائمة من المرضى و متابعة حالتهم مع قسم الإستعجالي.</p></h5>
     <button class="btn btn-primary" @click="addpatient()"> إضافة مريض </button>
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