<template>
  <v-card ref="offerPage" class="first-container">
    <v-card-title>
      <h2 class="title">Detalhes do Produto</h2>
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
      <p class="items"><strong>Itens Inclusos:</strong></p>
      <ul class="list">
        <li v-for="(item, index) in offer.items" :key="index">
          {{ item }}
        </li>
      </ul>
      <p class="price">
        <strong>Preço:</strong> R$ {{ offer.price.toFixed(2) }}
      </p>
      <p class="payment">
        <strong class="payment-form">Formas de Pagamento:</strong>
        {{ offer.paymentMethods.join(", ") }}
      </p>
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <p>Carregando...</p>
    </v-card-subtitle>
  </v-card>
</template>

<script>
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
        const response = await fetch("https://api.deepspacestore.com/offers/1");
        const data = await response.json();
        this.offer = data;
      } catch (error) {
        console.error("Erro ao carregar oferta:", error);
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
