import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import store from './store'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import CertificatesPage from "./components/pages/CertificatesPage.vue";
import DegreeAuditPage from "./components/pages/DegreeAuditPage.vue";
import MastersPage from "./components/pages/MastersPage.vue";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [{
    path: "/",
    component: DegreeAuditPage,
    name: "home"
  },
  {
    path: "/certificates",
    component: CertificatesPage,
    name: "certificates"
  },
  {
    path: "/masters",
    component: MastersPage,
    name: "masters"
  }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount("#app");