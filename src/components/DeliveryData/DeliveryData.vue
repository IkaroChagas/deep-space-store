<template>
  <div class="form-container">
    <v-form ref="form">
      <v-text-field
        id="zipcode-input"
        v-model="cep"
        :label="$t('deliveryDataComponent.labels.cep')"
        required
        @blur="fetchAddress"
      ></v-text-field>
      <v-text-field
        id="address-input"
        v-model="address"
        :label="$t('deliveryDataComponent.labels.address')"
        required
      ></v-text-field>
      <v-text-field
        id="address-number-input"
        v-model="number"
        :label="$t('deliveryDataComponent.labels.number')"
        required
      ></v-text-field>
      <v-text-field
        v-model="neighborhood"
        id="neighborhood-input"
        :label="$t('deliveryDataComponent.labels.neighborhood')"
        required
      ></v-text-field>
      <v-text-field
        id="city-input"
        v-model="city"
        :label="$t('deliveryDataComponent.labels.city')"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import { fetchAddressByCep } from "@/api/address";

export default {
  data() {
    return {
      cep: "",
      address: "",
      number: "",
      neighborhood: "",
      city: "",
      valid: false,
      rules: {
        required: (v) =>
          !!v || this.$t("deliveryDataComponent.toast.requiredField")
      }
    };
  },
  computed: {
    isValid() {
      return this.$refs.form.validate();
    }
  },
  methods: {
    clearForm() {
      this.address = "";
      this.neighborhood = "";
      this.city = "";
    },
    async fetchAddress() {
      const cep = this.cep.replace(/\D/g, "");

      if (cep !== "") {
        const validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
          this.address = this.$t(
            "deliveryDataComponent.placeholders.searching"
          );
          this.neighborhood = this.$t(
            "deliveryDataComponent.placeholders.searching"
          );
          this.city = this.$t("deliveryDataComponent.placeholders.searching");

          try {
            const data = await fetchAddressByCep(cep);
            this.address = data.logradouro || "";
            this.neighborhood = data.bairro || "";
            this.city = data.localidade || "";
          } catch (error) {
            this.clearForm();
            this.$toast(
              error.message ||
                this.$t("deliveryDataComponent.toast.fetchAddressError")
            );
          }
        } else {
          this.clearForm();
          this.$toast(this.$t("deliveryDataComponent.toast.invalidCep"));
        }
      } else {
        this.clearForm();
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("next");
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
