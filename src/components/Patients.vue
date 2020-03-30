<template>
  <div>
    <HeaderNavigation />
    <div v-for=" i in 5" class="card" :key="i">
      <div class="card-image">
        <img src="img/sick128.png" class="img-responsive" />
      </div>
      <div class="card-header">
        <div class="card-title h5">Samih Choouchene</div>
        <div class="card-subtitle text-gray">Homme 35 ans</div>
      </div>
      <div class="card-body">Tel : 23 467 919 </div>
      <div class="card-footer">
        <button class="btn btn-primary">Modifier le profil </button>
        <button class="btn btn-primary">Symptômes </button>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNavigation from "./HeaderNavigation";
export default {
  components: {
    HeaderNavigation
  }
};
</script>