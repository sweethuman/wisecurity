import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./css/gradients.css";
import "./css/nprogress.css";
import "./plugins";
import VueWait from "vue-wait";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  wait: new VueWait(),
  render: h => h(App),
}).$mount("#app");
