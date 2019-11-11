<template>
  <div>
    <div>
      <b-jumbotron
        header="Certificate programs"
        lead="See a breakdown of progress for each certificate program"
      ></b-jumbotron>
    </div>
    <div v-if="loaded">
      <div role="tablist" v-if="certificates">
        <b-card
          v-for="certificate in certificates"
          :key="certificate.id"
          border-variant="primary"
          :header="certificate.name"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
          class="certificateCard"
        >
          <b-card-body>
            <div v-if="certificateSummary[certificate.id]">
              <b-card-text>
                <b-progress
                  :value="certificateSummary[certificate.id]['completedCount']"
                  :max="certificateSummary[certificate.id]['tableRows'].length"
                  animated
                  show-progress
                  variant="success"
                ></b-progress>
              </b-card-text>
              <b-card-text>
                <b-table striped hover :items="certificateSummary[certificate.id]['tableRows']"></b-table>
              </b-card-text>
            </div>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div v-else>
      <b-spinner label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "CertificatesPage",
  data: function() {
    return {
      certificates: null,
      student: null,
      certificateSummary: null,
      loaded: false
    };
  },
  async mounted() {
    const NOT_MET = "Not satisfied";
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
      const courseNameMap = {};
      this.courses.forEach(course => (courseNameMap[course.id] = course.name));

      this.certificateSummary = this.certificates.reduce(
        (summary, certificate) => {
          // List of courses taken by the student
          const studentsCompletedCourses = this.student.completedCourses.map(
            course => course.id
          );
          const usedCourses = [];

          // For each requirement in this certificate compile list of courses that satisfy it
          const requirementsSummary = [];

          for (let i = 0; i < certificate.requirements.length; i++) {
            const req = certificate.requirements[i];
            // List of courses of the options that satisfy this req that have been taken by the student
            for (let j = 0; j < req.options.length; j++) {
              const course = req.options[j];
              if (
                // If course is not used already
                !usedCourses.includes(course) &&
                // Student has taken the course
                studentsCompletedCourses.includes(course)
              ) {
                requirementsSummary.push({
                  requirement: req.name,
                  status: "Satisfied",
                  course: courseNameMap[course] || "Unknown course"
                });
                usedCourses.push(course);
              }
            }
            // Just to have a visual enter "Missing requirement" rows into this list
            while (requirementsSummary.length < req.count) {
              requirementsSummary.push({
                requirement: req.name,
                status: NOT_MET,
                course: `Possible course(s): ${req.options
                  .filter(option => !studentsCompletedCourses.includes(option))
                  .map(option => courseNameMap[option] || "Unknown course")
                  .join(", ")}`
              });
            }
          }
          summary[certificate.id] = {
            // To be used by progress bar to show progress in the certificate program
            completedCount: requirementsSummary.filter(
              req => req.status !== NOT_MET
            ).length,
            // To be used to render the table
            tableRows: requirementsSummary
          };
          return summary;
        },
        {}
      );
    }
    // All data has been loaded
    this.loaded = true;
  }
};
</script>

<style scoped>
.certificateCard {
  margin-bottom: 20px;
}
</style>
