<template>
<div id="Login">
                <h1>Log in</h1>
 <input type="email" :v-model="email"/> 
 <input type="password" :v-model="password"/> 
 <button> Sign With Google</button>
</div>    
</template>
<script>
export default {
    name : "Login",
    data () {
        return{
            email : '',
            password:''

        }
    }
}
</script>