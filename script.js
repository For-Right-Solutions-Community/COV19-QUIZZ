var quiz = {
  user: "Dave",
  questions: [
  {
    text: " : الرجاء قم بإدخال المعطيات االتالية",
    responses: [
    { text: "Oui" , correct: true },
   
    { text: "Non" }],
    formulaires: [
      { label: "Nom" , type: "text" , reponse:""},
     
      { label: "Prenom", type: "text" , reponse:""}] },


  {
    text: "هل تعاني من مرض السكري ؟",
    responses: [
    { text: "نعم", correct: true },
    { text: " لا "}] },
  {
      text: " هل تعاني من ضغط الدم ؟",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: "  هل تعاني من  أمراض القلب ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: " هل تعاني من ضيق تنفس مزمن ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: "هل تعاني من  أمراض الكلى ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: "هل أصبت بمرض السرطان أو تتبع   علاجا  بشأنه ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: "هل أصبت بمرض السرطان أو تتبع   علاجا  بشأنه ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },
    {
      text: " هل تعاني من أحد أمراض ضعف المانعة ؟ ",
      responses: [
        { text: "نعم", correct: true },
        { text: " لا " }]
    },    
    {
      text: "من يقوم بتعمير هذه الاستمارة ؟ ",
      responses: [
        { text: " المريض", correct: true },
        { text: "شخص آخر" }]
    },  

    {
    text: "لماذا يقوم شخص آخر بملأ الإستمارة ؟ ",
    responses: [
      { text: " المريض لا يعرف التعامل مع التطبيقة ", correct: true },
      { text: "حالة المريض  الصحية لا تسمح جراء فقدانه الوعي أو ضيق تنفس حاد" }]
    },  
    {
      text: "هل سافرت خارج البلاد خلال الشهر الفارط ؟ ",
    responses: [
      { text: " نعم ", correct: true },
      { text: " لا  " }]
    },  
    {
      text: " هل كان لك اتصال مباشر بشخص سافر خارج البلاد الشهر الفارط ؟ ",
    responses: [
      { text: " نعم ", correct: true },
      { text: " لا  " }]
    },  
    {
      text: "هل يسكن معك في نفس المنزل ؟",
    responses: [
      { text: " نعم ", correct: true },
      { text: " لا  " }]
    },  
    {
    text: " هل خضعت أنت او الشخص المذكور لتحليل الاصابة بفيروس كورونا ؟",
    responses: [
      { text: " نعم ", correct: true },
      { text: " لا  " }]
    },
    {
      text: "ماهي نتيجة التحليل ؟",
      responses: [
        { text: "  مصاب ", correct: true },
        { text: "غير مصاب" }]
    },

    {
      text: " هل تشكو من ارتفاع في درجة حرارتك (حمى) ؟ ",
      responses: [
        { text: " نعم ", correct: true },
        { text: " لا  " }]
    }, 
    {
      text: " هل لديك سعال او ان درجة السعال التي تشكو منها في العادة ازدادت حدة ؟ ",
      responses: [
        { text: " نعم ", correct: true },
        { text: " لا  " }]
    }, 
    {
      text: " هل تشكو من عدم القدرة على الحديث كما في السابق ؟ ",
      responses: [
        { text: " نعم ", correct: true },
        { text: " لا  " }]
    }, 
    {
      text: " لماذا ؟ ",
      responses: [
        { text: " احس بضيق في التنفس ", correct: true },
        { text: "احس بتعب شديد ", correct: true },
        { text: "صداع شديد يمنعني من الحديث" },
        { text: " أسباب أخرى " }]
    }, 
    {
      text: "هل تستطيع الحركة و القيام بحاجياتك دون مساعدة ؟",
      responses: [
        { text: " نعم ", correct: true },
        { text: " لا  " }]
    }, 
    {
      text: "هل تستطيع الحركة و القيام بحاجياتك دون مساعدة ؟",
      responses: [
        { text: " نعم ", correct: true },
        { text: " لا  " }]
    }, 
    {
      text: " منذ متى ؟",
      responses: [
        { text: " ايام ", correct: true },
        { text: "اسابيع ", correct: true },
        { text: "اشهر " },
        { text: "سنوات " }]
    }, 
  {
    text: "Q23 :Quel est votre code postal ? Cette information nous permet de réaliser un suivi épidémiologique",
    responses: [
    { text: "Browsers " },
    { text: "Search Engines", correct: true },
    { text: "News Group" },
    { text: "None of the above" }] }] },




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
      //console.log(this.userResponses);
    },
    next: function () {
      if (this.questionIndex < this.quiz.questions.length)
      this.questionIndex++;
    },

    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
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