<template>
  <div>
    <div>
      <b-jumbotron
        header="Certificate programs"
        lead="See a breakdown of progress for each certificate program(s)"
      ></b-jumbotron>
    </div>
    <div v-if="loaded">
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
      certificates: null,
      student: null,
      certificateSummary: null,
      loaded: false
    };
  },
  async mounted() {
    // Get list of all certificates and information about the certificates
    const certificatesResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/certificates"
    );
    this.certificates = certificatesResponse.data;

    // Get list of classes taken by the student
    const studentResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/students/1"
    );
    this.student = studentResponse.data;

    // Get list of courses offered at the univeristy
    const coursesResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/courses"
    );
    this.courses = coursesResponse.data;

    // Organize data for the UI
    if (this.student && this.certificates && this.courses) {
      this.certificateSummary = programProgressJson(
        this.student,
        this.courses,
        this.certificates
      );
    }
    // All data has been loaded
    this.loaded = true;
  }
};
</script>

<style scoped>
</style>
