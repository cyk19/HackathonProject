<template>
  <div>

    <!-- User not logged in -->
    <div v-if="token == null">

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <!--<b-navbar-brand href="#">Home</b-navbar-brand>-->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <img src="https://www.flaticon.com/premium-icon/icons/svg/1726/1726482.svg" width="50" height="50">
        <b-button class=" ml-2" v-on:click="moveToHome()">Home</b-button>




        <b-modal id="loginModal" title="Log in" @ok="login" ok-title="Log in">
          <label class="mb-2">Login with your username or email and enter your password</label>
          <b-form-input class="mb-2" placeholder="Username" v-model="username"></b-form-input>
          <b-form-input class="mb-2" placeholder="Email" v-model="email" autocomplete="email"></b-form-input>
          <b-form-input class="mb-2" placeholder="Password" v-model="password" type="password"></b-form-input>
        </b-modal>



      </b-collapse>
    </b-navbar>


    </div>

    <div v-else>

      <b-navbar toggleable="lg" type="dark" variant="dark">
        <img src="https://img.icons8.com/color/64/000000/passenger-with-baggage.png">
        <!--<b-navbar-brand href="#">Home</b-navbar-brand>-->

        <!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

        <!--<b-collapse id="nav-collapse" is-nav>-->

          <b-button class="ml-2" v-on:click="moveToHome()">Home</b-button>

          <!--<b-button class=" mr-sm-2 mb-sm-0 ml-2" variant='primary' v-b-modal.loginModal>-->
            <!--Log in-->
          <!--</b-button>-->

        <b-navbar-nav class="ml-auto">
          <img src="https://img.icons8.com/color/40/000000/gender-neutral-user.png">

          <b-nav-item-dropdown text="Venues" right>
            <b-dropdown-item v-on:click="addVenue()">Add a venue</b-dropdown-item>
            <b-dropdown-item v-on:click="myVenue()">My venues</b-dropdown-item>


          </b-nav-item-dropdown>


          <b-button class="mr-2" v-on:click="moveToUser()">My profile</b-button>

          <b-button  variant="success" v-on:click="logout()">Logout</b-button>



        <!--</b-collapse>-->
        </b-navbar-nav>
      </b-navbar>
    </div>



  </div>
    
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        error: "",
        errorFlag: false,
        token: null,
        userId: null,
        usernameOrEmail: '',
        password: '',
        username: '',
        email: ''
      }
    },
    mounted :  function () {
      this.token = this.$getToken();
      this.userId = this.$getUserId();
      // this .checklogin ();
    },
    methods : {

      login: function (e) {
        e.preventDefault(); //don't just refresh
        console.log(this.username + this.email);
        if (this.username === '' && this.email === '') {
          alert("Please enter a username or email address");
        } else if (this.email === '') {
          //login with username
          this.$login(this.username, this.password).then(function() {
            this.token = this.$getToken();
            this.userId = this.$getUserId();

            localStorage.setItem("password", this.password);
            console.log("the password", localStorage.getItem("password"))
            console.log(this.userId)
          });
        } else {
          //login with email
          this.$http.post('`http://127.0.0.1:4941/api/v1//users`/login',
            JSON.stringify({"email": this.email, "password": this.password}))
            .then(function (response) {
              console.log("Good email");
              this.$postLogin(response);
              this.token = this.$getToken();
              this.userId = this.$getUserId();
            }).catch(function (error) {
            console.log(error);
            if (error.status === 400) {
              alert("Incorrect email or password.");
            } else {
              alert("Error: " + error.status);
            }
          });
        }
      },
      logout: function () {
        localStorage.removeItem("token"); //delete token
        this.token = null;
        localStorage.removeItem("id");
        this.userId = null;
        alert("Successfully logged out! You will now be directed to the home page")
        this.$router.push({name:"Home"});
        //this.$goToAnotherPage('/'); //go back home
      },

      moveToVenues: function () {
        this.$router.push({name: "Venues"});

      },
      moveToHome: function () {
        this.$router.push({name: "Home"});
      },
      moveToRegister: function () {
        this.$router.push({name: "Register"});
      },
      addVenue: function () {
        this.$router.push({name: "AddVenue"});
      },
      myVenue: function () {
        this.$router.push({name: "MyVenues"});
      },
      moveToUser: function () {
        this.$router.push({name: "User", params: { userId: this.userId }});
      },




    }
  }
</script>

<style scoped>

</style>
