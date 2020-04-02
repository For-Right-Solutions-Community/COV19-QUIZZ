<template>
  <div align="right">
    <HeaderNavigation />
    <div align="center">
      <img
        src="img/AMU190.png"
        alt="AMU 190 "
        style="width:256px;height:256px;"
        class="img-responsive"
      />
      <h5>
        <p>
          مرحبا بك في هذا الموقع الذي يسمح لك بالإتصال بالإسعاف المخصص لمرض الكورنا.
          هذا الموقع يهدف إلى التسجيل في خدمة الإستعجالي في حال ظهرت عليك أو لأحد أفراد عائلتك أعراض هذا المرض أو بعضا من مضاعفاته.
          تسطيع من هذا الموقع تسجيل قائمة من المرضى و متابعة حالتهم مع قسم الإستعجالي.
        </p>
      </h5>
      <button class="btn btn-primary" @click="addpatient()">إضافة مريض</button>
    </div>

    <footer class="navbar">
      <section class="navbar-section">
      </section>
      <section class="navbar-center">
        <!-- centered logo or brand -->
         <img src="img/FMS.png" alt="AMU 190 " style="width:128px;height:128px;" class="img-responsive" />
         <img src="img/FRS.jpg" alt="AMU 190 " style="width:128px;height:128px;" class="img-responsive" />
        <img src="img/UN.png" alt="AMU 190 " style="width:128px;height:128px;" class="img-responsive" />
      </section>
      <section class="navbar-section">
      </section>
    </footer>
  </div>
</template>
<script>
import HeaderNavigation from "./HeaderNavigation";
export default {
  methods: {
    addpatient: function() {
      this.$router.push("addpatient");
    }
  },
  components: {
    HeaderNavigation
  }
};
</script>