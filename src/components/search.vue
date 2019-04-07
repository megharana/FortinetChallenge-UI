<template>
  <div>
    <form @submit.prevent="searchImpl">
      <div class="input-field col s6">
        <input type="text" ref="restName" id="searchRest" class="validate" v-model="searchText">
        <label for="searchRest">Enter Resturant Name</label>
      </div>
      <input type="submit" value="Search">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      details: [],
      displayCard: false,
      detailsLength: 0,
      restList: [],
      txtValue: "",
      filter: ""
    };
  },

  methods: {
    // getSearchText: function() {
    //   console.log(this.searchText);
    //   axios.post("", this.searchText);
    //   axios.get("").then(response => {
    //     this.details = response.data;
    //     this.displayLength = this.details.length;
    //     this.displayCard = true;
    //   });
    // },
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
.row .col.m7 {
  width: 300px;
}
</style>
