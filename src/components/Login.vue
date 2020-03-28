<template>
  <div id="Login">
    <h1>  Authetification     </h1>
    <input type="email" v-model="email" /><br>
    <input type="password" v-model="password" /><br>
    <button @click="signup()">  Sign Up </button><br>
    <button @click="signin()"> Sign IN </button><br>
    <div v-if="signinrror"> {{ signinmsgerror}} </div>
  </div>
</template>
  
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
 <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script> 
<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-analytics.js"></script>
<script>
 
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
                        self.succeslogin("mysecrettoken");
                        }
                    }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                     self.signinrror = true;
                     self.signinmsgerror = errorCode + errorMessage;
                      self.faillogin()
                    })

              }
              catch(error)
              {
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
                this.$router.push('quizz') ;        
            }
        },
        faillogin : function() {
            localStorage.removeItem("tokenid")
        }
    }
    
}
</script>