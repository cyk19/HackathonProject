import Vue from 'vue'
import App from './App.vue'

import  Home  from  './Home.vue';
import  Why  from  './Why.vue';
import Register from './Register.vue';
import AddVenue from './AddVenue.vue';

import Details from './Details.vue';

import MyVenue from './MyVenues.vue';

import EditVenue from './EditVenue.vue';


import EditUser from './EditUser.vue';

import AddReview from './AddReview.vue';

import User from './User.vue'


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
  {
    path: "/venues/:venueId",
    name: "Details",
    component: Details
  },
  {

    path :  "/register",
    name : "Register",
    component :  Register

  },
  {

    path :  "/addvenues",
    name : "AddVenue",
    component :  AddVenue

  },
  {

    path :  "/myvenues",
    name : "MyVenues",
    component :  MyVenue

  },
  {

    path :  "/editvenue/:venueId",
    name : "EditVenue",
    component :  EditVenue

  },
  {

    path :  "/users/:userId",
    name : "User",
    component :  User

  },
  {

    path :  "/users/edituser",
    name : "EditUser",
    component :  EditUser

  },

  {

    path :  "/venues/:venueId/reviews",
    name : "AddReview",
    component :  AddReview

  },








];

const router = new VueRouter({
    routes : routes,
    mode :  'history'
});


Vue.mixin({
  methods: {
    $login: function (username, password) {
      return this.$http.post('http://127.0.0.1:4941/api/v1/users/login',
        JSON.stringify({"username": username, "password": password}))
        .then(function (response) {
          this.$postLogin(response);
        }).catch(function (error) {
          console.log(error);
          if (error.status == 400) {
            alert("Incorrect username or password.");
          } else {
            alert("Error: " + error.status);
          }
        });
    },

    $postLogin: function(response) {
      alert("Logged in successfully");
      localStorage.setItem("token", response.data.token);
      console.log("hahah", localStorage.getItem("token"))//store token
      localStorage.setItem("userId", response.data.userId); //store id




    },

    // $goToAnotherPage: function (page) {
    //   console.log("going");
    //   console.log(page);
    //   this.$router.push(basePath + page);
    // },

    $getToken: function () {
      return localStorage.getItem("token");
    },

    $getPassword: function () {
      return localStorage.getItem("password");
    },

    $getUserId: function () {
      return localStorage.getItem("userId");
    },



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
