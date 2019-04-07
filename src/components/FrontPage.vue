<template>
  <div class="container">
    <div id="left_section">
      <img src="https://cdn.dribbble.com/users/1456628/screenshots/4916933/animacja_arina.gif" alt>
    </div>
    <div id="login_section">
      <ul class="collapsible">
        <li class="active">
          <div class="collapsible-header">Login</div>
          <div class="collapsible-body">
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
        </li>
        <li>
          <div class="collapsible-header">SignUp</div>
          <div class="collapsible-body">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      loginFail: false,
      loginInfo: "",
      username: "",
      password: "",
      payload: {},
      result: false,
      registerInfo: "",
      title: "World's Bhojanalayas, Welcomes you all. Bon Appetit!"
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
          console.log();
          if (this.loginInfo.endsWith("Login successful")) {
            window.location.href = "http://localhost:8080/list";
          }
        });
    },
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
#left_section {
  float: left;
}
#left_section img {
  width: 900px;
  height: 500px;
}
#login_section {
  display: inline-block;
  width: -webkit-fill-available;
}
.collapsible {
}
.collapsible-body {
  background-color: antiquewhite;
}
</style>
