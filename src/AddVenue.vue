
<template>
  <div>
    <navbar></navbar>
    <b-container class="mt-4" align="center">



      <h1 class="ml-5"> Add a venue </h1>




      <b-form @submit.prevent="postVenues">

        <b-card  bg-variant="light" class="m-4 p-2">

          <b-form-group horizontal label="Venue name" class="mb-3">
            <b-form-input type="text" v-model="venueName" placeholder="Enter venue name" inline required></b-form-input>
          </b-form-group>


          <b-form-group horizontal label="Category Id" class="mb-3">
            <b-form-input type="number" v-model="categoryId" placeholder="1 - 'Accommodation', 2 - 'Cafés & Restaurants', 3 - 'Attractions', 4 - 'Events', 5 - 'Nature Spots'"inline required></b-form-input>
          </b-form-group>

          <b-form-group horizontal label="City" class="mb-3">
          <b-form-input type="text" v-model="city" placeholder="Enter city" inline required></b-form-input>
        </b-form-group>


          <b-form-group horizontal label="Short Description" class="mb-3">
            <b-form-input type="text" v-model="shortDescription" placeholder="Add a short description" inline required></b-form-input>
          </b-form-group>

          <b-form-group horizontal label="Long Description" class="mb-3">
            <b-form-input type="text" v-model="longDescription" placeholder="Add a long description (eg. opening times/days)" inline required></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="Address" class="mb-3">
            <b-form-input type="text" v-model="address" placeholder="Enter address" inline required></b-form-input>
          </b-form-group>

          <b-form-group horizontal label="Latitude" class="mb-3">
            <b-form-input type="text" v-model="latitude" placeholder="A value <= 90" inline required></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="Longitude" class="mb-3">
            <b-form-input type="text" v-model="longitude" placeholder="A value <= 90" inline required></b-form-input>
          </b-form-group>







          <b-btn variant="info"  type="submit">Create</b-btn>
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
            venueName: "",
            categoryId: "",
            city: "",
            shortDescription: "",
            longDescription: "",
            address: "",
            latitude: null,
            longitude: null,
            token: null

          }
      },
      mounted: function() {
          this.token = this.$getToken();
      },
      methods: {
          postVenues: function() {
            this.$http.post('http://127.0.0.1:4941/api/v1/venues', JSON.stringify({
              "venueName": this.venueName,
              "categoryId": parseInt(this.categoryId),
              "city": this.city,
              "shortDescription": this.shortDescription,
              "longDescription": this.longDescription,
              "address": this.address,
              "latitude": parseInt(this.latitude),
              "longitude": parseInt(this.longitude)
            }), {headers: {'X-Authorization': this.token}})
              .then(function (response) {

                let venueId = response.data.id;
                console.log(venueId)
                alert("Venue created! You will now be taken to the venues' page.");
                this.$router.push({name: "Venues"});



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
