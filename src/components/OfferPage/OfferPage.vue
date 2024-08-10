<template>
  <v-card class="first-container">
    <v-card-title>
      <h2>Detalhes do Produto</h2>
    </v-card-title>
    <v-card-subtitle v-if="offer">
      <v-img :src="offer.images[0]" height="400px" />
      <p>{{ offer.description }}</p>
      <p><strong>Itens Inclusos:</strong></p>
      <ul>
        <li v-for="(item, index) in offer.items" :key="index">
          {{ item }}
        </li>
      </ul>
      <p><strong>Preço:</strong> R$ {{ offer.price.toFixed(2) }}</p>
      <p>
        <strong>Formas de Pagamento:</strong>
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
      offer: ""
    };
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
