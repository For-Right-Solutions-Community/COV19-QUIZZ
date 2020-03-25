var quiz = {
  user: "Dave",
  questions: [

    {
      ID:"USER",  
      text: "من يقوم بتعمير هذه الاستمارة ؟ ",
      responses: [
        { text: " المريض", correct: true  , code: "YES"},
        { text: "شخص آخر" , code: "NO"}]
    },  
    {
    ID:"USERCAUSE",
    text: "لماذا يقوم شخص آخر بملأ الإستمارة ؟ ",
    responses: [
      { text: " المريض لا يعرف التعامل مع التطبيقة ", correct: true },
      { text: "حالة المريض  الصحية لا تسمح جراء فقدانه الوعي أو ضيق تنفس حاد" }],
      isvisible: function(id,code) { return id=="USER" && code=="NO" ? true:false}      
    },  
  {
    ID:"FORMULAIRE",
    text: " : الرجاء قم بإدخال المعطيات االتالية",
    responses: [
    { text: "Oui" , correct: true },
   
    { text: "Non" }],
    formulaires: [
      { label: "Nom" , type: "text" , reponse:""},     
      { label: "Prenom", type: "text" , reponse:""}] 
    },
  {
    ID:"DIABETE",
    text: "هل تعاني من مرض السكري ؟",
    responses: [
    { text: "نعم", correct: true , code: "YES"},
    { text: " لا " , code: "NO" }] },
  {
      text: " هل تعاني من ضغط الدم ؟",
      responses: [
        { text: "نعم", correct: true  , code: "YES"},
        { text: " لا ", code: "NO" }]
    },
    {
      ID:"CARDIO",
      text: "  هل تعاني من  أمراض القلب ؟ ",
      responses: [
        { text: "نعم", correct: true  , code: "YES"},
        { text: " لا " , code: "NO"}]
    },
    {
      ID:"ASME",
      text: " هل تعاني من ضيق تنفس مزمن ؟ ",
      responses: [
        { text: "نعم", correct: true , code: "YES" },
        { text: " لا " , code: "NO"}]
    },
    {
      ID:"RENALE",
      text: "هل تعاني من  أمراض الكلى ؟ ",
      responses: [
        { text: "نعم", correct: true  , code: "YES"},
        { text: " لا ", code: "NO" }]
    },
    {
      ID:"CANCER",
      text: "هل أصبت بمرض السرطان أو تتبع   علاجا  بشأنه ؟ ",
      responses: [
        { text: "نعم", correct: true  , code: "YES" },
        { text: " لا " , code: "NO"}]
    },
    {
      ID:"IMMUNITY",   
      text: " هل تعاني من أحد أمراض ضعف المانعة ؟ ",
      responses: [
        { text: "نعم", correct: true  , code: "YES" },
        { text: " لا " , code: "NO" }]
    },    
    {
      ID:"VOYAGE",
      text: "هل سافرت خارج البلاد خلال الشهر الفارط ؟ ",
    responses: [
      { text: " نعم ", correct: true  , code: "YES"},
      { text: " لا  " , code: "NO"}]
    },  
    {
      ID:"EXPOSITION_VOYAGE",
      text: " هل كان لك اتصال مباشر بشخص سافر خارج البلاد الشهر الفارط ؟ ",
    responses: [
      { text: " نعم ", correct: true  , code: "YES"},
      { text: " لا  " , code: "NO"}],
      isvisible: function(id,code) { return id=="VOYAGE" && code=="NO" ? true:false}
    },  
    {
      ID:"EXPOSITION_HABITAT",
      text: "هل يسكن معك في نفس المنزل ؟",
    responses: [
      { text: " نعم ", correct: true  , code: "YES"},
      { text: " لا  " , code: "NO"}],
      isvisible: function(id,code) { return id=="EXPOSITION_VOYAGE" && code=="YES" ? true:false}
    },  
    {
      ID:"EXPOSITION_ANALYSE",
    text: " هل خضعت أنت او الشخص المذكور لتحليل الاصابة بفيروس كورونا ؟",
    responses: [
      { text: " نعم ", correct: true  , code: "YES"},
      { text: " لا  " , code: "NO"}],
      isvisible: function(id,code) { return id=="EXPOSITION_VOYAGE" && code=="YES" ? true:false}
    },
    {
      ID:"EXPOSITION_RESULTAT_ANALYSE",
      text: "ماهي نتيجة التحليل ؟",
      responses: [
        { text: "  مصاب ", correct: true  , code: "YES"},
        { text: "غير مصاب" , code: "NO"}],
        isvisible: function(id,code) { return id=="EXPOSITION_ANALYSE" && code=="YES" ? true:false}
    },

    {
      ID:"FIEVRE",
      text: " هل تشكو من ارتفاع في درجة حرارتك (حمى) ؟ ",
      responses: [
        { text: " نعم ", correct: true  , code: "YES"},
        { text: " لا  " , code: "NO"}]
    }, 
    {
      ID:"MAUX_GORGE",
      text: " هل تشعر بألم حاد في الحنجرة ؟ ",
      responses: [
        { text: " نعم ", correct: true  , code: "YES"},
        { text: " لا  " , code: "NO"}]
    },     
    {
      ID:"TOUX",
      text: " هل لديك سعال او ان درجة السعال التي تشكو منها في العادة ازدادت حدة ؟ ",
      responses: [
        { text: " نعم ", correct: true  , code: "YES"},
        { text: " لا  " }]
    }, 
    {
      ID:"ASPHEXIE",
      text: " هل تشكو من عدم القدرة على الحديث كما في السابق ؟ ",
      responses: [
        { text: " نعم ", correct: true  , code: "YES" },
        { text: " لا  " , code: "NO"}]
    }, 
    {
      ID:"ASPHEXIE_CAUSE",
      text: " لماذا ؟ ",
      responses: [
        { text: " احس بضيق في التنفس ", correct: true },
        { text: "احس بتعب شديد ", correct: true },
        { text: "صداع شديد يمنعني من الحديث" },
        { text: " أسباب أخرى " }]
    }, 
    {
      ID:"ABILYTY",
      text: "هل تستطيع الحركة و القيام بحاجياتك دون مساعدة ؟",
      responses: [
        { text: " نعم ", correct: true  , code: "YES"},
        { text: " لا  " , code: "NO"}]
    }, 
    {
      ID:"ABILYTY_DURATION",
      text: " منذ متى ؟",
      responses: [
        { text: " ايام ", correct: true },
        { text: "اسابيع ", correct: true },
        { text: "اشهر " },
        { text: "سنوات " }],
      isvisible: function(id,code) { return id=="ABILYTY" && code=="NO" ? true:false}
    }
  
  ] },




