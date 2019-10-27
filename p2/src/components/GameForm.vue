<template>
  <div>
    <select :value="selected" @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
    <button @click="play" @keyup.enter="play">Play {{ selected }}</button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [
          { value: "paper", text: "PAPER" },
          { value: "scissor", text: "SCISSOR" },
          { value: "rock", text: "ROCK" }
        ];
      }
    },
    selected: {
      type: String,
      default: "paper" // Default to paper
    }
  },
  methods: {
    play: function() {
      this.$emit("game-play", this.selected);
    },
    handleChange: function(event) {
      const newValue = event.target.value;
      this.$emit("update-selected", newValue);
    }
  }
};
</script>

<style>
</style>