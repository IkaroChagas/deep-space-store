<template>
  <div class="form-container">
    <v-form ref="form" v-model="valid" class="test">
      <v-text-field
        v-model="name"
        label="Nome Completo"
        class="name-field"
        :rules="[rules.required]"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        class="email-field"
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Telefone"
        v-mask="'(##) ##### ####'"
        class="phone-field"
        :rules="[rules.required]"
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
        email: (v) => /.+@.+\..+/.test(v) || "E-mail inválido"
      }
    };
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
