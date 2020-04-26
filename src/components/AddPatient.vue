<template>
  <div class="container grid-lg" >
    <HeaderNavigation v-if="!updatemode" />
    <Quizz v-if="addsucces && !updatemode" :patient="selectedpatient" v-on:sendsucces="exit()" />
    <!--lancer la quizz une fois le client est enregistré la premiere fois-->
        <div align="center">
           <h2 v-if="!updatemode">إضافة مريض</h2>
            <h4 v-if="updatemode" v-once>تغيير بيانات {{ patient.firstname}}</h4> 
         </div> 
       <ValidationObserver ref="observer" v-slot="{ invalid }">
    <div v-if="!addsucces" class="columns grid-xs"  >               
      <div class="column col-mx-auto col-6 col-xs-12 col-xl-5 col-l-5 col-md-12">
    <ValidationProvider rules="required|min:3" immediate v-slot="{ errors }">
         <label class="form-label" for="email">الإسم *</label>
          <input
            class="form-input"
            id="nom"
            type="text"
            placeholder="الإسم"
            @keyup="forumalerror = false "
            v-model="patient.firstname"
            required
          />
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
         
     </ValidationProvider>
               
         <ValidationProvider rules="required|min:3" immediate  v-slot="{ errors }">
            <label class="form-label" for="lastname">اللقب *</label>
          <input
            class="form-input"
            id="lastname"
            type="text"
            placeholder="اللقب"
            @keyup="forumalerror = false "
            v-model="patient.lastname"
          />
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
     </ValidationProvider>
          <ValidationProvider rules="required|telephone" immediate v-slot="{ errors }">
          <label class="form-label" for="phone">رقم الجوال *</label>
          <input
            class="form-input"
            id="phone"
            type="number"
            placeholder="رقم الجوال"
            @keyup="forumalerror = false "
            v-model="patient.phone"
          />
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
        </ValidationProvider>
          <label class="form-label" for="backup_phone">رقم هاتف احد الاقارب في حالة عدم التحصل عليك</label>
          <input
            class="form-input"
            id="backup_phone"
            type="number"
            placeholder="رقم الجوال احد الاقارب"
            @keyup="forumalerror = false "
            v-model="patient.backup_phone"
          />
            <div align="left">
             <label class="label label-warning indisplay"> </label> 
             </div>


      </div> 
      <div class="column col-mx-auto col-6 col-xs-12 col-xl-6 col-l-6 col-md-12">

  
        <div class="form-group">
        
          <ValidationProvider rules="required|age" immediate v-slot="{ errors }">
          <label class="form-label" for="age">العمر *</label>
          <input
            class="form-input"
            id="nom"
            type="number"
            placeholder="العمر"
            @keyup="forumalerror = false "
            v-model="patient.age"
          />
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
         </ValidationProvider>
          <ValidationProvider rules="required" immediate v-slot="{ errors }">
          <label class="form-label" for="sexe">الجنس *</label>
          <select
            class="form-select"
            placeholder="الجنس"
            @keyup="forumalerror = false "
            v-model="patient.gender"
          >
            <option value="">الجنس</option>
            <option value="MALE">ذكر</option>
            <option value="FEMALE">أنثى</option>
          </select>
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
          </ValidationProvider>

          <ValidationProvider rules="required" immediate v-slot="{ errors }">
          <label class="form-label" for="sexe">الحالة المدنية</label>
          <select
            class="form-select"
            placeholder="الحالة المدنية"
            @keyup="forumalerror = false "
            v-model="patient.civilStatus"
          >
            <option value="">الحالة المدنية</option>
            <option value="SINGLE">أعزب / عزباء</option>
            <option value="MARRIED">متزوج / متزوجة</option>
            <option value="WIDOWED"> أرمل / أرملة</option>
            <option value="DIVORDECED"> مطلق / مطلقة </option>
          </select>
          <div align="left">
             <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
          </div>
          </ValidationProvider>

          <div v-if="patient.address!=null">
            <label class="form-label" for="ville">الولاية *</label>
             <ValidationProvider rules="required" immediate v-slot="{ errors }">
            <select
              class="form-select"
              placeholder="الولاية"
              @keyup="forumalerror = false "
              v-model="patient.address.state"
            >
              <option value="">الولاية</option>
              <option value="ARIANA">ولاية أريانة</option>
              <option value="BEJA">ولاية باجة</option>
              <option value="BENAROURS">ولاية بن عروس</option>
              <option value="BIZERTE">ولاية بنزرت</option>
              <option value="TATOUINE">ولاية تطاوين</option>
              <option value="TOUZUER">ولاية توزر</option>
              <option value="TUNIS">ولاية تونس</option>
              <option value="JANDOUBA">ولاية جندوبة</option>
              <option value="ZAGHOUIN">ولاية زغوان</option>
              <option value="SILIANA">ولاية سليانة</option>
              <option value="SOUSSE">ولاية سوسة</option>
              <option value="SIDIBOUZID">ولاية سيدي بوزيد</option>
              <option value="SFAX">ولاية صفاقس</option>
              <option value="GABES">ولاية قابس</option>
              <option value="KBELLI">ولاية قبلي</option>
              <option value="GASSERINE">ولاية القصرين</option>
              <option value="GAFSA">ولاية قفصة</option>
              <option value="KAIROIN">ولاية القيروان</option>
              <option value="ELKEF">ولاية الكاف</option>
              <option value="MEDINE">ولاية مدنين</option>
              <option value="MONASTIR">ولاية المنستير</option>
              <option value="MANNOUBA">ولاية منوبة</option>
              <option value="MAHDIA">ولاية المهدية</option>
              <option value="NABEUL">ولاية نابل</option>
            </select>
            <div align="left">
              <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
            </div>
            </ValidationProvider>
            
          </div>
        </div>
       </div>
        <div class="clearfix"></div>
        <div class="form-group col-12">
         <ValidationProvider rules="required" immediate v-slot="{ errors }">
            <label class="form-label" for="adresse">عنوان الإقامة *</label>
            <input
              class="form-input"
              id="nom"
              type="text"
              placeholder="عنوان الإقامة"
              @keyup="forumalerror = false "
              v-model="patient.address.avenue"
            />
            <div align="left">
              <label class="label label-warning" v-if="errors[0]">   {{ errors[0]}} </label> 
            </div>
            </ValidationProvider>

            <br>
            <div v-if="patient.location!=null">
            <button @click="geolocalisation()" class="btn btn-primary btn-top"> <i class="icon icon-location"> </i> تحديد الموقع  </button>

            </div>
          </div>
              
     
      <div class="clearfix"></div>
        <div class="form-group col-12 margin20">
          <button v-if="!updatemode" @click="save()" :disabled=" invalid == true " class="btn btn-primary col-4">تسجيل</button>
          <button v-if="!updatemode" @click="exit()" class="btn btn-primary col-4 float-left">خروج</button>
          <button v-if="updatemode" @click="update()" :disabled=" invalid == true " class="btn btn-primary col-4">تسجيل</button>
        </div>
      
    </div>
     </ValidationObserver>
     

  </div>
 
