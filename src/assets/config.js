import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = `Bearer`;

export const API_PATH="http://coronna.frsdev.ovh:8081/";
const LOGIN_URL = "/v2/register";
const SIGNUP_URL = "/m/user/create";
const ADD_PATIEN_URL = "/m/patient/create";
const UPDATE_PATIEN_URL = "/m/patient/";
const FETCH_PATIENT_URL = "/m/patient/";
const ADD_SYMPTOM_URL = "/m/symptom/create";
const axiosapi = axios.create({
    baseURL: API_PATH,
    timeout: 50000,
    headers: {'Authorization': 'Bearer '}
  });
export default Object.assign( {   
        user: {
            username:'',
            password:''
        }, 
        signeduser:{},
     registeruser : function(mail,password){
       console.log("Hello"+mail+password);
     },
     createToken: function(callback) {
         let self =this;
         console.log(this.user);
        axiosapi.post(LOGIN_URL,this.user).then((response) => {
            console.log("Token created");
            localStorage.setItem('samu_token', response.data.token);
            self.signeduser = response.data.details;
            if(callback!=null) callback(response.data.token,response.data.details);            
        })
        .catch ( (error) =>  {
            console.log("Token creation error");
            console.error(error)
            self.signeduser = null;
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
    },
    createpatient: function(patient,callback)  {
        axiosapi.
        axiosapi.post(ADD_PATIEN_URL,patient,this.getHeaderConfig()).then((reponse) => {
            //on succes on cree un token
            callback(reponse.data);
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    updatepatient: function(patient,callback)  {
        axiosapi.put(UPDATE_PATIEN_URL+patient.id,patient,this.getHeaderConfig()).then(() => {
            //on succes on cree un token
            callback();
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    createsymptom: function(symp,callback)  {
        axiosapi.post(ADD_SYMPTOM_URL,symp,this.getHeaderConfig()).then(() => {
            //on succes on cree un token
            callback();
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    fetchpatients: function(callback)  {
        console.log("Header Config");
        console.log(this.getHeaderConfig());
        axiosapi.get(FETCH_PATIENT_URL,this.getHeaderConfig()).then((reponse) => {
            //on succes on cree un token
          //  console.log(reponse);
            console.log(reponse.data);
           callback(reponse.data);
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    getHeaderConfig(){
        var config = {
            headers: {'Authorization': "Bearer " + localStorage.getItem('samu_token')}
       };    
       return config;
    }




} )