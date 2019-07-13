
<template>
  <div>
    <navbar></navbar>
    <b-container class="mt-4" align="center">



      <h1 class="ml-5"> Post a Review </h1>




      <b-form @submit.prevent="postReviews">

        <b-card  bg-variant="light" class="m-4 p-2">

          <b-form-group horizontal label="Review" class="mb-3">
          <b-form-textarea
            id="textarea"
            v-model="reviewBody"
            placeholder="Please tell us your experience..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          </b-form-group>


          <b-form-group horizontal label="Star Rating" class="mb-3">
            <b-form-input type="number" v-model="starRating" placeholder="Enter a Star Rating between 1-5"inline required></b-form-input>
          </b-form-group>

          <b-form-group horizontal label="Cost Rating" class="mb-3">
            <b-form-input type="number" v-model="costRating" placeholder="Enter a Cost Rating between 0-4" inline required></b-form-input>
          </b-form-group>










          <b-btn variant="info"  type="submit">Post</b-btn>
        </b-card>
      </b-form>
      <router-link :to = "{ name: 'Venues'}" > Back to Venues Page </router-link>

    </b-container>
  </div>


</template>


<script>
  import Navbar from './Navbar.vue'
  export default {
    name: "AddVenue",
    components: {Navbar},
    data() {
      return {
        reviewBody: "",
        starRating: null,
        costRating: null,
        token: null

      }
    },
    mounted: function() {
      this.token = this.$getToken();
    },
    methods: {
      postReviews: function() {
        this.$http.post('http://127.0.0.1:4941/api/v1/venues/' + this.$route.params.venueId + '/reviews', JSON.stringify({
          "reviewBody": this.reviewBody,
          "starRating": parseInt(this.starRating),
          "costRating": parseInt(this.costRating),
        }), {headers: {'X-Authorization': this.token}})
          .then(function (response) {

            let venueId = response.data.id;
            console.log(venueId)
            alert("Review created! You will now be taken to the venues' page.");
            this.$router.push({name: "Details"});



          }, function (error) {
            // if (error.status === 400) {
            //   alert("Error: That was a bad request.");
            // } else if (error.status === 401) {
            //   alert("Error: unauthorised.")
            // } else {
            //   alert("Server error. Please try again later.");
            // }
            console.log(error.statusText);
            alert(error.statusText)
          });


      }}
  }
</script>

<style scoped>

</style>
