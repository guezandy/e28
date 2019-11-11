<template>
  <div id="app">
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
                <em>{{user.name}}</em>
              </template>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      // This application should mirror a logged in version of the site.
      // Just hard-coding a user id as if this user was logged in
      user: {
        id: 1,
        name: "Andrew Rodriguez"
      }
    };
  },
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
