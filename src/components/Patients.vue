<template>
  <div>
    <HeaderNavigation />
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="post">
    <div v-for=" patient in patients" class="card" :key="patient.id">
      <div class="card-image">
        <img :src="patient.gender=='MALE'?'img/sick128.png':'img/sickf128.png'" class="img-responsive" />
      </div>
      <div class="card-header">
        <div class="card-title h5">{{patient.firstname }} {{ " " }}  {{patient.lastname}}</div>
        <div class="card-subtitle text-gray"> {{patient.gender=="MALE"?"Homme":"Femme"}}  {{patient.age}} ans</div>
      </div>
      <div class="card-body">Tel : {{patient.phone}}</div>
      <div class="card-footer">
        <button class="btn btn-primary">Modifier le profil</button>
        <button class="btn btn-primary" @click="sympthoms">Symptômes</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import HeaderNavigation from "./HeaderNavigation";
import config from "../assets/config";
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      patients: []
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
     
    sympthoms()
    {
        this.$router.push('quizz') ;  
    } 
    ,
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      let self = this;
      config.fetchpatients(function(data) {
        self.loading = false;
        console.log(data);
        self.post = "Data Found";
        self.patients = data;
        });
        // replace `getPost` with your data fetching util / API wrapper
        /*
        getPost(this.$route.params.id, (err, post) => {
            this.loading = false;
            if (err) {
            this.error = err.toString();
            } else {
            this.post = post;
            }
        });
        */
    }
  },
  components: {
    HeaderNavigation
  }
};
</script>