<template>
  <v-card ref="offerPage" class="first-container">
    <v-card-title>
      <h2 class="title">{{ $t("offerPage.title") }}</h2>
    </v-card-title>
    <v-card-subtitle v-if="offer" class="offer-content">
      <v-img
        :src="offer.images[0]"
        max-height="300px"
        max-width="300px"
        contain
        class="centered-image"
      />
      <p class="description">{{ offer.description }}</p>
      <p class="items">
        <strong>{{ $t("offerPage.includedItems") }}:</strong>
      </p>
      <ul class="list">
        <li v-for="(item, index) in offer.items" :key="index">
          {{ item }}
        </li>
      </ul>
      <p class="price">
        <strong>{{ $t("offerPage.price") }}:</strong> R$
        {{ offer.price.toFixed(2) }}
      </p>
      <p class="payment">
        <strong class="payment-form"
          >{{ $t("offerPage.paymentMethods") }}:</strong
        >
        {{ offer.paymentMethods.join(", ") }}
      </p>
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <p>{{ $t("offerPage.loading") }}</p>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { getOrder } from "@/api/offers";

export default {
  data() {
    return {
      offer: null
    };
  },
  mounted() {
    this.fetchOffer();
  },
  methods: {
    async fetchOffer() {
      try {
        this.offer = await getOrder();
      } catch (error) {
        this.$toast(this.$t("checkoutPage.toast.fetchOffer"));
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
