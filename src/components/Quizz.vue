<template >
  <section class="container topspace">
    <div>
      <div align="center">
        <h4 v-if="patient!=null">{{patient.firstname + " "+patient.lastname }}</h4>
        <div>
        {{ ""+new Date().toISOString()  }}
          </div>
      </div>
    </div>

    <div class="columns grid-xs">
      <div class="column col-mx-auto col-8 col-xs-12 col-xl-8 col-l-8 col-md-8">
        <div class="questionBox" id="quizz">
          <div class="panel">
            <div class="panel-nav">
              <!-- navigation components: tabs, breadcrumbs or pagination -->
            </div>
            <div class="panel-body" align="right">
              <!--qusetionContainer-->
              <div
                class="questionContainer"
                v-if="questionIndex<quiz.questions.length"
                v-bind:key="questionIndex"
              >
                <!--progress-->
                <div class="progressContainer">
                  <progress
                    class="progress is-info is-small"
                    :value="(questionIndex/quiz.questions.length)*100"
                    max="100"
                  >{{(quiz.questions.length)*100}}%</progress>
                </div>
                <!--/progress-->

                <!-- questionTitle -->
                <h4
                  class="titleContainer title label label-rounded label-primary"
                >{{ questiontext(questionIndex) }}</h4>

                <!-- quizOptions -->
                <div class="optionContainer" align="right">
                  <template v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='ONECHOICE'">
                    <div
                      class="option"
                      v-for="(response, index) in quiz.questions[questionIndex].responses"
                      @click="selectOption(index)"
                      :class="{ 'is-selected': userResponses[questionIndex] == index,'badge':userResponses[questionIndex] == index}"
                      :key="index"
                    >{{ reponsetext(response) }}</div>
                  </template>

                  <div v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='MULTIPLECHOICES'">
                    <div
                      v-for="(response, index) in quiz.questions[questionIndex].responses"
                      :key="index"
                    >
                      {{ reponsetext(response) }}
                      <input
                        type="checkbox"
                        @click="selectMulipleOption(index)"
                        v-model="quiz.questions[questionIndex].responses[index].selected"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--/questionContainer-->

              <!--quizCompletedResult-->
              <div
                v-if="questionIndex >= quiz.questions.length"
                v-bind:key="questionIndex"
                class="quizCompleted has-text-centered"
              >
                <!-- quizCompletedIcon: Achievement Icon -->
                <span class="icon">
                  <i class="fa" :class="score()>3?'fa-check-circle-o is-active':'fa-times-circle'"></i>
                </span>

                <div class="container">
                  <div class="columns">
                    <div class="column col-4 col-mx-auto">
                      <!--resultTitleBlock-->
                      <h4 v-if="!succeenvoie" class="title" align="left">
                        <p>
                          تم الإنتهاء من تعمير البيانات.
                          هل تريد إرسالها إلى خدمة الإستعجالي ؟
                        </p>
                      </h4>

                      <span v-if="succeenvoie" class="label label-success">تم إرسال البيانات بنجاح !</span>
                      <span
                        v-if="errorwhilesending"
                        class="label label-error"
                      >خلل في الإرسال حاول مرة أخرى</span>
                    </div>
                  </div>
                </div>

                <!--<p class="subtitle">
					Total score: {{ score() }} / {{ quiz.questions.length }}
                </p>-->
                <br />
                <!--/resultTitleBlock-->
              </div>
            </div>
            <div class="container" align="right">
              <header class="navbar">
                <section class="navbar-section">
                  <button
                    v-if="questionIndex<quiz.questions.length"
                    :class="(userResponses[questionIndex]==null)?'':'is-active'"
                    v-on:click="next();"
                    :disabled="questionIndex>=quiz.questions.length  
                    || (userResponses[questionIndex]==null && quiz.questions[questionIndex].QUIZZ_TYPE=='ONECHOICE')
                    ||(!quiz.questions[questionIndex].minselected && quiz.questions[questionIndex].QUIZZ_TYPE=='MULTIPLECHOICES')"
                    class="btn btn-primary"
                  >
                    <i class="icon icon-arrow-left"></i>
                    الموالي
                  </button>

                  <button
                    v-if="questionIndex>=quiz.questions.length"
                    v-show="!succeenvoie"
                    v-on:click="save();"
                    :disabled="succeenvoie  "
                    class="btn btn-success"
                  >
                    <i class="icon icon-mail"></i>

                    أرسل البيانات الآن
                  </button>
                </section>
                <section class="navbar-center">
                  <!-- centered logo or brand    || userResponses[questionIndex]==null -->
                </section>
                <section class="navbar-section">
                  <button
                    v-show="!succeenvoie"
                    v-on:click="prev();"
                    :disabled="questionIndex < 1"
                    class="btn"
                  >
                    السابق
                    <i class="icon icon-arrow-right"></i>
                  </button>
                </section>
              </header>
              <!--/quizFooter-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import questions from "../assets/questions";
