<template>
  <div class="form-container">
    <v-form ref="form">
      <v-text-field
        v-model="cep"
        label="CEP*"
        required
        @blur="fetchAddress"
      ></v-text-field>
      <v-text-field v-model="address" label="Endereço*" required></v-text-field>
      <v-text-field v-model="number" label="Número*" required></v-text-field>
      <v-text-field
        v-model="neighborhood"
        label="Bairro*"
        required
      ></v-text-field>
      <v-text-field v-model="city" label="Cidade*" required></v-text-field>
    </v-form>
  </div>
</template>

<script>
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
        required: (v) => !!v || "Campo obrigatório"
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
    fetchAddress() {
      const cep = this.cep.replace(/\D/g, "");

      if (cep !== "") {
        const validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
          this.address = "Buscando...";
          this.neighborhood = "Buscando...";
          this.city = "Buscando...";

          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              if (!data.erro) {
                this.address = data.logradouro || "";
                this.neighborhood = data.bairro || "";
                this.city = data.localidade || "";
              } else {
                this.clearForm();
                this.$toast("CEP não encontrado.");
              }
            })
            .catch((error) => {
              console.error("Erro ao buscar endereço:", error);
              this.clearForm();
              this.$toast("Erro ao buscar endereço.");
            });
        } else {
          this.clearForm();
          this.$toast("Formato de CEP inválido.");
        }
      } else {
        this.clearForm();
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.$refs.form);
        this.$emit("next");
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
