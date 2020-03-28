<template >
<section class="container">

  <div class="questionBox" id="quizz">
    <!-- transition -->
    <transition
      :duration="{ enter: 100, leave: 100 }"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      mode="out-in"
    >
      <!--qusetionContainer-->
      <div
        class="questionContainer"
        v-if="questionIndex<quiz.questions.length"
        v-bind:key="questionIndex"
      >
        <header>
          <h1 class="title is-6">Test COVID19</h1>
          <!--progress-->
          <div class="progressContainer">
            <progress
              class="progress is-info is-small"
              :value="(questionIndex/quiz.questions.length)*100"
              max="100"
            >{{(quiz.questions.length)*100}}%</progress>
          </div>
          <!--/progress-->
        </header>

        <!-- questionTitle -->
        <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

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
            <div class="option" v-for="(formulaire, index) in quiz.questions[questionIndex].formulaires" :key="index">
              <input type="text" :placeholder="formulaire.label" :value=" quiz.user " />
            </div>
          </div>

          <div v-if="quiz.questions[questionIndex].QUIZZ_TYPE=='MULTIPLECHOICES'">
          <div v-for="(response, index) in quiz.questions[questionIndex].responses" :key="index">
            {{ response.text }}
            <input
              type="checkbox"
              @click="selectMulipleOption(index)"
              v-model="quiz.questions[questionIndex].responses[index].selected"
            />
          </div>
          </div>

        </div>

        <!--quizFooter: navigation and progress-->
        <footer class="questionFooter">
          <!--pagination-->
          <nav class="pagination" role="navigation" aria-label="pagination">
            <!-- back button -->
            <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">Retour</a>

            <!-- next button -->
            <a
              class="button"
              :class="(userResponses[questionIndex]==null)?'':'is-active'"
              v-on:click="next();"
              :disabled="questionIndex>=quiz.questions.length"
            >{{ (userResponses[questionIndex]==null)?'Enregister et Contiuner':'Suivant' }}</a>
          </nav>
          <!--/pagination-->
        </footer>
        <!--/quizFooter-->
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
        <h2 class="title"> Best Score </h2>
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
      <!--/quizCompetedResult-->
    </transition>

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

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  height: 100vh;
  background: #CFD8DC;
  /* mocking native UI */
  cursor: default !important;
  /* remove text selection cursor */
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  /* remove text selection */
  user-drag: none;
  /* disbale element dragging */
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
}

.button {
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}

.animated {
  -webkit-transition-duration: 0.15s;
          transition-duration: 0.15s;
}

.container {
  margin: 0 0.5rem;
}

.questionBox {
  max-width: 30rem;
  width: 30rem;
  min-height: 30rem;
  background: #FAFAFA;
  position: relative;
  display: -webkit-box;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.questionBox header {
  background: rgba(0, 0, 0, 0.025);
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.questionBox header h1 {
  font-weight: bold;
  margin-bottom: 1rem !important;
}
.questionBox header .progressContainer {
  width: 60%;
  margin: 0 auto;
}
.questionBox header .progressContainer > progress {
  margin: 0;
  border-radius: 5rem;
  overflow: hidden;
  border: none;
  color: #3D5AFE;
}
.questionBox header .progressContainer > progress::-moz-progress-bar {
  background: #3D5AFE;
}
.questionBox header .progressContainer > progress::-webkit-progress-value {
  background: #3D5AFE;
}
.questionBox header .progressContainer > p {
  margin: 0;
  margin-top: 0.5rem;
}
.questionBox .titleContainer {
  text-align: center;
  margin: 0 auto;
  padding: 1.5rem;
}
.questionBox .quizForm {
  display: block;
  white-space: normal;
  height: 100%;
  width: 100%;
}
.questionBox .quizForm .quizFormContainer {
  height: 100%;
  margin: 15px 18px;
}
.questionBox .quizForm .quizFormContainer .field-label {
  text-align: left;
  margin-bottom: 0.5rem;
}
.questionBox .quizCompleted {
  width: 100%;
  padding: 1rem;
  text-align: center;
}
.questionBox .quizCompleted > .icon {
  color: #FF5252;
  font-size: 5rem;
}
.questionBox .quizCompleted > .icon .is-active {
  color: #00E676;
}
.questionBox .questionContainer {
  white-space: normal;
  height: 100%;
  width: 100%;
}
.questionBox .questionContainer .optionContainer {
  margin-top: 12px;
  -webkit-box-flex: 1;
          flex-grow: 1;
}
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
.questionBox .questionContainer .questionFooter {
  background: rgba(0, 0, 0, 0.025);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  align-self: flex-end;
}
.questionBox .questionContainer .questionFooter .pagination {
  margin: 15px 25px;
}

.pagination {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
          justify-content: space-between;
}

.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.button:hover {
  cursor: pointer;
  background: #ECEFF1;
  border-color: rgba(0, 0, 0, 0.25);
}
.button.is-active {
  background: #3D5AFE;
  color: white;
  border-color: transparent;
}
.button.is-active:hover {
  background: #0a2ffe;
}

@media screen and (min-width: 769px) {
  .questionBox {
    -webkit-box-align: center;
            align-items: center;
    -webkit-box-pack: center;
            justify-content: center;
  }
  .questionBox .questionContainer {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
            flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>
