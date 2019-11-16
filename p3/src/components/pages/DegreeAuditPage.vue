<template>
  <div>
    <div>
      <b-jumbotron
        header="Degree Audit"
        lead="Understand classes taken thus far and how they apply to certificate and masters programs"
      ></b-jumbotron>
    </div>
    <div v-if="loaded">
      <b-card>
        <b-card-body>
          <b-table striped hover :items="student['completedCourses']"></b-table>
        </b-card-body>
      </b-card>
    </div>
    <div v-else>
      <b-spinner label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "DegreeAuditPage",
  data: function() {
    return {
      // List of certificate programs offered
      certificates: null,
      // List of all courses offered
      courses: null,
      // Has the data loaded
      loaded: false,
      // List of masters programs
      masters: null,
      // Information on the student and classes the student has taken
      student: null,
      studentId: localStorage.getItem("user_id")
    };
  },
  async mounted() {
    if (this.studentId) {
      // Get list of classes taken by the student
      const studentResponse = await axios.get(
        `https://my-json-server.typicode.com/guezandy/e28/students/${this.studentId}`
      );
      this.student = studentResponse.data;

      // Get list of all certificates and information about the certificates
      const certificatesResponse = await axios.get(
        "https://my-json-server.typicode.com/guezandy/e28/certificates"
      );
      this.certificates = certificatesResponse.data;

      // Get list of all masters and information about the masters
      const mastersResponse = await axios.get(
        "https://my-json-server.typicode.com/guezandy/e28/masters"
      );
      this.masters = mastersResponse.data;

      // Get list of courses offered at the univeristy
      const coursesResponse = await axios.get(
        "https://my-json-server.typicode.com/guezandy/e28/courses"
      );
      this.courses = coursesResponse.data;

      // Organize data for the UI
      if (this.student && this.certificates && this.courses && this.masters) {
        // Map course id to course name
        const courseNameMap = {};
        this.courses.forEach(
          course => (courseNameMap[course.id] = course.name)
        );

        // Map course id to certificate(s) satisfied
        const courseCertificateMap = {};
        this.certificates.forEach(certificate => {
          certificate.requirements.forEach(req => {
            req.options.forEach(option => {
              if (!Object.keys(courseCertificateMap).includes(`${option}`)) {
                courseCertificateMap[option] = [];
              }
              courseCertificateMap[option].push(
                `${certificate.name} (${req.name})`
              );
            });
          });
        });

        // Map course id to masters satisfied
        const courseMastersMap = {};
        this.masters.forEach(master => {
          master.requirements.forEach(req => {
            req.options.forEach(option => {
              if (!Object.keys(courseMastersMap).includes(`${option}`)) {
                courseMastersMap[option] = [];
              }
              courseMastersMap[option].push(`${master.name} (${req.name})`);
            });
          });
        });

        // Organize data for the table - add "MEETS NO REQ" if this class does not meet any reqs
        this.student.completedCourses.forEach(course => {
          course["name"] = courseNameMap[course.id];
          course["certificates"] = (
            courseCertificateMap[course.id] || ["MEETS NO REQUIREMENTS"]
          ).join(", ");
          course["masters"] = (
            courseMastersMap[course.id] || ["MEETS NO REQUIREMENTS"]
          ).join(", ");
        });
      }
      // All data has been loaded
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
</style>
