<template>
  <div>
    <h1>Masters</h1>
    <p>Logged in as student with hypothetical student id: 1</p>
    <div v-if="masters">
      <div v-for="master in masters" :key="master.id">
        <p>{{ master.name }}</p>
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
      masters: null
    };
  },
  async mounted() {
    const response = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/masters"
    );
    this.masters = response.data;
  }
};
</script>

<style scoped></style>
