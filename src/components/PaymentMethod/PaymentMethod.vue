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

      <v-dialog
        v-model="isCreditCardModalOpen"
        max-width="500px"
        @click:outside="closeCreditCardModal"
      >
        <v-card>
          <v-card-title>Insira os dados do cartão:</v-card-title>
          <v-card-text>
            <CreditCard
              ref="cardComponent"
              :cardName="cardName"
              :cardNumber="cardNumber"
              :cardMonth="cardMonth"
              :cardYear="cardYear"
              :cardCvv="cardCvv"
              @update-card-data="updateCardData"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn class="cancel-buttom" @click="closeCreditCardModal">
              Cancelar
            </v-btn>
            <v-btn class="save-buttom" @click="saveAndCloseModal">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import CreditCard from "@/components/CreditCard/CreditCard.vue";

export default {
  components: {
    CreditCard
  },
  data() {
    return {
      paymentMethod: "",
      cpf: "",
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      valid: true,
      isCreditCardModalOpen: false,
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        cpf: (v) => /^\d{11}$/.test(v) || "CPF inválido"
      }
    };
  },
  watch: {
    paymentMethod(newValue) {
      if (newValue === "card") {
        this.isCreditCardModalOpen = true;
      }
    }
  },
  methods: {
    closeCreditCardModal() {
      this.isCreditCardModalOpen = false;
    },
    saveAndCloseModal() {
      const cardComponent = this.$refs.cardComponent;
      const isCardFormValid = cardComponent.validateCardForm();

      if (isCardFormValid) {
        const cardData = {
          cardName: this.cardName,
          cardNumber: this.cardNumber,
          cardMonth: this.cardMonth,
          cardYear: this.cardYear,
          cardCvv: this.cardCvv
        };

        this.$store.commit("setCardData", cardData);
        this.$emit("save-card-info", cardData);
        this.closeCreditCardModal();
      } else {
        console.log("Formulário do cartão de crédito inválido");
      }
    },
    updateCardData(cardData) {
      this.cardName = cardData.cardName;
      this.cardNumber = cardData.cardNumber;
      this.cardMonth = cardData.cardMonth;
      this.cardYear = cardData.cardYear;
      this.cardCvv = cardData.cardCvv;
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
