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
        <v-radio
          id="radio-boleto"
          :label="$t('paymentMethhodComponent.labels.boleto')"
          value="boleto"
        ></v-radio>
        <v-radio
          id="radio-credit-card"
          :label="$t('paymentMethhodComponent.labels.creditCard')"
          value="card"
        ></v-radio>
        <v-radio
          id="radio-pix"
          :label="$t('paymentMethhodComponent.labels.pix')"
          value="pix"
        ></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="cpf"
        class="cpf-input"
        :label="$t('paymentMethhodComponent.labels.cpf')"
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
            :label="$t('paymentMethhodComponent.labels.cardNumber')"
            :rules="[rules.cardNumber]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="name"
            class="card-name"
            id="credit-card-name-input"
            :label="$t('paymentMethhodComponent.labels.cardHolderName')"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="validCard"
            class="card-valid"
            id="credit-card-valid-input"
            v-mask="'##/##'"
            :label="$t('paymentMethhodComponent.labels.cardExpiry')"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            v-model="cvv"
            id="credit-card-cvv-input"
            class="card-cvv"
            v-mask="'###'"
            :label="$t('paymentMethhodComponent.labels.cvv')"
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
        required: (v) =>
          !!v || this.$t("paymentMethhodComponent.toast.requiredField"),
        cpf: (v) =>
          validateCPF(v) || this.$t("paymentMethhodComponent.toast.invalidCPF"),
        cardNumber: (v) =>
          v.length === 19 || this.$t("paymentMethhodComponent.toast.cardNumber")
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
        this.$toast(this.$t("paymentMethhodComponent.toast.invalidCPF"));
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
          this.$toast(this.$t("paymentMethhodComponent.toast.paymentError"));
          return false;
      }
      try {
        const response = await this.$store.dispatch("submitOrder", form);
        if (response.status === 400) {
          const responseData = await response.json();
          if (responseData.message === "CPF inválido") {
            this.$toast(this.$t("paymentMethhodComponent.toast.invalidCPF"));
            return false;
          }
        }
        return true;
      } catch (error) {
        this.$toast(this.$t("paymentMethhodComponent.toast.submitError"));
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
