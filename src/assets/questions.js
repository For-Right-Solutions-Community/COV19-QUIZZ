var  questions = {
    user: "",
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
  }

  export default questions;