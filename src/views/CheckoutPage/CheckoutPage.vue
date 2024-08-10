<template>
  <v-container class="container" fluid>
    <v-row class="align-center">
      <v-col cols="auto">
        <v-img :src="logo" alt="Logo" class="logo-image"></v-img>
      </v-col>
      <v-col>
        <h1 class="app-title">DEEP SPACE STORE</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <OfferPage />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="second-container">
          <v-card-title>
            <h2 class="second-title">Checkout</h2>
          </v-card-title>
          <v-card-subtitle>
            <div class="percetage-value">{{ percent }}</div>
            <div
              class="percentage"
              :style="{ width: percent, marginTop: '10px' }"
            ></div>
            <div class="loading-bar"></div>
            <div v-if="step === 1">
              <div class="personal-data-title">Dados Pessoais:</div>
              <PersonalData />
              <v-btn class="next-step-buttom" @click="nextStep">Próximo</v-btn>
            </div>

            <div v-if="step === 2">
              <div class="delivery-data-title">Dados de Entrega:</div>
              <DeliveryData />
              <v-btn class="back-step-buttom" @click="previousStep"
                >Voltar</v-btn
              >
              <v-btn class="next-step-buttom" @click="nextStep">Próximo</v-btn>
            </div>

            <div v-if="step === 3">
              <div class="payment-method-title">Método de Pagamento:</div>
              <PaymentMethod
                @close-modal="handleCloseModal"
                :cardName="cardName"
                :cardNumber="cardNumber"
                :cardMonth="cardMonth"
                :cardYear="cardYear"
                :cardCvv="cardCvv"
              />
              <v-btn class="back-step-buttom" @click="previousStep"
                >Voltar</v-btn
              >
              <v-btn class="finish-checkout-buttom" @click="submitOrder">
                Finalizar Compra
              </v-btn>
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
import logo from "@/assets/deep-space-store-logo.png";
import DeliveryData from "@/components/DeliveryData/DeliveryData.vue";
import OfferPage from "@/components/OfferPage/OfferPage.vue";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod.vue";
import PersonalData from "@/components/PersonalData/PersonalData.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    DeliveryData,
    PaymentMethod,
    PersonalData,
    OfferPage
  },
  data() {
    return {
      step: 1,
      percentage: 0,
      offer: null,
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      logo
    };
  },
  computed: {
    percent() {
      return `${this.percentage}%`;
    }
  },
  methods: {
    async fetchOffer(offerCode) {
      try {
        const response = await axios.get(`http://localhost:8080/${offerCode}`);
        this.offer = response.data;
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    updatePercentage(step) {
      this.percentage = [0, 50, 100][step - 1];
    },
    nextStep() {
      if (this.step < 3) {
        this.step += 1;
        this.updatePercentage(this.step);
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step -= 1;
        this.updatePercentage(this.step);
      }
    },
    submitOrder() {
      console.log("Submetendo pedido..."); // Verifique se isso aparece no console
      router.push("/success");
      console.log("Pedido submetido, redirecionando para /success");
    },
    handleCloseModal() {
      console.log("Modal de pagamento fechado");
    }
  },
  mounted() {
    const offerCode = this.$route.params.OFFER_CODE;
    console.log("Offer Code:", offerCode);
    if (offerCode) {
      this.fetchOffer(offerCode);
    } else {
      console.error("OFFER_CODE não foi encontrado.");
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
