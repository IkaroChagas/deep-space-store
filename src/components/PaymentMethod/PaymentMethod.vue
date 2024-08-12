<template>
  <div class="form-container">
    <v-form ref="form" v-model="valid">
      <v-radio-group
        v-model="paymentMethod"
        class="payment-input"
        id="radio-payment-method"
        :rules="[rules.required]"
        required
      >
        <v-radio id="radio-boleto" label="Boleto" value="boleto"></v-radio>
        <v-radio
          id="radio-credit-card"
          label="Cartão de Crédito"
          value="card"
        ></v-radio>
        <v-radio id="radio-pix" label="Pix" value="pix"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="cpf"
        class="cpf-input"
        label="CPF*"
        id="cpf-input"
        v-mask="'###.###.###-##'"
        :rules="[rules.cpf]"
        required
      ></v-text-field>

      <v-row v-if="paymentMethod === 'card'" class="credit-card-fields">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="cardNumber"
            id="credit-card-number-input"
            class="card-input"
            v-mask="'#### #### #### ####'"
            label="Número do Cartão*"
            :rules="[rules.cardNumber]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="name"
            class="card-name"
            id="credit-card-name-input"
            label="Nome do titular*"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="validCard"
            class="card-valid"
            id="credit-card-valid-input"
            v-mask="'##/##'"
            label="MM/AA*"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="cvv"
            id="credit-card-cvv-input"
            class="card-cvv"
            v-mask="'###'"
            label="CVV*"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { validateCPF } from "@/utils/cpfValidator";

export default {
  data() {
    return {
      paymentMethod: "",
      cpf: "",
      cardNumber: "",
      name: "",
      validCard: "",
      cvv: "",
      valid: false,
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        cpf: (v) => validateCPF(v) || "CPF inválido",
        cardNumber: (v) => v.length === 19 || "Número do cartão inválido"
      }
    };
  },
  computed: {
    isValid() {
      return this.$refs.form.validate();
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const form = {
          paymentMethod: this.paymentMethod,
          cpf: this.cpf,
          cardNumber: this.cardNumber,
          name: this.name,
          validCard: this.validCard,
          cvv: this.cvv
        };
        this.$store.commit("setPaymentMethod", form);
        return true;
      } else {
        this.$toast("Preencha todos os campos corretamente.");
        return false;
      }
    },
    async payloadData() {
      let form = {};
      switch (this.paymentMethod) {
        case "boleto":
          form = {
            paymentMethod: "boleto",
            cpf: this.cpf
          };
          break;

        case "pix":
          form = {
            paymentMethod: "pix",
            cpf: this.cpf
          };
          break;

        case "card":
          form = {
            paymentMethod: "card",
            cpf: this.cpf,
            cardNumber: this.cardNumber,
            name: this.name,
            validCard: this.validCard,
            cvv: this.cvv
          };
          break;

        default:
          this.$toast("Método de pagamento não suportado");
          return false;
      }
      try {
        const response = await this.$store.dispatch("submitOrder", form);
        if (
          response.status === 400 &&
          response.data.message === "CPF inválido"
        ) {
          this.$toast("CPF inválido.");
          return false;
        }
        return true;
      } catch (error) {
        this.$toast("Erro ao enviar pedido.");
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
