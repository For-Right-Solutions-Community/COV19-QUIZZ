<template>
  <div class="container" id="SignUp">
    <div class="columns grid-xs">
      <div class="column col-mx-auto col-4 col-xs-10 col-xl-4 col-l-5 col-md-8">
        <h1>Créer un compte dans AMU 190</h1>
        <div class="form-group">
          <label class="form-label" for="email">Votre Email</label>
          <input
            class="form-input"
            id="email"
            type="text"
            placeholder="Email"
            @keyup="signinrror = false "
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password1">Votre mot de passe</label>
          <input
            class="form-input"
            id="password1"
            type="password"
            placeholder="Password"
            @keyup="signinrror = false "
            v-model="password1"
          />
          <label class="form-label" for="password2">Confirmer votre mot de passe</label>
          <input
            class="form-input"
            id="password2"
            type="password"
            placeholder="Password"
            @keyup="signinrror = false "
            v-model="password2"
          />
          <span v-show="signuperror" class="label label-warning">{{ signupmailerrormsg }}</span>
          <span class="label secondary label">
            <p>
              Définir un mot de passe pour votre compte amu190.
              Le mot de passe doit être au minumum de 6 charactères.
            </p>
          </span>
        </div>

        <div class="form-group">
          <button @click="signup()" :class="{loading:loading}" class="btn btn-primary">Enregistrer</button>
          <button @click="exit()" class="btn btn-link">Quitter</button>
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
      signuperror: false,
      signupmailerrormsg: "",
      loading: false
    };
  },
  methods: {
    signup: function() {
      let self = this;
      self.signuperror = false;
      self.loading = true;
      self.signupmailerrormsg = "";
      if (this.password1 != this.password2) {
        self.signuperror = true;
        self.signupmailerrormsg = "Les mots de passes ne sont pas identiques";
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
                self.signupmailerrormsg = "Service indisponible essayer plus tard";
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
            self.signupmailerrormsg = "Problème de connexion";
            if (error.code == "auth/email-already-in-use") {
              self.signupmailerrormsg = "Le mail est déja utilisé";
            } else if (error.code == "auth/weak-password") {
              self.signupmailerrormsg =
                "Votre mot de passe est faible , il faut 6 charactères au minumum";
            } else if (error.code == "auth/invalid-email") {
              self.signupmailerrormsg = "Votre mail est non valide";
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