<template>
  <div>
    <h1>Degree Audit</h1>
    <p>Logged in as student with hypothetical student id: 1</p>
    <div v-if="student">
      <p>{{ student.name }}</p>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "DegreeAuditPage",
  data: function() {
    return {
      student: null
    };
  },
  async mounted() {
    const response = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/students/1"
    );
    this.student = response.data;
  }
};
</script>

<style scoped></style>
