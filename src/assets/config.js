import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer`;

export default {   
        name : "ServicesApi",
        user: {
            username:'',
            password:''
        },
     login_url : "http://coronna.frsdev.ovh:8081/v2/register",
     sign_up_url : "http://coronna.frsdev.ovh:8081/user/create",
     
     registeruser : function(mail,password){
       console.log("Hello"+mail+password);
     },
     createToken: function() {
        console.log(this.login_url)
        axios.post(this.login_url,this.user).then((response) => {
            localStorage.setItem('samu_token', response.data.token);
            console.log(response.data.token)
            this.$router.push('/quizz');

        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    createuser : function(login,password) {
        this.user.password = password;
        this.user.username = login;
        console.log(this.sign_up_url)       
        axios.post(this.sign_up_url,this.user).then((response) => {
            localStorage.setItem('samu_token', response.data.token);
            console.log(response.data.token)
            this.$router.push('/quizz');

        })
        .catch ( (error) =>  {
            console.error(error)
        })
    }



} 