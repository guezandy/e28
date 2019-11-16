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
const axios = require("axios");
import ProgressTracker from "../ProgressTracker";
import { programProgressJson } from "../../helpers.js";

export default {
  name: "CertificatesPage",
  components: { ProgressTracker },
  data: function() {
    return {
      // Certificate programs offered
      certificates: null,
      // Summary of students progress against the certificate programs
      certificateSummary: null,
      // List of all courses offered
      courses: null,
      // Has all the data been loaded
      loaded: false,
      // Data about the logged in student
      student: null,
      studentId: localStorage.getItem("user_id")
    };
  },
  async mounted() {
    if (this.studentId) {
      // Get list of classes taken by the student
      const studentResponse = await axios.get(
        `https://my-json-server.typicode.com/guezandy/e28/students/${this.studentId}`
      );
      this.student = studentResponse.data;

      // Get list of all certificates and information about the certificates
      const certificatesResponse = await axios.get(
        "https://my-json-server.typicode.com/guezandy/e28/certificates"
      );
      this.certificates = certificatesResponse.data;

      // Get list of courses offered at the univeristy
      const coursesResponse = await axios.get(
        "https://my-json-server.typicode.com/guezandy/e28/courses"
      );
      this.courses = coursesResponse.data;

      // Organize data for the UI
      if (this.student && this.certificates && this.courses) {
        // Process all the data to get students progress against certificates
        this.certificateSummary = programProgressJson(
          this.student,
          this.courses,
          this.certificates
        );
      }
      // All data has been loaded
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
</style>
