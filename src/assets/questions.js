var  questions = {
    user: "",
    questions: [    
      {
        ID: "VOYAGE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل سافرت خارج البلاد خلال الشهر الفارط ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
        ,
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.traveler = true
           else reponse.traveler = false;
        }

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
        },
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.contactWithTraveler = true
           else reponse.contactWithTraveler = false;
        }
      },
      {
        ID: "EXPOSITION_HABITAT",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل يسكن معك في نفس المنزل ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" },
        ],
        isvisible: function(id, code) {
          return id == "EXPOSITION_VOYAGE" && code == "YES" ? true : false;
        },
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.sameHomePersonReturningFromTrip = true
           else reponse.sameHomePersonReturningFromTrip = false;
        }
      },
      {
        ID: "EXPOSITION_ANALYSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل خضع الشخص المذكور لتحليل الكورونا ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        isvisible: function(id, code) {
          return  (id == "EXPOSITION_VOYAGE")&& code == "YES" ? true : false;
        },
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.Travellerhasmakingtest = true
           else reponse.Travellerhasmakingtest = false;
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
        },
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.contactedTravellerTestResult = true
           else reponse.contactedTravellerTestResult = false;
        }
      },
      {
        ID: "COVID_ANALYSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل خضعت  لتحليل الاصابة بفيروس كورونا ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.hasmakingtest = true
           else reponse.hasmakingtest = false;
        }
      },
      {
        ID: "COVID_RESULT",
        QUIZZ_TYPE: "ONECHOICE",
        text: "ماهي نتيجة التحليل ؟",
        responses: [
          { text: "  مصاب ", textf: "مصابة",correct: true, code: "YES" },
          { text: "غير مصاب",textf: "غير مصابة",  code: "NO" }
        ],
        isvisible: function(id, code) {
          return id == "COVID_ANALYSE" && code == "YES" ? true : false;
        },
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.TestResult = true
           else reponse.TestResult = false;
        }
      },
      {
        ID: "EPEDEMIC_LOCATION",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل كنت في احدى المناطق التي اعلنت عنها وزارة الصحة كبؤرة لانتشار المرض خلال الاسبوعين الفارطين",
        responses: [
          { text: "  نعم ", correct: true, code: "YES" },
          { text: "لا  ", code: "NO" }
        ],
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.withSuspiciousGroup = true
           else reponse.withSuspiciousGroup = false;
        }
      },
      {
        ID: "EPEDEMIC_PERSON",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل كان لك اتصال مباشر بمريض(ة) تاكدت اصابته(ا) بفيروس الكورونا خلال الاسبوعين الفارطين",
        responses: [
          { text: "  نعم ", correct: true, code: "YES" },
          { text: "لا  ", code: "NO" }
        ],
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.contactWithInfectedPerson = true
           else reponse.contactWithInfectedPerson = false;
        }
      },
      {
        ID: "EPEDEMIC_PEOPLE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل يوجد في محيطك الاجتماعي (العمل ،المنزل..)أشخاص يعانون نفس الاعراض حمى،سعال،ضيق تنفس, ضيق تنفس شديد",
        responses: [
          { text: "  نعم ", correct: true, code: "YES" },
          { text: "لا  ", code: "NO" }
        ],
        constructexposure: function (reponse){
          if(this.selectedcode=="YES") reponse.smallclusterinfected = true
           else reponse.smallclusterinfected = false;
        }
      },
      {
        ID: "FIEVRE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل تشكو من إرتفاع في درجة الحراة (حمى)",
        textf: "هل تشكين من إرتفاع في درجة الحراة (حمى)",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        constructsymptom: function (reponse){
          if(this.selectedcode=="YES") reponse.fever = true
           else reponse.fever = false;
        }
      },
      {
        ID: "DYPNSEA",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تشكو من ضيق تنفس أو تعكر في قدرتك على التنفس مقارنة بالسابق ؟ ",
        textf: " هل تشكين من ضيق تنفس أو تعكر في قدرتك على التنفس مقارنة بالسابق ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        constructsymptom: function (reponse){
          if(this.selectedcode=="YES") reponse.dyspnea = true
           else reponse.dyspnea = false;
        }
      },
      {
        ID: "SYMPTOMS_LIST",
        QUIZZ_TYPE: "MULTIPLECHOICES",
        text: "هل تشكو من أحد هذه الأعراض ؟ ",
        textf: "هل تشكين من أحد هذه الأعراض ؟",
        responses: [
          { text: "إسهال ", code: "0", selected: false },
          { text: "تقيؤ", code: "1", selected: false },
          { text: "أوجاع في الصدر", code: "2", selected: false },
          { text: "أوجاع اعلى البطن", code: "3", selected: false },
          { text: "ألم حاد في الحنجرة", code: "4", selected: false },
          { text: "أوجاع في المفاصل و العضلات ", code: "5", selected: false },
          { text: "لا أشكو من هذه الأعراض", code: "7", selected: false }
        ],
        constructsymptom: function (reponse){
          if(this.responses[0].selected) reponse.diarrhea = true;
          if(this.responses[1].selected) reponse.nauseaOrVomiting = true;
          if(this.responses[2].selected) reponse.chestPain = true;
          if(this.responses[3].selected) reponse.epigastralgia = true;
          if(this.responses[4].selected) reponse.soreThroat = true;
          if(this.responses[5].selected) reponse.arthalgia = true;
        }
      },
      {
        ID: "TOUX",
        QUIZZ_TYPE: "ONECHOICE",
        text:
          " هل لديك سعال أو أن درجة السعال التي تشكو منها في العادة إزدادت حدة ؟ ",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  " }
        ],
        constructsymptom: function (reponse){
          if(this.selectedcode=="YES") reponse.cough = true
           else reponse.cough = false;
        }
      },
      {
        ID: "SENSDISORDER",
        QUIZZ_TYPE: "ONECHOICE",
        text:" هل تشكو من تدهور قدرتك على الشم أو التذوق ؟",
        textf:" هل تشكين من تدهور قدرتك على الشم أو التذوق ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  " }
        ],
        constructsymptom: function (reponse){
          if(this.selectedcode=="YES") reponse.senseDisorder = true
           else reponse.senseDisorder = false;
        }
      },
      {
        ID: "ASPHEXIE",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تشكو من عدم القدرة على الحديث كما في السابق ؟",
        textf: "هل تشكين من عدم القدرة على الحديث كما في السابق ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ],
        constructsymptom: function (reponse){
          if(this.selectedcode=="YES") reponse.unableToSpeak = true
           else reponse.unableToSpeak = false;
        }
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
        },
        constructsymptom: function (reponse){
          if(this.responses[0].selected) reponse.severeDyspnea = true;
          if(this.responses[1].selected) reponse.chestPain = true;
          if(this.responses[2].selected) reponse.mauxtete = true;
        }
      },
      {
        ID: "ABILYTY",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تستطيع  الحركة و القيام بحاجياتك دون مساعدة ؟",
        textf: "هل تستطيعين  الحركة و القيام بحاجياتك دون مساعدة ؟",
        responses: [
          { text: " نعم ", correct: true, code: "YES" },
          { text: " لا  ", code: "NO" }
        ]
        ,
        constructpatient: function (reponse){
          if(this.selectedcode=="YES") reponse.missingability = true
           else reponse.missingability = false;
        }
      },
      {
        ID: "ABILYTY_DURATION",
        QUIZZ_TYPE: "ONECHOICE",
        text: " منذ متى ؟",
        responses: [
          { text: " ايام ", correct: true ,code:"DAYS"},
          { text: "اسابيع ", correct: true ,code:"WEEK"},
          { text: "اشهر " ,code:"MONTHS"},
          { text: "سنوات " ,code:"YEAR"}
        ],
        isvisible: function(id, code) {
          return id == "ABILYTY" && code == "NO" ? true : false;
        },
        constructpatient: function (reponse){
          if(this.selectedcode!=null)
          reponse.abilitytime = this.selectedcode;
        }
      },
      {
        ID: "DIABETE",
        QUIZZ_TYPE: "ONECHOICE",
        text:  "هل تعاني من مرض السكري ؟",
        textf: "هل تعانين من مرض السكري ؟",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.diabetic = true
           else reponse.diabetic=false;
        }
      },
      {
        text: " هل تعاني من ضغط الدم ؟",
        textf: "هل تعانين من ضغط الدم ؟",
        QUIZZ_TYPE: "ONECHOICE",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.hypertension = true
           else reponse.hypertension=false;
        }
      },
      {
        ID: "CARDIO",
        QUIZZ_TYPE: "ONECHOICE",
        text: "  هل تعاني من  أمراض القلب ؟ ",
        textf: "  هل تعانين من  أمراض القلب ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.heartDisease = true
           else reponse.heartDisease=false;
        }
      },
      {
        ID: "ASME",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تعاني من ضيق تنفس مزمن ؟ ",
        textf: "هل تعانين من ضيق تنفس مزمن ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.respiratory = true
           else reponse.respiratory=false;
        }
      },
      {
        ID: "RENALE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل تعاني من  أمراض الكلى ؟ ",
        textf: "هل تعانين من  أمراض الكلى ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.renalFailure = true
           else reponse.renalFailure=false;
        }
      },
      {
        ID: "CANCER",
        QUIZZ_TYPE: "ONECHOICE",
        text: "هل أصبت بمرض السرطان أو تتبع   علاجا  بشأنه ؟ ",
        textf: "هل أصبت بمرض السرطان أو تتبعين   علاجا  بشأنه ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.cancer = true
           else reponse.cancer=false;
        }
      },
      {
        ID: "IMMUNITY",
        QUIZZ_TYPE: "ONECHOICE",
        text: " هل تعاني من أحد أمراض ضعف المناعة ؟ ",
        textf: " هل تعانين من أحد أمراض ضعف المناعة ؟ ",
        responses: [
          { text: "نعم", correct: true, code: "YES" },
          { text: " لا ", code: "NO" }
        ],
        constructantecedent: function (reponse){
          if(this.selectedcode=="YES") reponse.immuneDisease = true
           else reponse.immuneDisease=false;
        }
      },
      {
        ID: "USER",
        text: "من يقوم بتعمير هذه الاستمارة ؟ ",
        QUIZZ_TYPE: "ONECHOICE",
        responses: [
          { text: " المريض ", textf: " المريضة",  correct: true, code: "YES" },
          { text: "شخص آخر", code: "NO" }
        ],
        constructpatient: function (reponse){
          if(this.selectedcode=="YES") reponse.forumlaother = true
           else reponse.forumlaother = false;
        }
      },
      {
        ID: "USERCAUSE",
        QUIZZ_TYPE: "ONECHOICE",
        text: "لماذا يقوم شخص آخر بملأ الإستمارة ؟ ",
        responses: [
          { text: "لا يعرف التعامل مع التطبيقة", textf:"لا  تعرف التعامل مع التطبيقة ", correct: true , code: "YES"},
          {
            text: " حالته  الصحية لا تسمح : فقدان وعي/ضيق تنفس حاد", textf:" حالتها الصحية لا تسمح : فقدان وعي/ضيق تنفس حاد"
            , code: "NO"
          }
        ],
        isvisible: function(id, code) {
          return id == "USER" && code == "NO" ? true : false;
        },
        constructpatient: function (reponse){
          if(this.selectedcode=="NO") reponse.gravestatuation = true
           else reponse.gravestatuation = false;
        }
      }
    ]
  }

  export default questions;