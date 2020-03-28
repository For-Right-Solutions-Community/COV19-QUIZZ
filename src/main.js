import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Quizz from './components/Quizz.vue';
import Rating from './components/Rating.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';
Vue.config.productionTip = false
Vue.use(VueRouter);
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Profile },
  { path: '/login', component: Login },
  { path: '/quizz', component: Quizz },
  { path: '/rating', component: Rating },
  
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: "history",
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
