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
        lead="Login to begin. Note this is just a dummy login for that doesn't work. Clicking submit just stores a static user_id in local storage"
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
              v-model="loginForm.email"
              type="email"
              placeholder="Enter email"
            ></b-form-input>
            <div class="form-feedback-error" v-if="!$v.loginForm.email.required">Email is required.</div>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input id="input-2" v-model="loginForm.password" placeholder="Password"></b-form-input>
          </b-form-group>
          <b-button data-test="login-buttom" type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data: function() {
    return {
      loginForm: {
        email: undefined,
        password: undefined
      },
      formHasErrors: false
    };
  },
  validations: {
    loginForm: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  watch: {
    "$v.$anyError": function() {
      console.log("Doing this", this.$v.$anyError);
      this.formHasErrors = this.$v.$anyError;
    }
  },
  methods: {
    // Handle login for submissions
    onLogin(event) {
      console.log("has errors", this.formHasErrors);
      if (!this.formHasErrors) {
        event.preventDefault();
        // Do nothing with the form inputs just add add user_id to local store
        localStorage.setItem("user_id", 1);
        // Refresh the current logged in users data
        this.$store.dispatch("setStudent");
      }
    }
  }
};
</script>