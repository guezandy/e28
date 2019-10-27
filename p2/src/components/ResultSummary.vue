<template>
  <div>
    <h2>Result summary</h2>
    <h4>{{ results.played }} game(s) played</h4>
    <h4>{{ results.tie }} game(s) tied</h4>
    <h4>{{ results.win }} game(s) won</h4>
    <h4>{{ results.lose }} games(s) lost</h4>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      default: {
        win: 0,
        lose: 0,
        tie: 0,
        played: 0
      },
      validator: function(value) {
        // Object contains correct keys
        const correctKeys = Object.keys(value).reduce(
          (isValid, key) =>
            isValid && ["lose", "played", "tie", "win"].indexOf(key) !== -1
        );
        // Nothing less than 0
        const anyLessThanZero =
          Object.values(value).some(el => el < 0).length > 0;
        // Sums to correct value
        const correctSum = value.lose + value.tie + value.win === value.played;
        return correctKeys && !anyLessThanZero && correctSum;
      }
    }
  },
  template: "#result-summary"
};
</script>