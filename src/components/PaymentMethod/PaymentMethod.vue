<template>
  <div class="form-container">
    <v-form ref="form" v-model="valid">
      <v-radio-group
        v-model="paymentMethod"
        class="payment-input"
        :rules="[rules.required]"
        required
      >
        <v-radio label="Boleto" value="boleto"></v-radio>
        <v-radio label="Cartão de Crédito" value="card"></v-radio>
        <v-radio label="Pix" value="pix"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="cpf"
        class="cpf-input"
        label="CPF"
        :rules="[rules.cpf]"
        required
      ></v-text-field>

      <v-text-field
        v-if="paymentMethod === 'card'"
        v-model="cardNumber"
        class="card-input"
        v-mask="'#### #### #### ####'"
        label="Número do Cartão"
        :rules="[rules.cardNumber]"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import { isValidCreditCardNumber } from "creditcards-types";

export default {
  components: {},
  data() {
    return {
      paymentMethod: "",
      cpf: "",
      cardNumber: "",
      valid: false,
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        cpf: (v) => /^\d{11}$/.test(v) || "CPF inválido",
        cardNumber: (v) =>
          isValidCreditCardNumber(v) || "Número de cartão inválido"
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("finish");
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
