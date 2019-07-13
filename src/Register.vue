
<template>
  <div>
    <navbar></navbar>
    <b-container class="mt-4" align="left">



    <h1 class="ml-5"> Register </h1>




    <b-form inline @submit.prevent="register">

      <b-card  bg-variant="light" class="m-4 p-2">

        <b-form-group label="Name" class="mb-3">
          <b-form-input type="text" v-model="givenName" placeholder="Given name" inline></b-form-input>
          <b-form-input type="text" v-model="familyName" placeholder="Family name" inline></b-form-input>
        </b-form-group>


        <b-form-group horizontal label="Username" class="mb-3">
          <b-form-input type="text" v-model="username" inline required></b-form-input>
        </b-form-group>

        <b-form-group horizontal label="Email address" class="mb-3">
          <b-form-input v-model="email" type="email" inline required></b-form-input>
        </b-form-group>

        <b-form-group horizontal label="Password" class="mb-3">
          <b-form-input v-model="password" type="password" inline required></b-form-input>
        </b-form-group>

        <b-form-group horizontal label="Confirm Password" class="mb-3">
          <b-form-input v-model="confirmpassword" type="password" inline required></b-form-input>
        </b-form-group>

        <b-btn variant="info" type="submit">Register</b-btn>
      </b-card>
    </b-form>
    <router-link :to = "{ name: 'Home'}" > Back to Home </router-link>

    </b-container>
  </div>


</template>

<script>
  import Navbar from './Navbar.vue'
   let validator = require("email-validator");
  export default {
    name: "Register",
    components: {Navbar},
    data() {
      return {
        givenName: '',
        familyName: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        token: ''
      }
    },
    methods: {
      register() {
        if (!validator.validate(this.email)) {
          alert("That email is invalid.");
        } else {
          this.$http.post('http://127.0.0.1:4941/api/v1/users', JSON.stringify({
            "username": this.username,
            "givenName": this.givenName,
            "familyName": this.familyName,
            "email": this.email,
            "password": this.password,
            "confirmpassword": this.password
          }))
            .then(function (response) {
              // this.$http.post('http://127.0.0.1:4941/api/v1/users/login',JSON.stringify({
              //   "username": username,
              //   "password": password}))
               alert("Registration successful! ");
              this.$login(this.username, this.password).then(function () {
                this.$router.push({name: "Home"});
              });

            }, function (error) {
              if (this.password != this.confirmpassword) {
                alert('Password do not match')
              }

              if (error.status === 400) {
                alert("That username or email address is already taken.");
              } else {
                alert("Server error. Please try again later.");
              }
              console.log(error);
            });
        }

      },
      moveToVenues: function () {
        this.$router.push({name: "Venues"});

      },

      moveToHome: function () {
        this.$router.push({name: "Home"});
      },
      moveToRegister: function () {
        this.$router.push({name: "Register"})
      }

     }
  }
</script>

<style scoped>
</style>
