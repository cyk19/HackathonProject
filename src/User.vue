<template>

    <div>
      <navbar></navbar>
      <b-container class="mt-4" align="center">
      <b-card
        no-body
        style="max-width: 20rem;"
        img-src="http://uprnc2thzbu47ptop2z7kxg1.wpengine.netdna-cdn.com/wp-content/uploads/2016/10/fall.jpg"
        img-alt="Image"
        img-top
      >
        <h4 slot="header">My Profile Information</h4>



        <b-list-group flush>
          <b-list-group-item>Username: {{user.username}}</b-list-group-item>
          <b-list-group-item>Given name: {{user.givenName}}</b-list-group-item>
          <b-list-group-item>Family name: {{user.familyName}}</b-list-group-item>
          <b-list-group-item>Email: {{user.email}}</b-list-group-item>
        </b-list-group>



        <b-card-img src="https://cdn.theatlantic.com/assets/media/img/mt/2019/03/AP_100412014498-2/lead_720_405.jpg?mod=1553091580" alt="Image" bottom></b-card-img>
      </b-card>

        <b-button class="mt-3" variant="info" v-on:click="moveToEdit()">Edit</b-button>



      </b-container>
    </div>
    
</template>

<script>
  import Navbar from './Navbar.vue'
    export default {
        name: "User",
      components: {Navbar},
      data() {
        return {
          token: '',
          username: "",
          givenName: "",
          familyName: "",
          userId: null,
          user: []

        }
      },

      mounted: function () {
        this.token = this.$getToken();
        this.getUser();
      },
      methods: {
        getUser() {
          this.userId = this.$route.params.userId;
          this.$http.get('http://127.0.0.1:4941/api/v1/users/' + this.userId, {headers: {'x-authorization': this.token}})
            .then(function (response) {
              this.user = response.data;

            }, function (error) {
              console.log(error);


            });
        },
        moveToEdit: function () {
          this.$router.push({name: "EditUser"});
        },
      }
  }

</script>

<style scoped>

</style>
