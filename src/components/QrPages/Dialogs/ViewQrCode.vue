<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="ViewQrCodeDialog" persistent :width="600">
        <v-card class="currentFont">
            <v-card-title class="currentFont"
            ><p class="heading3 greenBlueColor">View QR</p>
          </v-card-title>
          <v-card-text>
            <v-img class="mx-auto borderRadius20px" :width="350"
              :src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${StoreObj.qr_code_image_url_key}`"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon class="closeBtn" @click="ViewQrCodeDialogEmit(1)"
              ><v-icon color="black">mdi-close-circle</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    ViewQrCodeDialog: Boolean,
    StoreObj: Object,
  },

  watch: {
    ViewQrCodeDialog(val) {
      if (val) {
        console.log("VIEWW", this.StoreObj);
      }
    },
  },

  methods: {
    ViewQrCodeDialogEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
  },
};
</script>

<style scoped>
.closeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
