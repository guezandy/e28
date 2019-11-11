<template>
  <div>
    <div>
      <b-jumbotron
        header="Certificate programs"
        lead="See a breakdown of progress for each certificate program"
      ></b-jumbotron>
    </div>
    <div role="tablist" v-if="certificates">
      <b-card no-body class="mb-1" v-for="certificate in certificates" :key="certificate.id">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-1 variant="info">{{certificate.name}}</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <h2>Progress</h2>
              <b-progress :value="2" :max="5" animated></b-progress>
            </b-card-text>
            <b-card-text>
              <div>
                <b-table striped hover :items="certificates"></b-table>
                <b-table striped hover :items="certificateSummary[0]"></b-table>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
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
      certificateSummary: null
    };
  },
  async mounted() {
    // Get list of all certificates and information about the certificates
    const certificatesResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/certificates"
    );
    this.certificates = certificatesResponse.data;
    const studentResponse = await axios.get(
      "https://my-json-server.typicode.com/guezandy/e28/students/1"
    );
    this.student = studentResponse.data;

    if (this.student && this.certificates) {
      this.certificateSummary = this.certificates.map(certificate => {
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
          for (let j = 0; j < req.options; j++) {
            const course = req.options[j];
            if (
              // If course is not used already
              !usedCourses.includes(course) &&
              // Student has taken the course
              studentsCompletedCourses.includes(course)
            ) {
              requirementsSummary.push({
                requirement: req.name,
                course: course
              });
              usedCourses.push(course);
            }
          }
        }
        return requirementsSummary;
      });
    }
  }
};
</script>

<style scoped></style>
