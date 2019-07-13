<style >
  /*#image {*/
    /*width: 500px;*/
  /*}*/
  body {
    background-image: url("https://static1.squarespace.com/static/5369465be4b0507a1fd05af0/t/5c1839b9032be480663dcc36/1545091522043/Ben+Hicks.JPG?format=1500w");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.86;
    filter: alpha(opacity=50); /* For IE8 and earlier */

    /*filter: blur(8px);*/
    /*-webkit-filter: blur(8px);*/
  }

  #headline {
    font-family: "Trebuchet MS";
    font-size: 50px;
    font-weight: 700;
    text-transform: uppercase;
    width: 850px;
    height:70px;

  }

  #clickhere{
    font-family: "Trebuchet MS";
    font-size: 50px;
    font-weight: 700;
    text-transform: uppercase;
    color: ghostwhite;

  }
  a{
    color: white;
  }
</style>

<template>
  <div >
    <navbar></navbar>

    <div id ="Home">
      <b-container class="mt-4" align="center">

        <h1 id="headline">
          The Turtles Are Dying
        </h1>
        <!--<img src="https://media1.tenor.com/images/8b56b53f79c4b1df05a61f7b58767563/tenor.gif?itemid=4591305">-->

        <div class="fixed-bottom" align="right" id="clickhere">
          <img src="http://www.animatedimages.org/data/media/111/animated-arrow-image-0472.gif" border="0" alt="animated-arrow-image-0472" /></a>

        <router-link :to = "{name: 'Why'}" align="bottom"> Click here to see why</router-link>
          <img src="http://www.animatedimages.org/data/media/111/animated-arrow-image-0473.gif" border="0" alt="animated-arrow-image-0473" /></a>

      </div>
        <div id="image">
          <!--<img src="https://news-media.stanford.edu/wp-content/uploads/2016/04/13101640/climateshutterstock_teaser.jpg" width = "100%">-->
        </div>
      </b-container>
  </div>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
    export default {
        name: "Home",
       components: {Navbar},

    }
</script>

<style scoped>

</style>
