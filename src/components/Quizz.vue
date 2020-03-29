<template >
  <section class="container">
    <div class="columns grid-xs">
      <div class="column col-mx-auto col-4 col-xs-12 col-xl-4 col-l-5 col-md-8">
        <div class="questionBox" id="quizz">
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title column">
                <h1 class="title is-6 columns col-mx-auto">Fiche de Symptômes</h1>
              </div>
            </div>
            <div class="panel-nav">
              <!-- navigation components: tabs, breadcrumbs or pagination -->
            </div>
            <div class="panel-body">
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
                <h2
                  class="titleContainer title label label-rounded label-primary"
                >{{ quiz.questions[questionIndex].text }}</h2>

                <!-- quizOptions -->
                <div class="optionContainer" align="right">
                  <template v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='ONECHOICE'">
                    <div
                      class="option"
                      v-for="(response, index) in quiz.questions[questionIndex].responses"
                      @click="selectOption(index)"
                      :class="{ 'is-selected': userResponses[questionIndex] == index}"
                      :key="index"
                    >{{ response.text }}</div>
                  </template>

                  <div v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='FORMULAIRE'">
                    <div
                      class="option"
                      v-for="(formulaire, index) in quiz.questions[questionIndex].formulaires"
                      :key="index"
                    >
                      <input type="text" :placeholder="formulaire.label" :value=" quiz.user " />
                    </div>
                  </div>

                  <div v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='MULTIPLECHOICES'">
                    <div
                      v-for="(response, index) in quiz.questions[questionIndex].responses"
                      :key="index"
                    >
                      {{ response.text }}
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

                <!--resultTitleBlock-->
                <h2 class="title">Best Score</h2>
                <!--<p class="subtitle">
					Total score: {{ score() }} / {{ quiz.questions.length }}
                </p>-->
                <br />
                <a class="button" @click="restart()">
                  restart
                  <i class="fa fa-refresh"></i>
                </a>
                <!--/resultTitleBlock-->
              </div>
            </div>
            <div class="container">
              <header class="navbar">
                <section class="navbar-section">
                  <button v-on:click="prev();" :disabled="questionIndex < 1" class="btn btn-primary">
                    Précedent
                    <i class="icon icon-arrow-left"></i>
                  </button>
                </section>
                <section class="navbar-center">
                  <!-- centered logo or brand -->
                </section>
                <section class="navbar-section">
                  <button :class="(userResponses[questionIndex]==null)?'':'is-active'"
                    v-on:click="next();"
                    :disabled="questionIndex>=quiz.questions.length || userResponses[questionIndex]==null " class="btn btn-primary">
                    Suivant
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
export default {
  name: "Quizz",
  data() {
    return {
      message: "hello",
      quiz: quizz,
      questionIndex: 0,
      userResponses: userResponseSkelaton,
      isActive: false
    };
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },

  methods: {
    restart: function() {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function(index) {
      Vue.set(this.userResponses, this.questionIndex, index);
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
      }
    },
    next: function() {
      if (this.questionIndex < this.quiz.questions.length) {
        let zapnext = true;
        while (zapnext) {
          this.questionIndex++;
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
var quizz = {
    user: "Dave",
    questions: [
      {
        ID: "ASPHEXIE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تشكو من عدم القدرة على الحديث كما في السابق ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
      },
      {
        ID: "ASPHEXIE_CAUSE",
        QUIZZ_TYPE: "MULTIPLECHOICES",
        text: " لماذا ؟ ",
        responses: [
          { text: " احس بضيق في التنفس ", code: "1", selected: false },
          { text: "احس بتعب شديد ", code: "2", selected: false },
          { text: "صداع شديد يمنعني من الحديث", code: "3", selected: false },
          { text: " أسباب أخرى ", code: "4", selected: false }
        ],
        isvisible: function(id, code) {
          return id == "ASPHEXIE" && code == "YES" ? true : false;
        }
      },
      {
        ID: "USER",
        text: "من يقوم بتعمير هذه الاستمارة ؟ ",
        QUIZZ_TYPE: "ONECHOICE",
        responses: [
          { text: " المريض", correct: true, code: "YES" },
          { text: "شخص آخر", code: "NO" }
        ]
      },
      {
        ID: "USERCAUSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "لماذا يقوم شخص آخر بملأ الإستمارة ؟ ",
        responses: [
          { text: " المريض لا يعرف التعامل مع التطبيقة ", correct: true },
          {
            text:
              "حالة المريض  الصحية لا تسمح جراء فقدانه الوعي أو ضيق تنفس حاد"
          }
        ],
        isvisible: function(id, code) {
          return id == "USER" && code == "NO" ? true : false;
        }
      },
      {
        ID: "FORMULAIRE",
        QUIZZ_TYPE: "FORMULAIRE",
        text: " : الرجاء قم بإدخال المعطيات االتالية",
        responses: [{ text: "Oui", correct: true }, { text: "Non" }],
        formulaires: [
          { label: "Nom", type: "text", reponse: "" },
          { label: "Prenom", type: "text", reponse: "" }
        ]
      },
      {
        ID: "DIABETE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل تعاني من مرض السكري ؟",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        text: " هل تعاني من ضغط الدم ؟",
        QUIZZ_TYPE: "ONECHOICE",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "CARDIO",
        QUIZZ_TYPE: "ONECHOICE",
        text: "  هل تعاني من  أمراض القلب ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "ASME",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تعاني من ضيق تنفس مزمن ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "RENALE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل تعاني من  أمراض الكلى ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "CANCER",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل أصبت بمرض السرطان أو تتبع   علاجا  بشأنه ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "IMMUNITY",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تعاني من أحد أمراض ضعف المانعة ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ]
      },
      {
        ID: "VOYAGE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل سافرت خارج البلاد خلال الشهر الفارط ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
      },
      {
        ID: "EXPOSITION_VOYAGE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل كان لك اتصال مباشر بشخص سافر خارج البلاد الشهر الفارط ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        isvisible: function(id, code) {
          return id == "VOYAGE" && code == "NO" ? true : false;
        }
      },
      {
        ID: "EXPOSITION_HABITAT",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل يسكن معك في نفس المنزل ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        isvisible: function(id, code) {
          return id == "EXPOSITION_VOYAGE" && code == "YES" ? true : false;
        }
      },
      {
        ID: "EXPOSITION_ANALYSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل خضعت أنت او الشخص المذكور لتحليل الاصابة بفيروس كورونا ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        isvisible: function(id, code) {
          return id == "EXPOSITION_VOYAGE" && code == "YES" ? true : false;
        }
      },
      {
        ID: "EXPOSITION_RESULTAT_ANALYSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "ماهي نتيجة التحليل ؟",
        responses: [
          { text: "  مصاب ", correct: true, code: "YES" },
          { text: "غير مصاب", code: "NO" }
        ],
        isvisible: function(id, code) {
          return id == "EXPOSITION_ANALYSE" && code == "YES" ? true : false;
        }
      },

      {
        ID: "FIEVRE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تشكو من ارتفاع في درجة حرارتك (حمى) ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
      },
      {
        ID: "MAUX_GORGE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تشعر بألم حاد في الحنجرة ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
      },
      {
        ID: "TOUX",
        QUIZZ_TYPE: "ONECHOICE",
        text:
          " هل لديك سعال او ان درجة السعال التي تشكو منها في العادة ازدادت حدة ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  " }
        ]
      },
      {
        ID: "ABILYTY",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل تستطيع الحركة و القيام بحاجياتك دون مساعدة ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
      },
      {
        ID: "ABILYTY_DURATION",
        QUIZZ_TYPE: "ONECHOICE",
        text: " منذ متى ؟",
        responses: [
          { text: " ايام ", correct: true },
          { text: "اسابيع ", correct: true },
          { text: "اشهر " },
          { text: "سنوات " }
        ],
        isvisible: function(id, code) {
          return id == "ABILYTY" && code == "NO" ? true : false;
        }
      }
    ]
  },
  userResponseSkelaton = Array(quizz.questions.length).fill(null);
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
  border-color: rgba(0, 0, 0, 0.25);
  background-color: white;
}
.questionBox .questionContainer .optionContainer .option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.questionBox .questionContainer .optionContainer .option:active {
  -webkit-transform: scaleX(0.9);
  transform: scaleX(0.9);
}
</style>