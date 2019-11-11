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
const axios = require("axios");
import ProgressTracker from "../ProgressTracker";
import { programProgressJson } from "../../helpers.js";

export default {
  name: "MastersPage",
  components: { ProgressTracker },
  data: function() {
    return {
      masters: null,
      student: null,
      mastersSummary: null,
      loaded: false
    };
  },
  async mounted() {
    // Get list of all masters and information about the masters
    const mastersResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/masters"
    );
    this.masters = mastersResponse.data;

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
    if (this.student && this.masters && this.courses) {
      this.mastersSummary = programProgressJson(
        this.student,
        this.courses,
        this.masters
      );
    }
    // All data has been loaded
    this.loaded = true;
  }
};
</script>

<style scoped>
</style>
