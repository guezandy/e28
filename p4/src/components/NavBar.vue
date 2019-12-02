<template>
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
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    student: function() {
      return this.$store.state.student;
    }
  },
  methods: {
    onLogout(event) {
      event.preventDefault();
      localStorage.removeItem("user_id");
      // Refresh the current logged in users data
      this.$store.dispatch("setStudent");
    }
  }
};
</script>