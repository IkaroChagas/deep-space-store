import Vue from "vue";
import VueTheMask from "vue-the-mask";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store";

Vue.use(VueTheMask);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
