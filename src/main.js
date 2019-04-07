import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";
import VueRouter from "vue-router";

import FrontPage from "./components/FrontPage.vue";
import Listing from "./components/listing.vue";

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: "/list", component: Listing, name: "list" },
  { path: "/", component: FrontPage, name: "frontPage" }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
