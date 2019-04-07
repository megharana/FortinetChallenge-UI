<template>
  <div class="container">
    <form @submit.prevent="searchImpl">
      <div class="input-field col s6">
        <input type="text" ref="restName" id="searchRest" class="validate" v-model="searchText">
        <label for="searchRest">Enter Resturant Name</label>
      </div>
      <input type="submit" value="Search">
    </form>
    <a
      class="waves-effect waves-light btn modal-trigger"
      href="#modal1"
      v-on:click="activeModal"
    >Sort</a>
    <!-- Modal Structure -->
    <div id="modal1" class="modal" v-if="showModalSort">
      <div class="modal-content">
        <h4>Sort By:</h4>
        <form @submit.prevent="sortList">
          <p>
            <label>
              <input class="with-gap" name="group1" value="votes" type="radio" v-model="picked">
              <span>Votes</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="group1" value="rating" type="radio" v-model="picked">
              <span>Rating</span>
            </label>
          </p>
          <p>
            <label>
              <input
                class="with-gap"
                name="group1"
                value="costfortwo"
                type="radio"
                v-model="picked"
              >
              <span>Cost of Two</span>
            </label>
          </p>
          <input type="submit" value="Submit">
        </form>
      </div>
      <!-- <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
      </div>-->
    </div>
    <ul v-if="!sortedDone">
      <li v-for="index in (0,99) " :key="index">
        <div class="col s12 m8 offset-m2 l6 offset-l3">
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s2">
                <img
                  src="https://cdn.dribbble.com/users/1456628/screenshots/4916933/animacja_arina.gif"
                  alt
                  class="circle responsive-img"
                >
                <!-- notice the "circle" class -->
              </div>
              <div class="col s10">
                <p class="black-text">{{details[index].rest_name}}</p>
                <p class="black-text">{{details[index].cuisines}}</p>
                <p class="black-text">VOTES : {{details[index].votes}}</p>
                <p class="black-text">RATING : {{details[index].aggregate_rating}}</p>
                <p class="black-text">COST OF TWO : {{details[index].avg_cost_ofTwo}}</p>
              </div>
              <a
                href="#"
                v-bind:id="details[index].rest_name"
                v-on:click="getMapLocation(details[index].resturant_id)"
              >
                <img id="showInMapIcon" src="../assets/maps-icon-8214.png" alt>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="sortedDone">
      <li v-for="index in (0,99) " :key="index">
        <div class="col s12 m8 offset-m2 l6 offset-l3">
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s2">
                <img
                  src="https://cdn.dribbble.com/users/1456628/screenshots/4916933/animacja_arina.gif"
                  alt
                  class="circle responsive-img"
                >
                <!-- notice the "circle" class -->
              </div>
              <div class="col s10">
                <p class="black-text">{{details[index].rest_name}}</p>
                <p class="black-text">{{details[index].cuisines}}</p>
                <p class="black-text">VOTES : {{details[index].votes}}</p>
                <p class="black-text">RATING : {{details[index].aggregate_rating}}</p>
                <p class="black-text">COST OF TWO : {{details[index].avg_cost_ofTwo}}</p>
              </div>
              <a
                href="#"
                v-bind:id="details[index].rest_name"
                v-on:click="getMapLocation(details[index].resturant_id)"
              >
                <img id="showInMapIcon" src="../assets/maps-icon-8214.png" alt>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
var firstBy = require("thenby");
export default {
  data() {
    return {
      details: [],
      address: [],
      showBhojanalaya: "",
      latitude: "",
      longitude: "",
      searchText: "",
      details: [],
      displayCard: false,
      detailsLength: 0,
      restList: [],
      txtValue: "",
      filter: "",
      picked: null,
      showModalSort: false,
      sortedDone: false
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8000/bhojanalyas/address/").then(response => {
      this.address = response.data;
    });
    axios.get("http://127.0.0.1:8000/bhojanalyas/details/").then(response => {
      this.details = response.data;
    });
  },
  computed: {
    sortList: function() {
      this.showModalSort = false;
      if (this.picked == null) {
        alert("Please select one option");
      } else {
        if (this.picked == "votes") {
          this.details.sort(firstBy("votes"));
        } else if (this.picked == "rating") {
          this.details.sort(firstBy("aggregate_rating"));
        } else if (this.picked == "costfortwo") {
          this.details.sort(firstBy("avg_cost_ofTwo"));
        }
      }

      this.sortedDone = true;
    }
  },
  methods: {
    getMapLocation: function(value) {
      console.log(value);
      axios.post("http://127.0.0.1:8000/bhojanalyas/getId/", value);
      axios.get("http://127.0.0.1:8000/bhojanalyas/getId/").then(response => {
        this.latitude = response.data.latitude;
        this.longitude = response.data.longitude;
        console.log(this.latitude);
        var url =
          "https://maps.google.com/?q=" + this.latitude + "," + this.longitude;
        window.open(url);
      });
    },
    activeModal: function() {
      this.showModalSort = true;
    },
    searchImpl: function() {
      console.log(this.searchText.toUpperCase());
      this.filter = this.searchText.toUpperCase();
      console.log(document.getElementsByTagName("li"));
      this.restList = document.getElementsByTagName("li");
      for (var i = 0; i < 99; i++) {
        this.txtValue = this.restList[i].innerText;
        console.log(this.txtValue);
        if (this.txtValue.toUpperCase().indexOf(this.filter) > -1) {
          this.restList[i].style.display = "";
        } else {
          this.restList[i].style.display = "none";
        }
      }
    }
  }
};
</script>

<style>
#showInMapIcon {
  height: 100px;
  width: 100px;
}
.row .col.m7 {
  width: 300px;
}
.modal {
  display: inherit;
  position: fixed;
  z-index: 2;
}
/* The Modal (background) */
#mymodal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 5; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0); /* Black w/ opacity */
  background-size: 100%;
}

/* Modal Content */
#mymodal .modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
#mymodal .close {
  color: #aaaaaa;
  float: right;
  font-size: 30px;
  font-weight: bold;
}

#mymodal .close:hover,
#mymodal .close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
