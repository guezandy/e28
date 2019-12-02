import Vue from 'vue'
import Vuex from 'vuex'

const axios = require("axios");
const api = 'https://my-json-server.typicode.com/guezandy/e28';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    certificates: null,
    courses: null,
    masters: null,
    student: null
  },
  mutations: {
    setStudent(state, payload) {
      state.student = payload;
    },
    setCertificates(state, payload) {
      state.certificates = payload;
    },
    setCourses(state, payload) {
      state.courses = payload;
    },
    setMasters(state, payload) {
      state.masters = payload;
    }
  },
  actions: {
    async setStudent(context) {
      // Get logged in user
      const studentId = localStorage.getItem("user_id");
      if (studentId) {
        // Make api request
        const studentResponse = await axios.get(`${api}/students/${studentId}`);
        context.commit('setStudent', studentResponse.data);
      } else {
        // Clear student
        context.commit('setStudent', null);
      }
    },
    async setCertificates(context) {
      // Make api request
      const certificateReponse = await axios.get(`${api}/certificates`)
      context.commit('setCertificates', certificateReponse.data)
    },
    async setCourses(context) {
      // Make api request
      const courseResponse = await axios.get(`${api}/courses`)
      context.commit('setCourses', courseResponse.data)
    },
    async setMasters(context) {
      // Make api request
      const mastersResponse = await axios.get(`${api}/masters`)
      context.commit('setMasters', mastersResponse.data)
    }
  },
})