import axios from "axios";
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
    async submitOrder({ state }) {
      try {
        const response = await axios.post(
          "https://api.deepspacestore.com/offers/:offerCode/create_order",
          state.paymentMethod
        );
        if (
          response.status === 400 &&
          response.data.message === "CPF inválido"
        ) {
          return { success: false, message: "CPF inválido." };
        }

        return { success: true, data: response.data };
      } catch (error) {
        console.error("Erro ao enviar o pedido:", error);
        return { success: false, message: "Erro ao enviar o pedido." };
      }
    }
  }
});
