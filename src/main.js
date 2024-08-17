import Vue from "vue";
import VueI18n from "vue-i18n";
import VueTheMask from "vue-the-mask";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import br from "./locales/br";
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
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "br",
  messages: {
    br
  }
});

prepareApp().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App)
  }).$mount("#app");
});
