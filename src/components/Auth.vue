<template>
    <div>
        <b-row align-h="center" style="margin:30px 0px">
            <b-col cols="6" offset="2">log with your credentials</b-col>
        </b-row>
        <b-form-group label-cols="4" label-cols-lg="2" label="Email: " label-for="input-default">
             <b-form-input id="input-default" v-model="user.username"></b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label="Password: " label-for="input-default">
             <b-form-input  type="password" id="input-default" v-model="user.password"></b-form-input>
        </b-form-group>
        <b-row align-h="around">
            <b-col cols="4"><b-button variant="danger" @click="cancel()">Cancel</b-button></b-col>
            <b-col cols="4"><b-button variant="primary" @click="submit()">Submit</b-button></b-col>
        </b-row>
        <b-row align-h="center" style="margin-top:50px">
            <b-col cols="6" offset="2">or use your google account</b-col>
        </b-row>
         <b-row align-h="center" style="margin-top:50px">
            <b-col cols="4" offset="3" ><div class="g-signin2 "   data-onsuccess="onSignIn"></div></b-col>
        </b-row>    
    </div>
</template>


<script>
import axios from 'axios';
import {login_url}  from '../assets/config'


export default {

    data(){
        return {
            user: {
                username:'',
                password:''
            },
            token: String
        }
    },
    methods: { 
       
        cancel(){
            this.user.username = ''
            this.user.password = ''
        },
        submit() {
            console.log(login_url)
            let AUTH_TOKEN = localStorage.getItem('samu_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
            axios.post(login_url,this.user).then((response) => {
                localStorage.setItem('samu_token', response.data.token);
                this.$router.push('/test');

            })
            .catch ( (error) =>  {
                console.error(error)
            })
        },
       
    }
}
</script>