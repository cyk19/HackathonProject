<template>
  <div>


    <navbar></navbar>
    <b-container class="mt-4" align="center">

    <h1 class="title"> Edit user </h1>


    <b-form  @submit="saveUser">
      <img :src="getUserPhoto()" width="400" height="300">

      <b-card >








        <b-form-group horizontal label = "Given Name">
          <b-form-input  v-model="givenName" placeholder="Given name" inline></b-form-input>
        </b-form-group>
        <b-form-group horizontal label = "Family Name">
          <b-form-input v-model="familyName" placeholder="Family name" inline></b-form-input>
        </b-form-group>
        <b-form-group horizontal label = "Current Password">
          <b-form-input type="password" v-model="currentPassword" placeholder="Current password" ></b-form-input>
        </b-form-group>
        <b-form-group horizontal label = "New password">
          <b-form-input type="password" v-model="password" placeholder="New password" ></b-form-input>
        </b-form-group>


        Profile Photo:

        <input class="mt-3 ml-5 mr-5" type ='file' @change="onfilechanged">
        <b-button variant="warning" v-on:click="onUpload()">Change photo</b-button>




        <b-btn variant="info" type="submit" class="mt-3">Modify</b-btn>
      </b-card>
    </b-form>
    </b-container>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  export default {
    name: "EditUser",
    components: {Navbar},
    data() {
      return {
        givenName: null,
        familyName: null,
        user: {givenName: null, familyName: null, password: null},
        currentPassword: null,

        password: '',
        userId: null,
        token: null,
        selectedFile: null
      }
    },
    mounted: function () {
      this.token = this.$getToken();
      //this.userId = this.$getUserId()
      this.getUser();

    },
    methods: {

      getUser() {
        this.token = this.$getToken();
        console.log(this.token);
        this.userId = this.$getUserId()
        this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.userId, {headers: {'X-Authorization': this.token}})
          .then(function (response) {
            this.user = response.data;
            this.givenName = this.user.givenName;
            console.log("oioi", this.givenName);
            this.familyName = this.user.familyName;
            //this.password = this.user.password;
            //console.log("awgdai", this.user.password);
        this.currentPassword = localStorage.getItem("password");
        this.password = localStorage.getItem("password");


          }, function (error) {
            console.log(error);
            this.user = null;


          });
      },
      saveUser: function (e) {
        e.preventDefault();
        //this.token = this.$getToken();
        if (this.password !== this.currentPassword){
        this.$http.patch('http://127.0.0.1:4941/api/v1/users/' + this.userId,  JSON.stringify({

                  "password": this.password
         }, {headers: {'X-Authorization': this.token}}))
        }

        else {

          this.$http.patch('http://127.0.0.1:4941/api/v1/users/' + this.userId, JSON.stringify({
              "givenName": this.givenName,
              "familyName": this.familyName,
            }, {headers: {'X-Authorization': this.token}})
          ).then(function (response) {
            alert("Information updated");
            // this.$goToAnotherPage('/users/' + this.userId);
          }).catch(function (error) {
            console.log(error)
            alert(error.statusText);
          })
        }
      },
      getUserPhoto() {
        return "https://cdn.theatlantic.com/assets/media/img/mt/2019/03/AP_100412014498-2/lead_720_405.jpg?mod=1553091580"
        // return "http://127.0.0.1:4941/api/v1/users/" + this.userId + "/photo/"
      },
      onfilechanged: function(event) {
        this.selectedFile = event.target.files[0]
        console.log("hhhhhh", this.selectedFile);

      },
      onUpload() {
        var header = {};
        header["X-Authorization"] = this.token;
        header["Content-Type"] = "image/jpeg";
        this.$http.put('http://127.0.0.1:4941/api/v1/users/' + this.userId + '/photo', this.selectedFile, {headers: header})
          .then(function (response) {
            alert('success');
          }, function(error) {
        alert(error.statusText);



      });
    }
    }
  }
</script>

<style scoped>
</style>
