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
import "./css/utility.css";
import titleMixin from "./mixins/titleMixin";

Vue.config.productionTip = false;
Vue.mixin(titleMixin);
new Vue({
  router,
  store,
  vuetify,
  wait: new VueWait(),
  render: h => h(App),
}).$mount("#app");
