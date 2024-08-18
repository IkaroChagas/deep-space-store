<template>
  <v-container class="container" fluid>
    <v-row class="align-center">
      <v-col cols="auto">
        <v-img :src="logo" alt="Logo" class="logo-image"></v-img>
      </v-col>
      <v-col>
        <h1 class="app-title">{{ $t("checkoutPage.title") }}</h1>
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
            <h2 class="second-title">{{ $t("checkoutPage.subtitle") }}</h2>
          </v-card-title>
          <v-card-subtitle>
            <div class="percetage-value">{{ percent }}</div>
            <div
              class="percentage"
              :style="{ width: percent, marginTop: '10px' }"
            ></div>
            <div class="loading-bar"></div>
            <div v-if="step === 1">
              <div class="personal-data-title">
                {{ $t("checkoutPage.personalDataTitle") }}
              </div>
              <PersonalData ref="personalDataComponent" />
              <v-btn class="next-step-buttom" @click="nextStep">{{
                $t("checkoutPage.nextButtom")
              }}</v-btn>
            </div>

            <div v-if="step === 2">
              <div class="delivery-data-title">
                {{ $t("checkoutPage.deliveryDataTitle") }}
              </div>
              <DeliveryData ref="deliveryDataComponent" />
              <v-btn class="back-step-buttom" @click="previousStep">{{
                $t("checkoutPage.backButtom")
              }}</v-btn>
              <v-btn class="next-step-buttom" @click="nextStep">{{
                $t("checkoutPage.nextButtom")
              }}</v-btn>
            </div>

            <div v-if="step === 3">
              <div class="payment-method-title">
                {{ $t("checkoutPage.paymentDataTitle") }}
              </div>
              <PaymentMethod ref="paymentMethodComponent" />
              <v-btn class="back-step-buttom" @click="previousStep">{{
                $t("checkoutPage.backButtom")
              }}</v-btn>
              <v-btn
                class="finish-checkout-buttom"
                @click="submitPaymentMethod"
                >{{ $t("checkoutPage.finishCheckoutButtom") }}</v-btn
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
import { getOffer, postOffer } from "@/api/offers";
import logo from "@/assets/deep-space-store-logo.png";
import DeliveryData from "@/components/DeliveryData/DeliveryData.vue";
import OfferPage from "@/components/OfferPage/OfferPage.vue";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod.vue";
import PersonalData from "@/components/PersonalData/PersonalData.vue";

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
        this.offer = await getOffer(offerCode);
      } catch (error) {
        this.$toast(this.$t("checkoutPage.toast.fetchOffer"));
      }
    },
    updatePercentage(step) {
      this.percentage = [0, 50, 100][step - 1];
    },
    nextStep() {
      if (this.step === 1) {
        const isPersonalDataValid = this.$refs.personalDataComponent.isValid;
        if (!isPersonalDataValid) {
          this.$toast(this.$t("checkoutPage.toast.warningStep"));
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
          this.$toast(this.$t("checkoutPage.toast.warningStep"));
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
    async submitPaymentMethod() {
      const isValid = this.$refs.paymentMethodComponent.submit();
      if (!isValid) {
        return;
      }

      const payload = {
        personalData: this.$store.state.personalData,
        deliveryData: this.$store.state.deliveryData,
        paymentData: this.$store.state.paymentMethod
      };

      try {
        const offerCode = this.$route.params.OFFER_CODE;
        await postOffer(offerCode, payload);
        const paymentMethod = this.$store.state.paymentMethod.paymentMethod;
        this.$router.push({
          path: `/checkout/success/${paymentMethod}`
        });
      } catch (error) {
        if (error.status === 400) {
          const errorMessage = error.data;
          this.$toast(errorMessage);
        } else {
          this.$toast(this.$t("checkoutPage.toast.submitError"));
        }
      }
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
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
