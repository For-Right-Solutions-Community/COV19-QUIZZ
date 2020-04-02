<template>
  <div class="container" id="Login">
      <div class="columns grid-xs">
              <div class="column col-mx-auto col-4 col-xs-10 col-xl-4   col-l-5 col-md-8">
                  <h1>  AMU 190     </h1>
                  <div class="form-group">
                    <label class="form-label" for="email">Email</label>
                    <input class="form-input" id="email" type="text" placeholder="Email" @keyup="signinrror = false " v-model="email">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="password">Mot de passe</label>
                    <input class="form-input" id="password" type="password" placeholder="Password" @keyup="signinrror = false " v-model="password">
                    <span v-show="signinrror" class="label label-warning">Login ou mot de passe invalide</span>
                  </div>
                  <div class="form-group">
                    <label class="form-checkbox">
                      <input type="checkbox"><i class="form-icon"></i> Se rappeler de moi
                    </label>
                  </div>
                  <div class="form-group">
                    <button @click="signin()" class="btn btn-primary">Connexion</button>
                    <button  @click="signup()" class="btn btn-link ">Créer un compte </button>
                  </div>
                  <div class="g-signin2" data-onsuccess="onSignIn">  </div>
              </div>
            </div>
    
  </div>
</template>
  
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-auth.js" ></script>
<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-firestore.js" ></script>
<script>
 
 import axios from 'axios';
 import config  from '../assets/config';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDKM4ptIcoS9ZpHeqpuCNFnMa0w3z3N-4E",
    authDomain: "health-care-app-90ad5.firebaseapp.com",
    databaseURL: "https://health-care-app-90ad5.firebaseio.com",
    projectId: "health-care-app-90ad5",
    storageBucket: "health-care-app-90ad5.appspot.com",
    messagingSenderId: "800870054376",
    appId: "1:800870054376:web:1be231f28411a026d0cc5d",
    measurementId: "G-RTQDG9V7SW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default {
    name : "Login",
    data () {
        return{
            email : '',
            password:'',
            signinrror : false,
            signinmsgerror:''

        }
    },
    methods :{
        signup : function()
        {
            this.$router.push('signup') ;      
        },
        signin : function ()
        {
            let self =this;
            self.signinrror = false;
            self.signinmsgerror = '';
            console.log (this.email);
             console.log (this.password);
              try {
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (){
                        if(!self.signinrror)
                        {
                           console.log("No error");
                          config.user.username = self.email;
                          config.user.password = self.password;                          
                          config.createToken(function(token){
                          self.succeslogin(token);
                          })                          
                        }
                    }).catch(function(error) {                      
                          console.log("errur found" + error);
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        self.signinrror = true;
                        self.signinmsgerror = errorCode + errorMessage;
                          self.faillogin();
                      
                    })

              }
              catch(error)
              {
                console.log("ereur "+error);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                     self.signinrror = true;
                     self.signinmsgerror = errorCode + errorMessage;
              }

        },
        succeslogin : function (token){
            if(token!==null)
            {
                localStorage.setItem("tokenid",token);
                this.$router.push('home') ;        
            }
        },
        faillogin : function() {
            localStorage.removeItem("tokenid")
        }
    }
    
}
</script>