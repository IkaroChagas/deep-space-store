import CheckoutPage from "@/views/CheckoutPage/CheckoutPage.vue";
import SuccessPage from "@/views/SuccessPage/SuccessPage.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/:OFFER_CODE",
      name: "CheckoutPage",
      component: CheckoutPage
    },
    {
      path: "/",
      redirect: "/ae55qa4qa656"
    },
    {
      path: "/checkout/success/:paymentMethod",
      name: "SuccessPage",
      component: SuccessPage
    }
  ]
});
