import OfferPage from "@/components/OfferPage/OfferPage.vue";
import SuccessPage from "@/components/SuccessPage/SuccessPage.vue";
import CheckoutPage from "@/views/CheckoutPage/CheckoutPage.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "CheckoutPage", component: CheckoutPage },
    {
      path: "/:OFFER_CODE",
      name: "OfferPage",
      component: OfferPage
    },

    { path: "/success", name: "SuccessPage", component: SuccessPage }
  ]
});
