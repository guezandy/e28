import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

import CertificatesPage from "./components/pages/CertificatesPage.vue";
import DegreeAuditPage from "./components/pages/DegreeAuditPage.vue";
import MastersPage from "./components/pages/MastersPage.vue";

const routes = [
  { path: "/", component: DegreeAuditPage, name: "home" },
  { path: "/certificates", component: CertificatesPage, name: "certificates" },
  { path: "/masters", component: MastersPage, name: "masters" }
];

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
