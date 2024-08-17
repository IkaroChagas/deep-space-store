<template>
  <div class="success-page">
    <v-container class="container">
      <v-row class="align-center">
        <v-col cols="auto">
          <v-img :src="logo" alt="Logo" class="logo-image"></v-img>
        </v-col>
        <v-col>
          <h1 class="app-title">{{ $t("successPage.title") }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col>
          <v-card class="pa-4">
            <v-card-title class="title">
              {{ $t("successPage.subtitle") }}
            </v-card-title>
            <v-card-text>
              <div class="card" v-if="paymentMethod === 'card'">
                {{ $t("successPage.cardMethod") }}
                <v-img
                  :src="successImage"
                  class="success-image"
                  contain
                ></v-img>
              </div>
              <div class="pix" v-else-if="paymentMethod === 'pix'">
                {{ $t("successPage.pixMethod") }}
                <v-img :src="qRCodeImage" class="qrcode-image" contain></v-img>
              </div>
              <div class="boleto" v-else-if="paymentMethod === 'boleto'">
                {{ $t("successPage.boletoMethod") }}
                <v-img
                  :src="barcodeImage"
                  class="barcode-image"
                  contain
                ></v-img>
              </div>
              <div v-else>{{ $t("successPage.unknownMethod") }}</div>
            </v-card-text>
            <v-btn class="buttom" @click="goBack">{{
              $t("successPage.backButton")
            }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import barcodeImage from "@/assets/bar-code.png";
import logo from "@/assets/deep-space-store-logo.png";
import qRCodeImage from "@/assets/qr-code.png";
import successImage from "@/assets/success.png";

export default {
  data() {
    const paymentMethod = this.$route.params.paymentMethod;
    return {
      paymentMethod: paymentMethod || "",
      barcodeImage: barcodeImage,
      logo: logo,
      successImage: successImage,
      qRCodeImage: qRCodeImage
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
