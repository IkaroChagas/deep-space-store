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
        label="CPF*"
        :rules="[rules.cpf]"
        required
      ></v-text-field>

      <v-row v-if="paymentMethod === 'card'" class="credit-card-fields">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="cardNumber"
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
            label="Nome do titular*"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="validCard"
            class="card-valid"
            v-mask="'##/##'"
            label="MM/AA*"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="cvv"
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
        cpf: (v) => /^\d{11}$/.test(v) || "CPF inválido"
      }
    };
  },
  computed: {
    isValid() {
      return this.$refs.form.validate();
    }
  },
  methods: {
    validateCPF(cpf) {
      const cleanCPF = cpf.replace(/[^\d]/g, "");

      if (cleanCPF === "000.000.000-00") {
        this.$toast("CPF inválido.");
        return true;
      }

      if (cleanCPF.length !== 11) {
        this.$toast("CPF deve ter 11 dígitos.");
        return true;
      }

      return true;
    },

    submit() {
      if (!this.cpf) {
        this.$toast("CPF é obrigatório para finalizar a compra.");
        return;
      }

      if (!this.validateCPF(this.cpf)) {
        return;
      }

      if (this.$refs.form.validate()) {
        this.payloadData();
        return true;
      } else {
        this.$toast("Preencha todos os campos corretamente.");
        return false;
      }
    },
    payloadData() {
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
          return;
      }

      this.$store.commit("setPaymentMethod", form);
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
