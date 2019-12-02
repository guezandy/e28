<template>
  <div>
    <div>
      <b-jumbotron
        header="Certificate programs"
        lead="See a breakdown of progress for each certificate program(s)"
      ></b-jumbotron>
    </div>
    <div v-if="loaded">
      <!-- This is the same for both masters and certificate pages so I made it its own component -->
      <progress-tracker :programs="this.certificates" :program-summary="this.certificateSummary"></progress-tracker>
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
  name: "CertificatesPage",
  components: { ProgressTracker },
  computed: {
    student: function() {
      return this.$store.state.student;
    },
    courses: function() {
      return this.$store.state.courses;
    },
    certificates: function() {
      return this.$store.state.certificates;
    }
  },
  data: function() {
    return {
      // Summary of students progress against the certificate programs
      certificateSummary: null,
      // Has all the data been loaded
      loaded: false
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("setStudent"),
      this.$store.dispatch("setCourses"),
      this.$store.dispatch("setCertificates")
    ]);

    // Organize data for the UI
    if (this.student && this.certificates && this.courses) {
      // Process all the data to get students progress against certificates
      this.certificateSummary = programProgressJson(
        this.student,
        this.courses,
        this.certificates
      );
      // All data has been loaded
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
</style>
