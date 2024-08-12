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
              <PersonalData ref="personalDataComponent" />
              <v-btn class="next-step-buttom" @click="nextStep">Próximo</v-btn>
            </div>

            <div v-if="step === 2">
              <div class="delivery-data-title">Dados de Entrega:</div>
              <DeliveryData ref="deliveryDataComponent" />
              <v-btn class="back-step-buttom" @click="previousStep"
                >Voltar</v-btn
              >
              <v-btn class="next-step-buttom" @click="nextStep">Próximo</v-btn>
            </div>

            <div v-if="step === 3">
              <div class="payment-method-title">Método de Pagamento:</div>
              <PaymentMethod ref="paymentMethodComponent" />
              <v-btn class="back-step-buttom" @click="previousStep"
                >Voltar</v-btn
              >
              <v-btn class="finish-checkout-buttom" @click="submitPaymentMethod"
                >Finalizar Compra</v-btn
              >
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
      logo,
      paymentMethod: {}
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
        const response = await axios.get(
          `https://api.deepspacestore.com/offers/${offerCode}`
        );
        this.offer = response.data;
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    updatePercentage(step) {
      this.percentage = [0, 50, 100][step - 1];
    },
    nextStep() {
      if (this.step === 1) {
        const isPersonalDataValid = this.$refs.personalDataComponent.isValid;
        if (!isPersonalDataValid) {
          this.$toast("Por favor, preencha todos os campos do formulário.");
          return;
        }
        const personalData = this.$refs.personalDataComponent;
        let form = {
          name: personalData.name,
          email: personalData.email,
          phone: personalData.phone
        };
        this.$store.commit("setPersonalData", form);
      }
      if (this.step === 2) {
        const isDeliveryDataValid = this.$refs.deliveryDataComponent.isValid;
        if (!isDeliveryDataValid) {
          this.$toast("Por favor, preencha todos os campos do formulário.");
          return;
        }
        const deliveryData = this.$refs.deliveryDataComponent;
        let form = {
          cep: deliveryData.cep,
          address: deliveryData.address,
          city: deliveryData.city,
          neighborhood: deliveryData.neighborhood,
          number: deliveryData.number
        };
        this.$store.commit("setDeliveryData", form);
      }
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
    async submitPaymentMethod(offerCode) {
      const isValid = this.$refs.paymentMethodComponent.submit();
      if (!isValid) {
        return;
      }
      const payload = {
        personalData: this.$store.state.personalData,
        deliveryData: this.$store.state.deliveryData,
        paymentData: this.$store.state.paymentData
      };
      try {
        await axios.post(payload)(
          `https://api.deepspacestore.com/offers/${offerCode}/create_order`,
          payload
        );
        this.$router.push({
          path: `/checkout/success/${this.$store.state.paymentData.paymentMethod}`
        });
      } catch (error) {
        console.error("Erro:", error);
        this.$toast("Erro ao fazer a compra!");
      }
    },
    mounted() {
      const offerCode = this.$route.params.OFFER_CODE;
      if (offerCode) {
        this.fetchOffer(offerCode);
      } else {
        console.error("OFFER_CODE não foi encontrado.");
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
