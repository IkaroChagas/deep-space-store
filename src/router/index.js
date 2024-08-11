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
      redirect: "/123"
    },
    { path: "/checkout/success", name: "SuccessPage", component: SuccessPage }
  ]
});
