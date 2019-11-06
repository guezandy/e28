import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Second from "./components/Second.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Second },
  { path: "/home", component: HelloWorld }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
