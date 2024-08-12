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
      state.paymentMethod = {};
      state.paymentMethod = data;
    },
    setCardData(state, cardData) {
      state.paymentMethod.cardData = cardData;
    }
  }
});
