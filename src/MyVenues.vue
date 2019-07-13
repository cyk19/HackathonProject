<template>

  <div>
    <navbar></navbar>
    <b-container class="mt-4" align="center">

    <div  id = "venues">
      <table class="table table-bordered">
        <!--<thead class="thead-dark">-->

        <td>
          <b>Photo</b>
        </td>
        <td>
          <b>Venue Name</b>
        </td>
        <td>
          <b>City</b>
        </td>

        <td>
          <b>Mean Star Rating</b>
        </td>
        <td>
          <b>Mode Cost Rating</b>
        </td>
        <td>
          <b>Category</b>
        </td>


        <tr  v-for="venue in venues">
          <td>
            <div v-if="venue.primaryPhoto === null">
              <img src="/src/assets/default.png" width="100" height="100" >
            </div>
            <div v-else="venue.primaryPhoto">
              <img :src="getPhoto(venue)" >
            </div>
          </td>




          <td>
            {{ venue.venueName }}<br/> <router-link :to="{ name: 'Details', params: { venueId: venue.venueId }}" >View</router-link>
            <br/> <router-link :to="{ name: 'EditVenue', params: { venueId: venue.venueId }}" >Edit</router-link></td>
          <td> {{venue.city}}</td>
          <td v-if="venue.meanStarRating === null">3</td>
          <td v-if="venue.meanStarRating !== null"> {{venue.meanStarRating}}</td>
          <td v-if="venue.modeCostRating === null"> 0</td>
          <td v-if="venue.modeCostRating !== null"> {{venue.modeCostRating}}</td>
          <td> {{venue.categoryName}}</td>
        </tr>

      </table>




      <router-link :to = "{ name: 'Venues'}" > Back to Venues Page </router-link>

    </div>
    </b-container>
  </div>



</template>

<script>
  import Navbar from './Navbar.vue'
    export default {
        name: "MyVenues",
      components: {Navbar},
      data() {
          return {
            error: "",
            errorFlag: false,
            userId: null,
            venues: null,
            allvenues: []
          }
      },
      mounted: function () {
        //this.userId = this.$getUserId();
        this.getVenues();
      },
      methods: {

        getVenues: function() {

          let paramslist = {};
          this.userId = this.$getUserId();
          paramslist.adminId = parseInt(this.userId);


           console.log("userid", this.userId);
          this.$http.get('http://127.0.0.1:4941/api/v1/venues',{
            params: paramslist


          }

          )
            .then(function (response) {
              this.allvenues = response.data;
              console.log(this.allvenues);

              this.$http.get('http://127.0.0.1:4941/api/v1/categories')
                .then(function (response) {
                  this.categories = response.data;


                  //console.log(this.categories);

                  for (let venue of this.allvenues) {
                    for (let category of this.categories) {
                      if (venue.categoryId === category.categoryId) {
                        venue.categoryName = category.categoryName;
                      }
                    }
                  }
                  this.venues= this.allvenues;


                  //this.updateSearch();
                  //this.categories = response.data;
                }, function (error) {
                  this.error = error;
                  this.errorFlag = true;
                });
            })
        },



        getPhoto (venue) {
          return "http://127.0.0.1:4941/api/v1/venues/" + venue.venueId + "/photos/" + venue.primaryPhoto

        },

        moveToVenues: function () {
          this.$router.push({name: "Venues"});

        },

        moveToHome: function () {
          this.$router.push({name: "Home"});
        },
        moveToRegister: function () {
          this.$router.push({name: "Register"})
        },
        moveToEdit: function() {
          this.$router.push({name: "EditVenue"})

        }

      }
    }
</script>



<style scoped>

</style>
