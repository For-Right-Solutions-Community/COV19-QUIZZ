<template>
  <div class="container">
     <Quizz v-if="addsucces && !updatemode" :patient="selectedpatient"/><!--lancer la quizz une fois le client est enregistré la premiere fois-->
    <div v-if="!addsucces" class="columns grid-xs">
      <div class="column col-mx-auto col-4 col-xs-10 col-xl-4 col-l-5 col-md-8">
        <h5 v-if="!updatemode">Ajouter un patient</h5>
        <h5 v-if="updatemode" v-once>Modifier le patient {{ patient.firstname}}</h5>
        <div class="form-group">
          <label class="form-label" for="email">Nom</label>
          <input
            class="form-input"
            id="nom"
            type="text"
            placeholder="Nom"
            @keyup="forumalerror = false "
            v-model="patient.firstname"
          />
          <label class="form-label" for="lastname">Prénom</label>
          <input
            class="form-input"
            id="lastname"
            type="text"
            placeholder="Prénom"
            @keyup="forumalerror = false "
            v-model="patient.lastname"
          />

          <label class="form-label" for="phone">Téléphone</label>
          <input
            class="form-input"
            id="phone"
            type="number"
            placeholder="Numéro de téléphone"
            @keyup="forumalerror = false "
            v-model="patient.phone"
          />

          <label class="form-label" for="age">Age</label>
          <input
            class="form-input"
            id="nom"
            type="number"
            placeholder="Age"
            @keyup="forumalerror = false "
            v-model="patient.age"
          />

          <label class="form-label" for="sexe">Sexe</label>
          <select
            class="form-select"
            placeholder="sexe"
            @keyup="forumalerror = false "
            v-model="patient.gender"
          >
            <option value="MALE">Homme</option>
            <option value="FEMALE">Femme</option>
          </select>
        </div>
        <div class="form-group">
          <button v-if="!updatemode" @click="save()" class="btn btn-primary">Ajouter et enregistrer</button>
          <button v-if="!updatemode" @click="exit()" class="btn btn-link">Quitter</button>
          <button v-if="updatemode" @click="update()" class="btn btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../assets/config";
import Quizz from "./Quizz";
let ipatient = {
  firstname: "",
  lastname: "",
  cin: "",
  phone: "",
  email: "",
  age: 0,
  weight: 0,
  height: 0,
  gender: 1,
  civilStatus: 1,
  condition: 1,
  profession: 1,
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
  covidTestResult: ""
};
export default {
    components: {
        Quizz
    },
  props: {
    patient: {
      type: Object,
      default: function get() {
        return ipatient;
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
      selectedpatient:{},
      addsucces:false
    };
  },
  methods: {
    update: function() {
      //let self = this;
      config.updatepatient(this.patient, function() {
        console.log("Update patient succes");
      });
    },
    save: function() {
      let self = this;
      config.createpatient(this.patient, function(data) {
        self.selectedpatient  = data;
        self.addsucces = true;
      });
    },
    exit: function() {
      this.$router.push("home");
    }
  }
};
</script>