userResponseSkelaton = Array(quiz.questions.length).fill(null);

var app = new Vue({
  el: "#app",
  data: {
    quiz: quiz,
    questionIndex: 0,
    userResponses: userResponseSkelaton,
    isActive: false },

  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    } },

  methods: {
    restart: function () {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function (index) {
      Vue.set(this.userResponses, this.questionIndex, index);
      if (!(this.quiz.questions[this.questionIndex].responses[index].code === 'undefined'))
      {
        let selectedcode = this.quiz.questions[this.questionIndex].responses[index].code;
        this.quiz.questions[this.questionIndex].selectedcode = selectedcode;
        console.log(this.quiz.questions[this.questionIndex].selectedcode);
      }

    },
    next: function () {
      if (this.questionIndex < this.quiz.questions.length)
      {
        let zapnext = true;
        while(zapnext)
        {
          this.questionIndex++;
          if (typeof this.quiz.questions[this.questionIndex].isvisible === 'undefined')
          {
            zapnext = false;
          }
          else
          {
            for (let i = 0; i <  this.questionIndex; i++)
            {
              if (typeof this.quiz.questions[i].selectedcode === 'undefined')
              {
                continue ;
              }
              else if (this.quiz.questions[this.questionIndex].isvisible(this.quiz.questions[i].ID,this.quiz.questions[i].selectedcode))
              {
                zapnext = false;
                break ;
              }
              else
              {

              }
            }
          }
          console.log(this.questionIndex+" Zapping current "+zapnext);
        }
      }
    },

    prev: function () {
      if (this.quiz.questions.length > 0)
      {

        let zapnext = true;
        while(zapnext)
        {
          this.questionIndex--;
          if (typeof this.quiz.questions[this.questionIndex].isvisible === 'undefined')
          {
            zapnext = false;
          }
          else
          {
            for (let i = 0; i <  this.questionIndex; i++)
            {
              if (typeof this.quiz.questions[i].selectedcode === 'undefined')
              {
                continue ;
              }
              else if (this.quiz.questions[this.questionIndex].isvisible(this.quiz.questions[i].ID,this.quiz.questions[i].selectedcode))
              {
                zapnext = false;
                break ;
              }
              else
              {

              }
            }
          }
          console.log(this.questionIndex+" Zapping current retour"+zapnext);
        }
      }
    },
    // Return "true" count in userResponses
    score: function () {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
        typeof this.quiz.questions[i].responses[
        this.userResponses[i]] !==
        "undefined" &&
        this.quiz.questions[i].responses[this.userResponses[i]].correct)
        {
          score = score + 1;
        }
      }
      return score;

      //return this.userResponses.filter(function(val) { return val }).length;
    } } });