import config from "../assets/config";

var quizz = questions;
let userResponseSkelaton = Array(quizz.questions.length).fill(null);
export default {
  name: "Quizz",
  props: {
    patient: Object
  },
  data() {
    return {
      message: "hello",
      quiz: quizz,
      questionIndex: 0,
      userResponses: userResponseSkelaton,
      isActive: false,
      succeenvoie: false,
      errorwhilesending: false
    };
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },

  methods: {
     questiontext : function(questionIndex)
    {
      if(this.patient.gender=="FEMALE")
      {
        if(!(typeof this.quiz.questions[questionIndex].textf === "undefined"))
        {
           return this.quiz.questions[questionIndex].textf; 
        }
        else{
          return this.quiz.questions[questionIndex].text; 
        }
      }
      else
      return this.quiz.questions[questionIndex].text; 
    },
    reponsetext : function(reponse)
    {
      if(this.patient.gender=="FEMALE")
      {
        if(!(typeof reponse.textf === "undefined"))
        {
           return reponse.textf; 
        }
        else{
          return reponse.text; 
        }
      }
      else
      return reponse.text; 
    },
    updatesymptoms: function()
    {

    },
    createfirstquizz: function()
    {
       console.log("Patient Before quizz update");
        console.log(this.patient);
      this.succeenvoie = false;
      this.errorwhilesending = false;
      let symptom = {
        patient: this.patient
      };

      let antecedent = this.patient.antecedentRecord;
      let exposure = this.patient.exposure;
      for (let i = 0; i < this.quiz.questions.length; i++) {
        if (!(typeof this.quiz.questions[i].constructsymptom === "undefined"))
          this.quiz.questions[i].constructsymptom(symptom);

        if (
          !(typeof this.quiz.questions[i].constructantecedent === "undefined")
        )
          this.quiz.questions[i].constructantecedent(antecedent);

        if (
        !(typeof this.quiz.questions[i].constructexposure === "undefined")
        )
          this.quiz.questions[i].constructexposure(exposure);
        
       if (
        !(typeof this.quiz.questions[i].constructpatient === "undefined")
        )
          this.quiz.questions[i].constructpatient(this.patient);
      }
      console.log("update exposure");
      console.log(exposure);
      symptom.date  = new Date();
      console.log(symptom);
      let self = this;
      config.createsymantecedent(this.patient,symptom, antecedent, function(error) {
        if (error == null) {
          console.log("Mesage envoyé avec succes");
          self.errorwhilesending = false;
          self.succeenvoie = true;
           self.$emit('sendsucces')
        } else {
          self.errorwhilesending = true;
          self.succeenvoie = false;
        }
      });
    },
    save: function() {
      this.createfirstquizz();
    },
    restart: function() {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function(index) {
      Vue.set(this.userResponses, this.questionIndex, index);
      this.quiz.questions[this.questionIndex].minselected = true;
      if (
        !(
          this.quiz.questions[this.questionIndex].responses[index].code ===
          "undefined"
        )
      ) {
        let selectedcode = this.quiz.questions[this.questionIndex].responses[
          index
        ].code;
        this.quiz.questions[this.questionIndex].selectedcode = selectedcode;
        console.log(this.quiz.questions[this.questionIndex].selectedcode);
      }
      console.log("Check box change " + index);
    },
    selectMulipleOption: function(index) {
      if (
        !(
          this.quiz.questions[this.questionIndex].responses[index].code ===
          "undefined"
        )
      ) {
        this.quiz.questions[this.questionIndex].responses[
          index
        ].selected = !this.quiz.questions[this.questionIndex].responses[index]
          .selected;
        console.log(
          "Check box change " +
            this.quiz.questions[this.questionIndex].responses[index].selected
        );
        let minselected = false;
        this.quiz.questions[this.questionIndex].minselected = minselected;
        for (
          let i = 0;
          i < this.quiz.questions[this.questionIndex].responses.length;
          i++
        ) {
          let rep = this.quiz.questions[this.questionIndex].responses[i];
          if (rep.selected) {
            minselected = true;
            this.quiz.questions[this.questionIndex].minselected = true;
            Vue.set(
              this.quiz.questions[this.questionIndex],
              minselected,
              minselected
            );
          }
        }
        console.log("Minmum selected " + minselected);
      }
    },
    next: function() {
      if (this.questionIndex < this.quiz.questions.length) {
        let zapnext = true;
        while (zapnext) {
          this.questionIndex++;
          if (this.questionIndex >= this.quiz.questions.length) {
            zapnext = false;
          } else if (
            typeof this.quiz.questions[this.questionIndex].isvisible ===
            "undefined"
          ) {
            zapnext = false;
          } else {
            for (let i = 0; i < this.questionIndex; i++) {
              if (typeof this.quiz.questions[i].selectedcode === "undefined") {
                continue;
              } else if (
                this.quiz.questions[this.questionIndex].isvisible(
                  this.quiz.questions[i].ID,
                  this.quiz.questions[i].selectedcode
                )
              ) {
                zapnext = false;
                break;
              }
            }
          }
          console.log(this.questionIndex + " Zapping current " + zapnext);
        }
      }
    },

    prev: function() {
      if (this.quiz.questions.length > 0) {
        let zapnext = true;
        while (zapnext) {
          this.questionIndex--;
          if (
            typeof this.quiz.questions[this.questionIndex].isvisible ===
            "undefined"
          ) {
            zapnext = false;
          } else {
            for (let i = 0; i < this.questionIndex; i++) {
              if (typeof this.quiz.questions[i].selectedcode === "undefined") {
                continue;
              } else if (
                this.quiz.questions[this.questionIndex].isvisible(
                  this.quiz.questions[i].ID,
                  this.quiz.questions[i].selectedcode
                )
              ) {
                zapnext = false;
                break;
              }
            }
          }
          console.log(this.questionIndex + " Zapping current retour" + zapnext);
        }
      }
    },
    // Return "true" count in userResponses
    score: function() {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].responses[this.userResponses[i]] !==
            "undefined" &&
          this.quiz.questions[i].responses[this.userResponses[i]].correct
        ) {
          score = score + 1;
        }
      }
      return score;

      //return this.userResponses.filter(function(val) { return val }).length;
    }
  }
};
</script>

<style scoped>
.questionBox .questionContainer .optionContainer .option {
  border-radius: 290486px;
  padding: 9px 18px;
  margin: 0 18px;
  margin-bottom: 12px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.85);
  border: transparent 1px solid;
}
.questionBox .questionContainer .optionContainer .option.is-selected {
  border-color: rgba(18, 207, 97, 0.25);
  background-color: rgba(4, 223, 95, 0.25);
}
.questionBox .questionContainer .optionContainer .option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.questionBox .questionContainer .optionContainer .option:active {
  -webkit-transform: scaleX(0.9);
  transform: scaleX(0.9);
}
</style>