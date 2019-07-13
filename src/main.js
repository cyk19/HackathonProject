import Vue from 'vue'
import App from './App.vue'

import  Home  from  './Home.vue';
import  Why  from  './Why.vue';



import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);



import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



// Vue.http.options.emulateJSON = true;

const routes = [
  {
    path :  "/",
    name : "Home",
    component :  Home
  },
  {
    path :  "/why",
    name : "Why",
    component :  Why
  },
 

];

const router = new VueRouter({
    routes : routes,
    mode :  'history'
});

$moveHome: function() {
    this.$router.push({name: "Home"});
}


  }
});




new Vue({
  el: '#app',
  router : router,
  render: h => h(App)
});
