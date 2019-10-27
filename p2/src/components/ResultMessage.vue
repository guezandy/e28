<template>
  <div v-if="result" :class="[result]">
    <h4 v-if="result === 'win'">You win!</h4>
    <h4 v-if="result === 'tie'">You tied!</h4>
    <h4 v-if="result === 'lose'">You lose!</h4>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return value === "" || ["win", "lose", "tie", ""].indexOf(value) !== -1;
      }
    }
  },
  template: "#result-message"
};
</script>

<style>
.win {
  color: green;
}
.lose {
  color: red;
}
.tie {
  color: blue;
}
</style>