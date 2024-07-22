<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-row justify="center">
      <v-dialog v-model="EditPurchasedQrDialog" persistent max-width="600px">
        <v-card class="currentFont">
          <v-card-title class="currentFont"
            ><p class="heading3 greenBlueColor">Edit Redirect URL</p>
          </v-card-title>
          <v-card-text>
            <v-form ref="editURLForm">
              <div class="mb-2 ml-2 mt-4 heading2">Change redirect URL</div>
              <v-text-field
                v-model="redirectURL"
                dense
                rounded
                outlined
                label="Eg: https://www.qrjungle.com"
                :rules="[(v) => !!v || 'Required']"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon class="closeBtn" @click="EditPurchasedQrDialogEmit(1)"
              ><v-icon color="black">mdi-close-circle</v-icon></v-btn
            >
            <v-btn
              dark
              dense
              :loading="saveBtnLoader"
              class="pa-3 text-capitalize"
              @click="editRedirectURLMethod()"
            >
              Save<v-icon color="white" size="17" class="pl-1"
                >mdi-bookmark</v-icon
              >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-dialog v-model="EditPurchasedQrDialog" persistent :width="600">
        <v-card class="purchaseQrCard">
          <v-card-title class="text-h5">
            <span style="color: #fdcb0a">Edit Redirect URL</span>
            <v-btn icon class="closeBtn" @click="EditPurchasedQrDialogEmit(1)"
              ><v-icon color="white">mdi-close-circle</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text class="white--text">
            <v-form>
              <div class="mb-2 ml-2 mt-4">Change redirect URL</div>
              <v-text-field
                color="white"
                v-model="redirectURL"
                dense
                rounded
                outlined
                label="Eg: https://www.qrjungle.com"
                dark
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="background-color: #fdcb0a; color: black"
              rounded
              dense
              :loading="saveBtnLoader"
              class="pa-3 text-capitalize"
              @click="editRedirectURLMethod()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-row>
  </div>
</template>

<script>
// import { createOrder } from "@/graphql/mutations.js";
import { editRedirectUrl } from "@/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";

import Snackbar from "@/components/Extras/MySnackbar.vue";
export default {
  props: {
    EditPurchasedQrDialog: Boolean,
    StoreObj: Object,
  },
  components: { Snackbar },
  data() {
    return {
      PaymentLoading: false,
      redirectURL: "",
      saveBtnLoader: false,
      SnackBarComponent: {},
    };
  },

  watch: {
    EditPurchasedQrDialog(val) {
      if (val) {
        this.redirectURL = this.StoreObj.redirect_url;
      }
    },
  },

  methods: {
    async editRedirectURLMethod() {
      if (this.$refs.editURLForm.validate()) {
        try {
          this.saveBtnLoader = true;
          const result = await API.graphql(
            graphqlOperation(editRedirectUrl, {
              input: {
                qr_code_id: this.StoreObj.qr_code_id,
                redirect_url: this.redirectURL,
              },
            })
          );
          // console.log("RESSS", JSON.parse(result.data.editRedirectUrl));
          const response = JSON.parse(result.data.editRedirectUrl);
          if (response.status === 200) {
            this.SnackBarComponent = {
              SnackbarVModel: true,
              color: "green--text",
              Message: response.status_message,
            };
            this.saveBtnLoader = false;
            this.EditPurchasedQrDialogEmit(2);
          }
        } catch (error) {
          this.saveBtnLoader = false;
          console.log("Error", error);
        }
      } else {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Kindly fill the form!",
          countdown: true,
        };
      }
    },
    EditPurchasedQrDialogEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
  },
};
</script>

<style scoped>
.purchaseQrCard {
  background-color: black;
}

.closeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
