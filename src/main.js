import Vue from "vue";
import VueTheMask from "vue-the-mask";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store";

async function prepareApp() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

Vue.use(VueTheMask);
Vue.use(Toast);

prepareApp().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  }).$mount("#app");
});
