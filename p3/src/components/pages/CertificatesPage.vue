<template>
  <div>
    <h1>Certificates</h1>
    <p>Logged in as student with hypothetical student id: 1</p>
    <div v-if="certificates">
      <div v-for="certificate in certificates" :key="certificate.id">
        <p>{{ certificate.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "CertificatesPage",
  data: function() {
    return {
      certificates: null
    };
  },
  async mounted() {
    const response = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/certificates"
    );
    this.certificates = response.data;
  }
};
</script>

<style scoped></style>
