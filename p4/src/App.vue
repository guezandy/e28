<template>
  <div id="app">
    <div v-if="loaded">
      <!-- Render "logged in" version if student is returned from the API -->
      <div v-if="student">
        <!-- Top navigation -->
        <nav-bar></nav-bar>
        <!-- Specific page being rendered -->
        <router-view></router-view>
      </div>
      <div v-else>
        <!-- Logged out view -->
        <login-page></login-page>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from "./components/pages/LoginPage";
import NavBar from "./components/NavBar";

export default {
  name: "app",
  components: { LoginPage, NavBar },
  data: function() {
    return {
      loaded: false
    };
  },
  computed: {
    student: function() {
      return this.$store.state.student;
    }
  },
  async mounted() {
    await this.$store.dispatch("setStudent");
    this.loaded = true;
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
