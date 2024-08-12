<template>
  <div class="form-container">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="name"
        id="name-input"
        label="Nome Completo*"
        class="name-field"
        :rules="[rules.required]"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        id="email-input"
        label="E-mail"
        class="email-field"
        :rules="[rules.email]"
      ></v-text-field>
      <v-text-field
        v-model="phone"
        id="phone-input"
        label="Telefone*"
        v-mask="'(##) ##### ####'"
        class="phone-field"
        :rules="[rules.phoneRule]"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      valid: false,
      rules: {
        required: (v) => !!v || "Campo obrigatório",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        phoneRule: (v) =>
          (v && v.length >= 11) || "Telefone deve ter pelo menos 11 dígitos"
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
        this.$emit("next");
      }
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
