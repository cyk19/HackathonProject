<template>
  <div>

    <navbar></navbar>

    <b-container class="mt-4" align="center">


    <h1>
      Venue Details
    </h1>


    <table class="table table-bordered">
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
        <b>Address</b>
      </td>

      <td>
        <b>Date Added</b>
      </td>

      <td>
        <b>Category</b>
      </td>
      <td>
        <b>Admin</b>
      </td>

      <tr >
        <td>
          <div v-if="venue.photos.length === 0">
            <img src="/src/assets/default.png" width="100" height="100" >
          </div>
          <div v-else="venue.photos.photoFilename ">
            <img :src="'http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId  +  '/photos/' + venue.photos[0].photoFilename" >
          </div>


        </td>

        <td> {{venue.venueName}} </td>
        <td> {{venue.city}}</td>
        <td> {{venue.address}}</td>
        <td> {{venue.dateAdded}}</td>
        <td> {{venue.category.categoryName}}</td>
        <td> {{venue.admin.username}}</td>


      </tr>


    </table>
    <div align="center">
      <img src="https://img.icons8.com/wired/40/000000/create-new.png">

      <b>Description: </b> {{venue.shortDescription}}
      <b-button v-b-toggle.collapse-2 class="m-1" variant ="info">Show More</b-button>
      <b-collapse id="collapse-2">
        <b-card align="left"><b>Long Description: </b>{{venue.longDescription}}</b-card>
      </b-collapse>


    </div>
    <div align="center">
      <img src="https://img.icons8.com/wired/40/000000/rating.png">
      <b>Mean Star Rating: </b>    <td v-if="meanStarRating === null">3</td>
      <td v-if="meanStarRating !== null"> {{meanStarRating}}</td>
      <!--{{venues.city}}-->
    </div>
    <div align="center">
      <img src="https://img.icons8.com/wired/40/000000/price-tag.png">
      <b>Mode Cost Rating: </b> <td v-if="modeCostRating === null">3</td>
      <td v-if="modeCostRating !== null"> {{modeCostRating}}</td>
    </div>

    <div>

      <img src="https://img.icons8.com/wired/40/000000/thumb-up.png">      <b> Reviews:</b>


      <table class="mt-3 table table-bordered">
        <tr>

          <th> Reviewer </th>
          <th> Review</th>
          <th> Star Rating</th>
          <th> Cost Rating</th>
          <th> Time Posted</th>



        </tr>


          <tr v-for="review in reviews">
            <td>{{review.reviewAuthor.username}}</td>

            <td>{{review.reviewBody}}</td>
            <td>{{review.starRating}}</td>
            <td> {{review.costRating}}</td>
            <td>{{review.timePosted}}</td>


          </tr>







      </table>

    </div>




      <div v-if="token !== null">
        <b-button align="left" variant="info" v-on:click="moveToAddReview()">Add Review</b-button>
      </div>



    <div>
      <router-link :to = "{ name: 'Venues'}" > Back to Venues Page </router-link>
    </div>




    </b-container>



  </div>



</template>

<script>
  import Navbar from './Navbar.vue'
    export default {
      name: "Details",
      components: {Navbar},
      data() {
        return {
          error: "",
          errorFlag: false,
          reviews: [],
          venue: {
            photos: [{
              photoFilename: ""
            }

            ],
            category: {},
            admin: {}
          },
          allvenues:[],
          meanStarRating: null,
          modeCostRating: null,
          review: [{
            reviewAuthor: {},
            reviewBody: "",

          }],
          username: "",
          token: null



        }
      },
      mounted: function () {
        this.getSingleVenue();
        this.getReviews();
        this.token = this.$getToken();
      },
      methods: {
        getSingleVenue: function () {


          this.$http.get('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId)
            .then((response) => {
              this.venue = response.data;

              this.$http.get('http://127.0.0.1:4941/api/v1/venues')
                .then((response) => {
                  this.allvenues = response.data;
                  for (let ven of this.allvenues) {

                    console.log(this.venue);
                    console.log(ven);
                    console.log(this.$route.params);
                    if (ven.venueId == this.$route.params.venueId) {
                      this.meanStarRating = ven.meanStarRating;
                      this.modeCostRating = ven.modeCostRating;

                      console.log("star rating", this.venue.meanStarRating);
                      console.log("cost rating", this.venue.modeCostRating);


                    }
                  }


                  console.log("herrrr", this.venue.photos[0].photoFilename);
                }, function (error) {
                  this.error = error;
                  this.errorFlag = true;
                })


            })


        },

        getReviews: function () {
          this.$http.get('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/reviews')
            .then(function (response) {
              this.reviews= response.data;
              this.reviews.sort(function (a, b){
                  a = new Date(a.timePosted);
                  b = new Date(b.timePosted);
                  return b-a;

              }
              );
              console.log("review", this.reviews);
              console.log("meh", this.reviews[0].reviewBody)
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
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
        moveToAddReview: function () {
          this.$router.push({name: "AddReview"})
        }
      }
    }
</script>

<style scoped>

</style>
