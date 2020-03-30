import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = `Bearer`;

export const API_PATH="http://coronna.frsdev.ovh:8081/";
const LOGIN_URL = "v2/register";
const SIGNUP_URL = "user/create";

const axiosapi = axios.create({
    baseURL: API_PATH,
    timeout: 5000,
    headers: {'Authorization': 'Bearer'}
  });

export default Object.assign( {   
        user: {
            username:'',
            password:''
        }, 
     registeruser : function(mail,password){
       console.log("Hello"+mail+password);
     },
     createToken: function(callback) {
        axiosapi.post(LOGIN_URL,this.user).then((response) => {
            localStorage.setItem('samu_token', response.data.token);
            if(callback!=null) callback(response.data.token);            
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    createuser : function(login,password,callback) {
        this.user.password = password;
        this.user.username = login;
        let self  =this;   
        axiosapi.post(SIGNUP_URL,this.user).then(() => {
            //on succes on cree un token
            self.createToken(callback);
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    }



} )