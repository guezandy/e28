<template>
  <div>
    <!-- Logged out view -->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">HES Course Planner</b-navbar-brand>
      </b-navbar>
    </div>
    <div>
      <b-jumbotron
        header="Welcome to HES Progress tracker"
        lead="Login to begin. Note: This login doesn't actually work - it just expects a valid email and any password of correct length"
      >
        <b-form @submit="onLogin">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="$v.loginForm.email.$model"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
            <div class="form-feedback-error" v-if="!$v.loginForm.email.required">Email is required.</div>
            <div
              class="form-feedback-error"
              v-if="!$v.loginForm.email.minLength"
            >Email must have longer length</div>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="loginForm.password"
              placeholder="Password"
              type="password"
            ></b-form-input>
            <div
              class="form-feedback-error"
              v-if="!$v.loginForm.password.required"
            >Password is required.</div>
            <div
              class="form-feedback-error"
              v-if="!$v.loginForm.password.minLength"
            >Password must have longer length</div>
          </b-form-group>
          <b-button data-test="login-buttom" type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data: function() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      formHasErrors: false
    };
  },
  validations: {
    loginForm: {
      email: {
        required,
        minLength: minLength(5)
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  watch: {
    "$v.$anyError": function() {
      this.formHasErrors = this.$v.$anyError;
    }
  },
  methods: {
    // Handle login for submissions
    onLogin(event) {
      event.preventDefault();
      if (!this.formHasErrors) {
        // Do nothing with the form inputs just add add user_id to local store
        localStorage.setItem("user_id", 1);
        // Refresh the current logged in users data
        this.$store.dispatch("setStudent");
      }
    }
  }
};
</script>