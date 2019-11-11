<template>
  <div id="app">
    <img alt="BlackJack" src="./assets/logo.png" />
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "app",
  components: {},
  async mounted() {
    const products = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/students"
    );
    console.log(products);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
