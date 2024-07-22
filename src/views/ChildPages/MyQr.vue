<template>
  <div class="currentFont">
    <NavbarSection />
    <EditPurchasedQr
      :EditPurchasedQrDialog="EditPurchasedQrDialog"
      :StoreObj="StoreObj"
      @clicked="EditPurchasedQrDialogEmit"
    />
    <section id="first-section">
      <v-container fluid class="pa-0 sec1Container">
        <v-row>
          <v-col lg="4" md="4" sm="6" xs="12" class="sec2Col1">
            <span class="heading1">Your QRs</span>
            <p class="pt-2 text-justify">
              Keep all your important QR codes at your fingertips with our My QR
              Content feature. Easily access and manage all your QR codes in one
              place.
            </p>

            <div>
              <v-btn
                dark
                dense
                class="mt-2 text-capitalize"
                @click="navigateToSection()"
                >Explore QRs</v-btn
              >
            </div>
            <!-- <v-btn dark dense class="mt-2">Login</v-btn> -->
          </v-col>

          <v-col
            lg="8"
            md="8"
            sm="6"
            xs="12"
            class="d-flex justify-center sec2Col2"
          >
            <v-img
              class="borderRadius20px transformedImg"
              max-width="220px"
              src="@/assets/pic1.jpg"
            />
            <v-img
              class="borderRadius20px transformedImg"
              max-width="220px"
              src="@/assets/pic3.jpg"
            />
            <v-img
              class="borderRadius20px transformedImg"
              max-width="220px"
              src="@/assets/pic5.jpg"
            />
            <v-img
              class="borderRadius20px transformedImg"
              max-width="220px"
              src="@/assets/pic2.jpg"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="second-section" ref="secondSection">
      <v-container fluid class="pa-0 sec2Container">
        <div class="d-flex justify-center">
          <span class="heading1 text-center mb-6 textDecorations">My QRs</span>
        </div>
        <v-row justify="center" align="center">
          <div class="text-center" v-if="disableLoader !== true">
            <v-progress-circular
              indeterminate
              color="grey"
              width="2"
              size="25"
            ></v-progress-circular>
          </div>
          <v-col
            v-for="(item, idx) in myPurchasedQrData"
            :key="idx"
            cols="auto"
            class="pa-3"
          >
            <div class="hover-container">
              <v-card elevation="0" class="pa-0 borderRadius20px">
                <v-hover v-slot="{ hover }">
                  <v-img
                    :width="160"
                    :height="160"
                    :src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${item.qr_code_image_url_key}`"
                    class="borderRadius20px"
                  >
                    <div v-if="hover" class="overlay">
                      <div class="flex-class hoverBtns">
                        <div>
                          <v-btn icon @click="editPurchasedQrMethod(item)">
                            <v-icon size="20" :key="idx" color="white"
                              >mdi-pencil</v-icon
                            >
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-img>
                </v-hover>
                <v-card-text class="text-center">
                  <span class="heading2 text-capitalize">{{
                    item.qr_code_category
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <h1
            v-if="myPurchasedQrDataLength === 0"
            class="text-center heading2 mt-5"
          >
            You have no purchased QRs!
          </h1>
          <v-btn
            v-if="myPurchasedQrDataLength === 0"
            dense
            dark
            class="text-capitalize mt-3"
            style="max-width: 130px"
            @click="$router.push('/homepage')"
            >Buy now<v-icon size="17" class="pl-1">mdi-cart</v-icon></v-btn
          >
        </v-row>
        <!-- <div class="text-center mt-5">
          <v-pagination
            v-model="page"
            :length="pageCount"
            circle
            color="black"
          />
        </div> -->
      </v-container>
    </section>
    <div>
      <FooterSection />
    </div>
  </div>
</template>

<script>
import NavbarSection from "@/views/MainPages/Navbar.vue";
import Snackbar from "@/components/Extras/MySnackbar.vue";
import EditPurchasedQr from "@/components/Extras/MyQr/EditPurchasedQr.vue";
import FooterSection from "@/views/ChildPages/FooterSection.vue";

import { listMyQrs } from "@/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: {
    NavbarSection,
    Snackbar,
    EditPurchasedQr,
    FooterSection,
  },

  data() {
    return {
      myPurchasedQrData: [],
      myPurchasedQrDataLength: [],
      emptyQr: false,
      EditPurchasedQrDialog: false,
      StoreObj: {},
      SnackBarComponent: {},
      disableLoader: undefined,
    };
  },

  mounted() {
    this.getMyQrMethod();
  },

  methods: {
    async getMyQrMethod() {
      try {
        const result = await API.graphql(graphqlOperation(listMyQrs));
        this.myPurchasedQrData = JSON.parse(result.data.listMyQrs);
        console.log("GET_MY_PURCHASED_QR", JSON.parse(result.data.listMyQrs));
        if (this.myPurchasedQrData.status === 404) {
          this.myPurchasedQrDataLength = 0;
        } else {
          this.myPurchasedQrDataLength = this.myPurchasedQrData.length;
        }
        this.disableLoader = true;
      } catch (error) {
        this.myPurchasedQrDataLength = 0;
        this.disableLoader = true;
        console.log("Error", error);
      }
    },

    navigateToSection() {
      this.$refs.secondSection.scrollIntoView({ behavior: "smooth" });
    },

    editPurchasedQrMethod(data) {
      this.EditPurchasedQrDialog = true;
      this.StoreObj = data;
    },

    EditPurchasedQrDialogEmit(Toggle) {
      this.EditPurchasedQrDialog = false;
      if (Toggle === 2) {
        this.getMyQrMethod();
      }
    },
  },
};
</script>

<style scoped>
.sec1Container {
  background-color: #dddddd;
  padding-top: 150px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-bottom: 100px !important;
}

.sec2Container {
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.hoverBtns {
  position: absolute;
  right: 5px;
  top: 2px;
}

.textDecorations {
  text-decoration: underline #006769;
  text-underline-offset: 4px;
}
</style>
