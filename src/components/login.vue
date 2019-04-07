<template>
  <div class="container">
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col s6">
          <input id="user_name" type="text" class="validate" v-model="loginUsername">
          <label for="user_name">Enter UserName</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="password" type="text" class="validate" v-model="loginPassword">
          <label for="password">Enter Password</label>
        </div>
      </div>
      <input type="submit" value="Submit">
    </form>
    <p v-if="loginFail">{{loginInfo}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      loginFail: false,
      loginInfo: ""
    };
  },
  methods: {
    login: function() {
      this.payload = {
        username: this.loginUsername,
        password: this.loginPassword
      };
      axios
        .post(
          "http://127.0.0.1:8000/bhojanalyas/getLoginInfo/",
          JSON.stringify(this.payload)
        )
        .then(response => {
          console.log(response);
          this.loginFail = true;
          this.loginInfo = response.data;
        });
    }
  }
};
</script>

<style>
</style>
