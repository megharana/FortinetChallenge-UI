<template>
  <div class="container">
    <h1>{{title}}</h1>
    <router-view></router-view>
    <!-- <listing-rest></listing-rest> -->
    <!-- <front-page></front-page> -->
  </div>
</template>

<script>
import listing from "./components/listing.vue";
import frontPage from "./components/FrontPage";
export default {
  components: {
    "listing-rest": listing,
    "front-page": frontPage
  },
  data() {
    return {
      title: "World's Bhojanalayas, Welcomes you all. Bon Appetit!"
    };
  }
};
</script>

<style>
h1 {
  color: cornflowerblue;
  outline-color: rgb(230, 23, 23);
}
</style>
