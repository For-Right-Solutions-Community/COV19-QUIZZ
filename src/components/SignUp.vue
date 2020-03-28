<template>
    <div id="SignUp">
        <div>Votre Email               <input type="email" v-model="email" /> </div>
        <div>Votre passowrd            <input type="password" v-model="password1" /></div>
        <div> Confirmer votre password  <input type="password" v-model="password2" /></div>
    </div>
</template>
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
 <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script> 
<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-analytics.js"></script>
<script>
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
            self.signupmailerrormsg = "Password don't match";
            }
            else
            {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password1).catch(function(error) {
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
    }
    
}
</script>