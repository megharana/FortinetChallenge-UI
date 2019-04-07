<template>
  <div class="container">
    <form @submit.prevent="register">
      <div class="row">
        <div class="input-field col s6">
          <input id="user_name" type="text" class="validate" v-model="username">
          <label for="user_name">Enter UserName</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="password" type="text" class="validate" v-model="password">
          <label for="password">Enter Password</label>
        </div>
      </div>
      <input type="submit" value="Submit">
    </form>
    <p v-if="result">{{registerInfo}}</p>
  </div>
</template>

<script>
export default {
  //   components: {
  //     "listing-rest": listing,
  //     "search-rest": search
  //   },
  data() {
    return {
      username: "",
      password: "",
      payload: {},
      result: false,
      registerInfo: ""
    };
  },
  methods: {
    register: function() {
      this.payload = { username: this.username, password: this.password };
      axios
        .post(
          "http://127.0.0.1:8000/bhojanalyas/getSignUpCred/",
          JSON.stringify(this.payload)
        )
        .then(response => {
          console.log(response);
          this.result = true;
          this.registerInfo = response.data;
        });
    }
  }
};
</script>

<style>
</style>