</template>

<script>
import config from "../assets/config";
import Quizz from "./Quizz";
import HeaderNavigation from "./HeaderNavigation";
import Vue from "vue";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

import { extend } from 'vee-validate';
import { required} from 'vee-validate/dist/rules';
extend('min', value => {
  if(value.length >= 3)
   return true;
   return  "  تلاثة أحرف على الأقل بالنسبة للإسم و اللقب "
});
extend('age', value => {
  if(value >= 1 && value <=120)
  return true;
  else
  return  '  العمر غير صحيح ';
});
extend('telephone', value => {
  if(value.length == 8)
  return true;
  return " رقم الهاتف يتكون من 8 أرقام"
});
extend('required', {
  ...required,
  message: ' الرجاء تعمير هذه الخانة '
});
Vue.component("ValidationProvider", ValidationProvider);

function getInitialData() {
  return {
  firstname: "",
  lastname: "",
  cin: "",
  phone: "",
  backup_phone: "",
  email: "",
  age: 0,
  weight: 0,
  height: 0,
  gender: "",
  civilStatus: "",
  liveAlone: false,
  liveWithFamily: false,
  fmailySize: 1,
  runningWater: false,
  hotWater: false,
  sewageDisposal: false,
  singleRoom: false,
  physicalHandicap: false,
  intellecHandicap: false,
  visitedCountry: "",
  countryPersonReturningFromTrip: "",
  sameHomePersonReturningFromTrip: false,
  covidTestResult: "",
  address: {
    state: "",
    avenue: ""
  },
  location: {
    lat: 0,
    lng: 0
  },
  antecedentRecord: {},
  exposure: {
    visitedCoutry: "Tunisie",
    contactWithTraveler: false,
    sameHomePersonReturningFromTrip: false,
    countryPersonReturningFromTrip: "",
    contactedTravellerTestResult: false,
    visitedRegion: "",
    visitDate: new Date(),
    contactWithInfectedPerson: false,
    visited_regwithSuspiciousGroupion: false
  }
}
}
export default {
  components: {
    Quizz,
    HeaderNavigation,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    patient: {
      type: Object,
      default: function get() {
        return getInitialData();
      }
    },
    updatemode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      forumalerror: false,
      selectedpatient: {},
      addsucces: false,
      v:{}
    };
  },
  methods: {
    geolocalisation: function() {
      let sel = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          sel.patient.location.lat = position.coords.latitude;
          sel.patient.location.lng = position.coords.longitude;
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    update: function() {
      //let self = this;
      let self = this;
      console.log("Patient before update");
      console.log(this.patient);
      config.updatepatient(this.patient, function() {
        console.log("Update patient succes");
        self.$emit("sendsucces");
      });
    },
    save: function() {
      let self = this;
      this.patient.date = new Date();
      config.createpatient(this.patient, function(data) {
        self.selectedpatient = data;
        self.addsucces = true;
      });
    },
    exit: function() {
      this.$router.push("patients");
    }
  }
};
</script>

<style scoped>
 h2 {margin-top: 30px}
 .btn-top {margin-top:-30px}
 .indisplay {opacity:0}
 .margin20 {margin-top:20px ; margin-bottom:20px}
 footer{
   padding : 30px 0 30px 0 ;
	background-color:#ca3610; 
  color : #fff;
	text-align:center;
}
</style>
