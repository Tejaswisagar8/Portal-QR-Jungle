<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-row justify="center">
      <v-dialog v-model="PurchaseQrDialog" persistent max-width="600px">
        <v-card class="currentFont">
          {{ StoreObj }}
          <v-card-title class="currentFont"
            ><p class="heading3 greenBlueColor">Purchase QR</p>
          </v-card-title>
          <v-card-text>
            <v-img
              class="mx-auto borderRadius20px"
              :width="350"
              :src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${StoreObj.qr_code_image_url_key}`"
            />
            <v-form ref="purchaseForm">
              <div class="mb-2 ml-2 mt-4 heading2">Provide redirect URL</div>
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
            <v-btn icon class="closeBtn" @click="PurchaseQrDialogEmit(1)"
              ><v-icon color="black">mdi-close-circle</v-icon></v-btn
            >
            <v-btn
              dark
              dense
              :loading="PaymentLoading"
              class="pa-3 text-capitalize"
              @click="createOrderMethod()"
            >
              Purchase ₹{{ StoreObj.price }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
// import { createOrder } from "@/graphql/mutations.js";
import { puchaseQr } from "@/graphql/mutations.js";
import { createOrder } from "@/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";

import Snackbar from "@/components/Extras/MySnackbar.vue";

export default {
  props: {
    PurchaseQrDialog: Boolean,
    StoreObj: Object,
  },

  components: { Snackbar },

  data() {
    return {
      PaymentLoading: false,
      redirectURL: "",
      SnackBarComponent: {},
    };
  },

  methods: {
    // This method doesn't involve payment option remove this method after payment is done
    // async createOrderMethod() {
    //   if (this.$refs.purchaseForm.validate()) {
    //     try {
    //       this.PaymentLoading = true;
    //       const result = await API.graphql(
    //         graphqlOperation(puchaseQr, {
    //           input: {
    //             qr_code_id: this.StoreObj.qr_code_id,
    //             price: this.StoreObj.price,
    //             utr_no: undefined,
    //             redirect_url: this.redirectURL,
    //           },
    //         })
    //       );
    //       const response = JSON.parse(result.data.puchaseQr);
    //       // console.log(response);
    //       if (response.status === 200) {
    //         this.SnackBarComponent = {
    //           SnackbarVModel: true,
    //           color: "green--text",
    //           Message: response.status_message,
    //           countdown: true,
    //         };
    //         this.PaymentLoading = false;
    //         this.PurchaseQrDialogEmit(2);
    //       }
    //       // console.log("PURCHASE_QR", result);
    //     } catch (error) {
    //       console.log("Error", error);
    //     }
    //   } else {
    // this.SnackBarComponent = {
    //   SnackbarVModel: true,
    //   color: "red--text",
    //   Message: "Kindly fill the form!",
    //   countdown: true,
    // };
    //   }
    // },

    async createOrderMethod() {
      if (this.$refs.purchaseForm.validate()) {
        try {
          this.PaymentLoading = true;
          console.warn(this.StoreObj.price);
          const result = await API.graphql(
            graphqlOperation(createOrder, {
              input: {
                amount: this.StoreObj.price,
                currency: "INR",
              },
            })
          );

          console.log("CREATE_ORDER_OUTPUT", result);
          let ResultObj = JSON.parse(result.data.createOrder);
          const amountInPaise = this.StoreObj.price * 100;
          console.warn(amountInPaise);
          if (ResultObj.status === "created") {
            var check = {
              amount: amountInPaise,
              currency: "INR",
              name: "Purchase QR",
              description: "Test",
              image: require("@/assets/main-logo.png"),
              order_id: ResultObj.id,
              handler: this.razorpayResponse,
              prefill: {
                name: "",
                // email: this.getCurrentUserDetails.business_details.business_contact_person_email_address,
                contact: "6363151733",
              },
              notes: {
                address: "",
              },
              theme: {
                color: "#fdcb0a",
              },
            };
            var rzp1 = new Razorpay(check);
            rzp1.on("payment.failed", this.razorpayResponse);
            rzp1.open();
            this.PaymentLoading = false;
          } else {
            //
          }
          this.PaymentLoading = false;
        } catch (error) {
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

    async razorpayResponse(response) {
      if (response.hasOwnProperty("error")) {
        console.log("Error");
      } else {
        const razorpayPaymentId = response.razorpay_payment_id;
        try {
          const result = await API.graphql(
            graphqlOperation(puchaseQr, {
              input: {
                qr_code_id: this.StoreObj.qr_code_id,
                price: this.StoreObj.price,
                utr_no: razorpayPaymentId,
                redirect_url: this.redirectURL,
              },
            })
          );
          console.log("PURCHASE_QR_API_RESULT", result);
        } catch (error) {
          console.log("Error", error);
        }
      }
    },

    PurchaseQrDialogEmit(Toggle) {
      this.$refs.purchaseForm.reset();
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

.currentFont {
  font-family: "Josefin Sans", sans-serif;
}
</style>
