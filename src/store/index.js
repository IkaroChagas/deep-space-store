import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personalData: {},
    deliveryData: {},
    paymentMethod: {}
  },
  mutations: {
    setPersonalData(state, data) {
      state.personalData = data;
    },
    setDeliveryData(state, data) {
      state.deliveryData = data;
    },
    setPaymentMethod(state, data) {
      state.paymentMethod = data;
    },
    setCardData(state, cardData) {
      if (!state.paymentMethod.cardData) {
        state.paymentMethod.cardData = {};
      }
      state.paymentMethod.cardData = cardData;
    }
  },
  actions: {
    async submitOrder() {
      const response = await fetch(
        "https://api.deepspacestore.com/offers/:offerCode/create_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return response;
    }
  }
});
