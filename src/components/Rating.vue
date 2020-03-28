<template>
  <div>
    <h1>{{ rate }}</h1>
    <input v-model="rate"/>
    <span @click="rate = index+1" :class="{'fa fa-star':index<rate,'fa fa-star-o':index>=rate}" v-for="(item,index) in 10 " :key="index"></span>
  </div>
</template>
<script>
export default {
  name: "Rating",
  data() {
    return{
        rate : 3
    }
  }
};
</script>