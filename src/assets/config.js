import axios from 'axios';
//axios.defaults.headers.common['Authorization'] = `Bearer`;

export const API_PATH="https://api.amu190.maodao.xyz/";
//export const API_PATH="http://amu190.tn:8081/";


//export const API_PATH="http://localhost:8080/";
//export const API_PATH="http://192.168.1.14:8080/";
const LOGIN_URL = "/v2/register";
const SUBSCRIPE_URL =  "/m/account/subscribe";
const VALIDATE_URL =  "/m/account/validate";
const ADD_PATIEN_URL = "/m/patient/create";
const UPDATE_PATIEN_URL = "/m/patient/";
const FETCH_PATIENT_URL = "/m/patient/";
const ADD_SYMPTOM_URL = "/m/symptom/create";
const UPDATE_ANTECEDENT_URL = "/m/antecedent/";
const axiosapi = axios.create({
    baseURL: API_PATH,
    timeout: 60000,
    headers: {'Authorization': 'Bearer '}
  });
const longpollingtimeout = 60000 * 15;
const delay = ms => new Promise(res => setTimeout(res, ms));
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
    createuser : function(login,password,validationcode,callback) {
        this.user.password = password;
        this.user.username = login;
        this.user.date=new Date();
        let self  =this;   
        let account = { "user":this.user,"confirmationCode": validationcode};
        axiosapi.post(VALIDATE_URL,account).then(() => {
            //on succes on cree un token
            self.createToken(callback);
        })
        .catch ( (error) =>  {
            callback(null,null,error);
        })
    },
    subscribeuser : function(login,password,callback) {
        this.user.password = password;
        this.user.username = login;
        this.user.date=new Date();
        axiosapi.post(SUBSCRIPE_URL,this.user).then(() => {
            //on succes on cree un token
            callback();
        })
        .catch ( (error) =>  {
            callback(error);
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
    createsymptom: function(patientin,symp,callback)  {

        let patient = {"id":patientin.id};
        symp.patient = patient;//passer tous l objet user cree un probleme
        console.log(symp);
        axiosapi.post(ADD_SYMPTOM_URL,symp,this.getHeaderConfig())
        .then( ()=>{
            console.log("second call succes add antecedant");
            callback();})
        .catch ( (error) =>  {
            console.error(error.response);
            console.log(error);
            callback(error);
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
    createsymantecedentold: function(patientin,symp,antecendt,callback)  {
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
    createsymantecedent: async function(patientin,symp,antecendt,callback)  {
        let patient = {"id":patientin.id};
        symp.patient = patient;//passer tous l objet user cree un probleme
        antecendt.patient = patient;//passer tous l objet user cree un probleme
        console.log(symp);
        console.log(antecendt);
        try{
            await this.updateantecedent(antecendt);
            await this.updatepatientlight(patientin);
            await axiosapi.post(ADD_SYMPTOM_URL,symp,this.getHeaderConfig());
            console.log("second call succes add antecedant");
            callback();
        }
        catch(error){
                console.error(error.response);
                console.log(error);
                callback(error);
        } 
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
    },
    monitornews : async function( callback )
    {
        let counter=0;
        let errorcount = 0;
        while(counter<2)
        {
            try{
                console.log("Start monitring news ");
                var config = this.getHeaderConfig();
                config.timeout = longpollingtimeout;
                let reponse = await axiosapi.get('/m/events/async-deferredresult',config);
                console.log("News Captured");
                console.log(reponse.data);
                callback(reponse.data);
           }
           catch(error){
                   console.error(error.response);
                   console.log(error);
                   errorcount++;
                   if(errorcount>5)
                   {
                    errorcount =0;
                    await delay(60000); //wait one minute
                   }
                   else
                   {
                    await delay(1000); //wait one second 
                   }
           }
        }

    }



} )