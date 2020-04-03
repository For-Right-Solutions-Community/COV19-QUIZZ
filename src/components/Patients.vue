<template>
 <div align="right">
    <HeaderNavigation />
    <div id="PatientList" v-show="patientlistmode">   
    <div v-if="loading" class="loading">... جاري التحميل </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="post">
    <div v-for=" patient in patients" class="card  topspace" :key="patient.id">
      <div class="card-image">
        <img :src="patient.gender=='MALE'?'img/sick128.png':'img/sickf128.png'" class="img-responsive" />
      </div>
      <div class="card-header">
        <div class="card-title h5">{{patient.firstname }} {{ " " }}  {{patient.lastname}}</div>
        <div class="card-subtitle text-gray"> {{patient.gender=="MALE"?" ذكر ":" أنثى"}}  {{patient.age}}  سنة</div>
      </div>
      <div class="card-body">Tel : {{patient.phone}}</div>
      <div class="card-footer">
        <button class="btn " @click="profilemode(patient)" > تغيير المعطيات</button>
        <button class="btn btn-primary" @click="sympthoms(patient)"> تتبع الأعراض</button>
      </div>
    </div>
    </div>
  </div> <!--Patient List end -->
  <div id="symptomsdeatils" v-if="symptomsdetailsmode" align="center">
    <Quizz :patient="selectedpatient" v-on:sendsucces="quitsymptomsdetailsmode()" />
    <button class="btn btn btn-link" @click="quitsymptomsdetailsmode()"> إلغاء </button>
   </div> 
    <div id="patientdetails" v-if="editprofilemode" align="center">
    <AddPatient :patient="selectedpatient" :updatemode="true" v-on:sendsucces="quitprofilemode()" />
    <button class="btn btn btn-link" @click="quitprofilemode()"> إلغاء </button>
   </div>
 </div>  


</template>
<script>
import HeaderNavigation from "./HeaderNavigation";
import Quizz from "./Quizz";
import AddPatient from "./AddPatient";
import config from "../assets/config";
export default {
  data() {
    return {
      patientlistmode: true,
      symptomsdetailsmode: false,
      editprofilemode: false,
      selectedpatient: {},
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
     
    sympthoms(patient)
    {
       // this.$router.push('quizz') ;  
       this.patientlistmode=false;
       this.symptomsdetailsmode=true;
       this.selectedpatient=patient;
    },
    quitsymptomsdetailsmode()
    {
       // this.$router.push('quizz') ;  
       this.patientlistmode=true;
       this.symptomsdetailsmode=false;
       this.selectedpatient={};
       this.refreshdata();
    },
    profilemode(patient)
    {
       // this.$router.push('quizz') ;  
       this.patientlistmode=false;
       this.editprofilemode=true;
        Object.assign(this.selectedpatient,patient); //clone le objet a modifier lor de update
    },
    quitprofilemode()
    {
       // this.$router.push('quizz') ;  
       this.patientlistmode=true;
       this.editprofilemode=false;
       this.selectedpatient={};
       this.refreshdata();
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
    },
    refreshdata(){
      let self = this;
      config.fetchpatients(function(data) {
        self.patients = data;
        });
    }

  },
  components: {
    HeaderNavigation,
    Quizz,
    AddPatient
  }
};
</script>