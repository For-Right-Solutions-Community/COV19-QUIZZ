<template>
  <div class="container grid-lg" id="SignUp">
    <div class="columns">
      <div class="column col-4 col-md-12">
          <img src="img/AMU190.png" alt="AMU 190 " class="img-responsive logo"/>
      </div>
      <div class="column col-8  col-md-12 padd20p">
      <div class="column col-8 col-md-12 col-mx-auto">
        <div v-if="!waitverificationcode">
           <h2>إنشاء حساب في AMU 190</h2>
        <div class="form-group">
          <label class="form-label" for="email">بريدك الإلكتروني</label>
          <input
            class="form-input"
            id="email"
            type="text"
            placeholder="بريدك الإلكتروني"
            @keyup="signinrror = false "
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password1">كلمة المرور</label>
          <input
            class="form-input"
            id="password1"
            type="password"
            placeholder="كلمة المرور"
            @keyup="signinrror = false "
            v-model="password1"
          />
          <label class="form-label" for="password2">اعادة كلمة المرور</label>
          <input
            class="form-input"
            id="password2"
            type="password"
            placeholder="اعادة كلمة المرور"
            @keyup="signinrror = false "
            v-model="password2"
          />
          <span v-show="signuperror" class="label label-warning">{{ signupmailerrormsg }}</span>
          <span class="label secondary label-new col-12">
            
              قم بتعيين كلمة مرور لحساب amu190 الخاص بك. <br>
              يجب أن تكون كلمة المرور 6 أحرف على الأقل.
            
          </span>
        </div>

        <div class="form-group">
          <button @click="subscribe()" :class="{loading:loading}" class="btn btn-primary col-12">ابدأ الآن</button>
          <button @click="login()" class="btn btn-link col-mx-auto btn-center">هل لديك حساب بالفعل؟ سجل دخول</button>
        </div>
        </div>        

         <div v-if="waitverificationcode">
             <h1>Valider votre compte AMU190</h1>
             <h4>Un mail est envoyé vers {{ email }}. Veuillez consulter votre boite email et inserer le code de vérifcation</h4>
             <label class="form-label" for="verficationcode">Entrer le code de validation </label>
            <input
            class="form-input"
            id="verficationcode"
            type="text"
            placeholder="Code de vérification"
            @keyup="verficationcodeerror = false "
            v-model="verficationcode"
            />
          <button @click="validate()" :class="{loading:loading}" class="btn btn-primary col-12">ابدأ الآن</button>
          <button @click="login()" class="btn btn-link col-mx-auto btn-center">هل لديك حساب بالفعل؟ سجل دخول</button>
         </div> 
         </div>
      </div>
    </div>
  </div>
</template>
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
 <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script> 
<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-analytics.js"></script>
<script>
import config from "../assets/config";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      verficationcode: "",
      waitverificationcode: false,
      verficationcodeerror: false,
      signuperror: false,
      signupmailerrormsg: "",
      loading: false
    };
  },
  methods: {
    login: function() {
      this.$router.push("login");
    },
    subscribe: function() {
      let self = this;
      self.signuperror = false;
      self.loading = true;
      self.waitverificationcode = false;
      self.signupmailerrormsg = "";
      if (this.password1 != this.password2 || (this.password1.length<6))  {
        self.signuperror = true;
        self.signupmailerrormsg = "كلمات المرور ليست هي نفسها";
        self.loading = false;
      }
      else if(this.password1.length<6)
      {
        self.signuperror = true;
        self.signupmailerrormsg = "كلمة مرور ضعيفة";
        self.loading = false;
      }
      else {
        self.password1 = this.password1;
        self.email = this.email;
        config.subscribeuser(self.email, self.password1, function(error) {
              if (error != null) {
                console.log(error);
                self.loading = false;
                self.signuperror = true;
                self.waitverificationcode = false;
                self.signupmailerrormsg = "حدث خطأ";
                
              }
              else{
                self.loading = false;
                self.waitverificationcode = true;               
              }
            });      
      }
    },
    validate: function() {
      let self = this;
      self.signuperror = false;
      self.loading = true;
      self.signupmailerrormsg = "";
      self.password1 = this.password1;
      self.email = this.email;
      self.verficationcode = this.verficationcode;
      config.createuser(self.email, self.password1,self.verficationcode, function(token,user, error) {
              if (error != null) {
                console.log(error);
                self.loading = false;
                self.signuperror = true;
                self.signupmailerrormsg = "الخدمة غير متاحة حاول لاحقًا";
                
              }
              else{
                self.loading = false;
                localStorage.setItem("tokenid", token);
                localStorage.setItem('user', JSON.stringify(user));
                if(user.patients.length==0)
                {
                  self.$router.push("addpatient");
                }
                else
                {
                  self.$router.push("home");
                }
              }
            });      
    },
    signup: function() {
      let self = this;
      self.signuperror = false;
      self.loading = true;
      self.signupmailerrormsg = "";
      if (this.password1 != this.password2) {
        self.signuperror = true;
        self.signupmailerrormsg = "كلمات المرور ليست هي نفسها";
        self.loading = false;
      } else {
        self.password1 = this.password1;
        self.email = this.email;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password1)
          .then(function(reponse) {
            config.createuser(self.email, self.password1, function(token,user, error) {
              if (error != null) {
                self.loading = false;
                self.signuperror = true;
                self.signupmailerrormsg = "الخدمة غير متاحة حاول لاحقًا";
              }
              else{
                self.loading = false;
                localStorage.setItem("tokenid", token);
                localStorage.setItem('user', JSON.stringify(user));
                if(user.patients.length==0)
                {
                  self.$router.push("addpatient");
                }
                else
                {
                  self.$router.push("home");
                }
              }
            });
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            self.signuperror = true;
            self.loading = false;
            self.signupmailerrormsg = "مشكلة اتصال";
            if (error.code == "auth/email-already-in-use") {
              self.signupmailerrormsg = "البريد الإلكتروني مستخدم بالفعل";
            } else if (error.code == "auth/weak-password") {
              self.signupmailerrormsg =
                "كلمة مرورك ضعيفة ، فأنت بحاجة إلى 6 أحرف على الأقل";
            } else if (error.code == "auth/invalid-email") {
              self.signupmailerrormsg = "بريدك الإلكتروني غير صالح";
            }
          });
      }
    },
    faillogin: function() {
      localStorage.removeItem("tokenid");
    },
    exit: function() {
      this.$router.push("login");
    }
  }
};
</script>

<style>
.logo {
  max-width:256px;
  height:auto;
  margin-top : 40%
}
p.label {
  font-weight: 700;
  padding-top : 35px;
  padding-bottom : 35px;
  padding-right : 20px;
  padding-left : 20px;
}
.form-checkbox .form-icon, .form-radio .form-icon {
  right : 0
}
.form-checkbox, .form-radio, .form-switch {
  padding-right : 25px
}
.label-new {padding : 8px ;margin-top:10px}
h2 {color : #ca3610;font-weight: 700;}
h6 {color : #ca3610}
.btn-center {text-align :center !important;margin-left:auto ;margin-right:auto;display: block;}
@media (max-width:960px){
.logo {
  margin-top : 10%;
  text-align :center !important;margin-left:auto ;margin-right:auto;display: block;
}
}
</style>