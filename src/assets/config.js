import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = `Bearer`;

//export const API_PATH="https://api.amu190.maodao.xyz/";
export const API_PATH="http://localhost:8080/";
const LOGIN_URL = "/v2/register";
const SIGNUP_URL = "/m/user/create";
const ADD_PATIEN_URL = "/m/patient/create";
const UPDATE_PATIEN_URL = "/m/patient/";
const FETCH_PATIENT_URL = "/m/patient/";
const ADD_SYMPTOM_URL = "/m/symptom/create";
const UPDATE_ANTECEDENT_URL = "/m/antecedent/";
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
            console.log(error.response);
            callback(null,null,error);
            self.signeduser = null;
        })
    },
    createuser : function(login,password,callback) {
        this.user.password = password;
        this.user.username = login;
        this.user.date=new Date();
        let self  =this;   
        axiosapi.post(SIGNUP_URL,this.user).then(() => {
            //on succes on cree un token
            self.createToken(callback);
        })
        .catch ( (error) =>  {
            callback(null,null,error);
        })
    },
    createpatient: function(patient,callback)  {
        patient.user = {"id": this.getuser().id};//passer tous l objet user cree un probleme
        console.log(patient);
        axiosapi.post(ADD_PATIEN_URL,patient,this.getHeaderConfig()).then((reponse) => {
            //on succes on cree un token
            callback(reponse.data);
        })
        .catch ( (error) =>  {
            console.error(error.response);
            console.error(error)
        })
    },
    updatepatient: function(patient,callback)  {
        patient.user = {"id": this.getuser().id};//passer tous l objet user cree un probleme
        
       // delete patient.user ;
        console.log(patient);
     //   patient.user = {"id": this.getuser().id};//passer tous l objet user cree un probleme
        axiosapi.put(UPDATE_PATIEN_URL+patient.id,patient,this.getHeaderConfig()).then(() => {
            //on succes on cree un token
            callback();
        })
        .catch ( (error) =>  {
            console.error(error.response);
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
    updateantecedent: function(antecendt){
        console.log("update antecedent");
        console.log(antecendt);
        return axiosapi.put(UPDATE_ANTECEDENT_URL+antecendt.id,antecendt,this.getHeaderConfig());
    },
    updatepatientlight: function(patient){
        console.log("update patient");
        console.log(patient);
        patient.user = {"id": this.getuser().id};//passer tous l objet user cree un probleme
        return axiosapi.put(UPDATE_PATIEN_URL+patient.id,patient,this.getHeaderConfig());
    },
    createsymantecedent: function(patientin,symp,antecendt,callback)  {
        let patient = {"id":patientin.id};
        symp.patient = patient;//passer tous l objet user cree un probleme
        antecendt.patient = patient;//passer tous l objet user cree un probleme
        console.log(symp);
        console.log(antecendt);
        axiosapi.post(ADD_SYMPTOM_URL,symp,this.getHeaderConfig())
        .then(this.updateantecedent(antecendt))
        .then(this.updatepatientlight(patientin))
        .then( ()=>{
            console.log("second call succes add antecedant");
            callback();})
        .catch ( (error) =>  {
            console.error(error.response);
            console.log(error);
            callback(error);
        })
    },
    fetchpatientsall: function(callback)  {
        let userid= this.getuser().id
        //passer tous l objet user cree un probleme
        axiosapi.get(FETCH_PATIENT_URL,this.getHeaderConfig()).then((reponse) => {
            //on succes on cree un token
          //  console.log(reponse);
            console.log(reponse.data);
           let patientslist  =  reponse.data.filter(function (e) {
                if(e.user==null)
                {
                    return false;
                }
                return e.user == userid || e.user.id == userid;
            });
           callback(patientslist);
        })
        .catch ( (error) =>  {
            console.error(error)
        })
    },
    fetchpatients: function(callback)  {
        let userid= this.getuser().id
        //passer tous l objet user cree un probleme
        axiosapi.get("/m/user/"+userid+"/patients",this.getHeaderConfig()).then((reponse) => {
            //on succes on cree un token
          //  console.log(reponse);
            console.log(reponse.data);
           let patientslist  =  reponse.data
           callback(patientslist);
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
    ,
    getuser(){
       let user = JSON.parse(localStorage.getItem("user"));
       console.log(user);
       return user;
    }



} )