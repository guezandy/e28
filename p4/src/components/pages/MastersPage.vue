<template>
  <div>
    <div>
      <b-jumbotron
        header="Masters programs"
        lead="See a breakdown of progress for each masters program(s)"
      ></b-jumbotron>
    </div>
    <div v-if="loaded">
      <progress-tracker :programs="this.masters" :program-summary="this.mastersSummary"></progress-tracker>
    </div>
    <div v-else>
      <b-spinner label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import ProgressTracker from "../ProgressTracker";
import { programProgressJson } from "../../helpers.js";

export default {
  name: "MastersPage",
  components: { ProgressTracker },
  computed: {
    student: function() {
      return this.$store.state.student;
    },
    courses: function() {
      return this.$store.state.courses;
    },
    masters: function() {
      return this.$store.state.masters;
    }
  },
  data: function() {
    return {
      // Has all the data been loaded
      loaded: false,
      // Summary of students progress against the Masters programs
      mastersSummary: null
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("setStudent"),
      this.$store.dispatch("setCourses"),
      this.$store.dispatch("setMasters")
    ]);
    // Organize data for the UI
    if (this.student && this.masters && this.courses) {
      this.mastersSummary = programProgressJson(
        this.student,
        this.courses,
        this.masters
      );
      // All data has been loaded
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
</style>
