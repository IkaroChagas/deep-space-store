<template>
  <div id="credit-card-component">
    <vue-paycard
      :input-fields="inputs"
      :value-fields="valueFields"
      :labels="labels"
      :has-random-backgrounds="false"
      :is-card-number-masked="false"
    />
    <v-form v-model="valid" ref="form" class="card-number">
      <v-text-field
        v-model="localCardNumber"
        v-mask="'#### #### #### ####'"
        label="Número do Cartão"
        :rules="[rules.required, rules.cardNumber]"
        required
      ></v-text-field>

      <v-text-field
        v-model="localCardName"
        label="Nome do Titular"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="localCardMonth"
        v-mask="'##'"
        label="Mês de Expiração (MM)"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="localCardYear"
        v-mask="'##'"
        label="Ano de Expiração (AA)"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="localCardCvv"
        v-mask="'###'"
        label="CVV"
        :rules="[rules.required, rules.cvv]"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import { VuePaycard } from "vue-paycard";

const rules = {
  required: (v) => !!v || "Campo obrigatório",
  cardNumber: (v) => (v && /^\d{16}$/.test(v)) || "Número do cartão inválido",
  cvv: (v) => (v && /^\d{3}$/.test(v)) || "CVV inválido"
};

export default {
  components: {
    "vue-paycard": VuePaycard
  },
  props: {
    cardName: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    cardMonth: {
      type: String,
      required: true
    },
    cardYear: {
      type: String,
      required: true
    },
    cardCvv: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localCardNumber: this.cardNumber,
      localCardName: this.cardName,
      localCardMonth: this.cardMonth,
      localCardYear: this.cardYear,
      localCardCvv: this.cardCvv,
      valid: false,
      rules
    };
  },
  methods: {
    validateCardForm() {
      return this.$refs.form.validate();
    },
    updateCardData() {
      this.$emit("update-card-data", {
        cardName: this.localCardName,
        cardNumber: this.localCardNumber,
        cardMonth: this.localCardMonth,
        cardYear: this.localCardYear,
        cardCvv: this.localCardCvv
      });
    }
  },
  computed: {
    inputs() {
      return {
        cardNumber: "v-card-number",
        cardName: "v-card-name",
        cardMonth: "v-card-month",
        cardYear: "v-card-year",
        cardCvv: "v-card-cvv"
      };
    },
    labels() {
      return {
        cardName: "Nome do Titular",
        cardHolder: "Nome no Cartão",
        cardMonth: "MM",
        cardYear: "AA",
        cardExpires: "Validade",
        cardCvv: "CVV"
      };
    },
    valueFields() {
      return {
        cardName: this.localCardName,
        cardNumber: this.localCardNumber,
        cardMonth: this.localCardMonth,
        cardYear: this.localCardYear,
        cardCvv: this.localCardCvv
      };
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
