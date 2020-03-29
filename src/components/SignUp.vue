<template>

 <div class="container" id="SignUp">
      <div class="columns grid-xs">
              <div class="column col-mx-auto col-4 col-xs-10 col-xl-4   col-l-5 col-md-8">
                  <h1>  Créer un compte dans AMU 190     </h1>
                  <div class="form-group">
                    <label class="form-label" for="email">Votre Email </label>
                    <input class="form-input" id="email" type="text" placeholder="Email" @keyup="signinrror = false " v-model="email">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="password1">Votre mot de passe</label>
                    <input class="form-input" id="password1" type="password" placeholder="Password" @keyup="signinrror = false " v-model="password1">
                    <label class="form-label" for="password2">Confirmer votre mot de passe</label>
                    <input class="form-input" id="password2" type="password" placeholder="Password" @keyup="signinrror = false " v-model="password2">
                    <span v-show="signuperror" class="label label-warning">Login ou mot de passe invalide</span>
                    <span class="label secondary label"><p>Définir  un mot de passe pour votre compte amu190.
                        Le mot de passe doit être au minumum de 6 charactères qui contiennent au minumum un chiffre et une lettre en majuscule.</p></span>
                   

                  </div>
                  
                  <div class="form-group">
                    <button @click="signup()" class="btn btn-primary">Enregistrer</button>
                    <button  @click="exit()" class="btn btn-link ">Quitter </button>
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
 import {ServicesApi}  from '../assets/config'
export default {
    name : "SignUp",
    data () {
        return{
            email : '',
            password1:'',
            password2:'',
            signuperror : false,
            signupmailerrormsg:''

        }
    },
    methods :{
        signup : function()
        {
            let self =this;
            self.signuperror = false;
            self.signupmailerrormsg = '';
            if(this.password1 != this.password2)
            {
            self.signuperror = true;
            self.signupmailerrormsg = "Les mots de passes ne sont pas identiques";
            }
            else
            {
                self.password1 = this.password1;
                self.email= this.email;                
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password1).then(function(reponse){
                ServicesApi.createuser(self.email,self.password1);
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            self.signuperror = true;
            self.signupmailerrormsg = errorCode + errorMessage;
            // ...
            });
            }

        },
        succeslogin : function (token){
            if(token!==null)
            {
                localStorage.setItem("tokenid",token);
                this.$router.push('quizz') ;        
            }
        },
        faillogin : function() {
            localStorage.removeItem("tokenid")
        }
        ,
        exit : function() {
            this.$router.push('login') ;  
        }
    }
    
}
</script>