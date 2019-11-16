<template>
  <div id="app">
    <div v-if="loaded">
      <!-- Render "logged in" version if student is returned from the API -->
      <div v-if="student">
        <div>
          <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">HES Course Planner</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item href="#">
                  <router-link :to="{ name: 'home' }">Degree Audit</router-link>
                </b-nav-item>
                <b-nav-item href="#">
                  <router-link :to="{ name: 'certificates' }">Certificate Programs</router-link>
                </b-nav-item>
                <b-nav-item href="#">
                  <router-link :to="{ name: 'masters' }">Masters Programs</router-link>
                </b-nav-item>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <em>{{student.name}}</em>
                  </template>
                  <b-dropdown-item href="#" @click="onLogout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
        <router-view></router-view>
      </div>
      <div v-else>
        <!-- Logged out view -->
        <div>
          <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">HES Course Planner</b-navbar-brand>
          </b-navbar>
        </div>
        <div>
          <b-jumbotron
            header="Welcome to HES Progress tracker"
            lead="Login to begin. Note this is just a dummy login for that doesn't work. Clicking submit just stores a static user_id in local storage"
          >
            <b-form @submit="onLogin">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="loginForm.email"
                  type="email"
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input id="input-2" v-model="loginForm.password" placeholder="Password"></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-jumbotron>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "app",
  data: function() {
    return {
      // This is meant to mirror a user logged in - storing some user token in localStorage
      studentId: localStorage.getItem("user_id"),
      student: null,
      loaded: false,
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  async mounted() {
    await this.refreshUser();
  },
  methods: {
    // Handle login for submissions
    onLogin(event) {
      event.preventDefault();
      // Do nothing with the form inputs just add add user_id to local store
      localStorage.setItem("user_id", 1);
      // Refresh the current logged in users data
      this.refreshUser();
    },
    onLogout(event) {
      event.preventDefault();
      localStorage.removeItem("user_id");
      this.refreshUser();
    },
    // Check localStorage for a user and if there is make a request to get that users data
    async refreshUser() {
      this.studentId = localStorage.getItem("user_id");
      // Get information on the student logged in
      if (this.studentId) {
        const studentResponse = await axios.get(
          `https://my-json-server.typicode.com/guezandy/e28/students/${this.studentId}`
        );
        this.student = studentResponse.data;
      } else {
        // Clear student on logout
        this.student = null;
      }
      // Stop wierd jumping from logged-out to the logged-in app
      this.loaded = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.nav-link a {
  color: rgba(255, 255, 255, 0.5);
}
</style>
