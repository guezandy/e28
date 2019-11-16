
<template>
  <div role="tablist" v-if="programs">
    <b-card
      v-for="program in programs"
      :key="program.id"
      border-variant="primary"
      :header="program.name"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
      class="certificateCard"
    >
      <b-card-body>
        <div v-if="programSummary[program.id]">
          <b-card-text>
            <b-progress
              :value="programSummary[program.id]['completedCount']"
              :max="programSummary[program.id]['tableRows'].length"
              animated
              show-progress
              variant="success"
            ></b-progress>
          </b-card-text>
          <b-card-text>
            <b-table striped hover :items="programSummary[program.id]['tableRows']"></b-table>
          </b-card-text>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProgressTracker",
  // Generic "program" used to handle both certificate programs and masters programs
  props: ["programs", "programSummary"]
};
</script>

<style scoped>
.certificateCard {
  margin: 20px;
}
</style>