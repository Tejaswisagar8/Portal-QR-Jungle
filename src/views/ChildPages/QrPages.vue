<template>
  <div class="currentFont">
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <NavbarSection />
    <PurchaseQr
      :PurchaseQrDialog="PurchaseQrDialog"
      :StoreObj="StoreObj"
      @clicked="PurchaseQrDialogEmit"
    />
    <ViewQrCode
      :ViewQrCodeDialog="ViewQrCodeDialog"
      :StoreObj="StoreObj"
      @clicked="ViewQrCodeDialogEmit"
    />
    <section id="first-section">
      <v-container fluid class="pa-0 sec1Container">
        <v-row>
          <v-col lg="4" md="4" sm="6" xs="12" class="sec2Col1">
            <span class="heading1"
              >Dive Into Our
              <span class="text-capitalize">"{{ categoryName }}"</span> QR
              Collection!</span
            >
            <p class="pt-2 text-justify">
              Check out the various QR codes listed below, each designed to fit
              different <span>{{ categoryName }}</span
              >-related needs.
            </p>
            <v-btn
              dark
              dense
              class="mt-2 text-capitalize"
              @click="navigateToSection()"
              ><span>Explore QRs</span></v-btn
            >
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
        <div class="mb-10">
          <p class="heading1 text-center textDecorations">All QRs</p>
          <p class="text-center heading3 text-capitalize greyColor">
            {{ categoryName }}
          </p>
        </div>
        <div class="d-flex justify-center"></div>
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
            v-for="(item, idx) in paginatedData"
            :key="idx"
            cols="auto"
            class="pa-3"
          >
            <div class="hover-container">
              <v-hover v-slot="{ hover }">
                <v-img
                  :width="160"
                  :height="160"
                  :src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${item.qr_code_image_url_key}`"
                  :lazy-src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${item.qr_code_image_url_key}`"
                  class="borderRadius20px"
                >
                  <div v-if="hover" class="overlay">
                    <div class="flex-class hoverBtns">
                      <div>
                        <v-btn
                          color="white"
                          icon
                          @click="viewQrCodeMethod(item)"
                        >
                          <v-icon size="20">mdi-eye</v-icon>
                        </v-btn>
                      </div>
                      <div>
                        <v-btn color="white" icon @click="wishlistMethod(idx)">
                          <v-icon
                            size="20"
                            :color="
                              $store.getters.get_fav_qr_id.includes(
                                qrByCategoryNameData[idx].qr_code_id
                              ) === true
                                ? 'red'
                                : undefined
                            "
                            >mdi-heart</v-icon
                          >
                        </v-btn>
                      </div>
                      <div>
                        <v-btn
                          color="white"
                          icon
                          @click="purchaseQrMethod(idx)"
                        >
                          <v-icon size="20">mdi-cart</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-img>
              </v-hover>
            </div>
          </v-col>
        </v-row>
        <div class="text-center mt-5">
          <v-pagination
            v-model="page"
            :length="pageCount"
            circle
            color="black"
          />
        </div>
      </v-container>
    </section>
    <div>
      <FooterSection />
    </div>
  </div>
</template>

<script>
import NavbarSection from "@/views/MainPages/Navbar.vue";
import PurchaseQr from "@/components/QrPages/Dialogs/PurchaseQr.vue";
import Snackbar from "@/components/Extras/MySnackbar.vue";
import FooterSection from "@/views/ChildPages/FooterSection.vue";
import ViewQrCode from "@/components/QrPages/Dialogs/ViewQrCode.vue";

import { GetQrByCategoryName } from "@/mixins/GetQrByCategoryName.js";
import { listFavouriteQr } from "@/mixins/GetAllMyFavouriteQr.js";
import { updateFavouriteQr } from "@/mixins/UpdateFavourites.js";

export default {
  mixins: [GetQrByCategoryName, listFavouriteQr, updateFavouriteQr],
  components: {
    NavbarSection,
    Snackbar,
    FooterSection,
    PurchaseQr,
    ViewQrCode,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 16,
      SnackBarComponent: {},
      PurchaseQrDialog: false,
      ViewQrCodeDialog: false,
      StoreObj: {},
    };
  },
  computed: {
    categoryName() {
      this.apiCall();
      return this.$route.query.categoryName;
    },
    pageCount() {
      return Math.ceil(this.qrByCategoryNameData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.qrByCategoryNameData.slice(start, end);
    },
  },
  methods: {
    async apiCall() {
      await this.GetQrByCategoryNameMethod(this.$route.query.categoryName);
      // console.log("ALL_QR_LENGTH", this.qrByCategoryNameData.length);
    },
    navigateToSection() {
      this.$refs.secondSection.scrollIntoView({ behavior: "smooth" });
    },
    async wishlistMethod(idx) {
      if (this.$store.getters.get_user_info.user_name === undefined) {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Login before adding it to favourites!",
          countdown: true,
        };
        setTimeout(() => {
          this.$router.push("/loginPage");
        }, 2000);
      } else {
        // console.log(this.qrByCategoryNameData[idx].qr_code_id);
        let updatedFavQrArray = this.$store.getters.get_fav_qr_id;
        if (
          updatedFavQrArray.includes(this.qrByCategoryNameData[idx].qr_code_id)
        ) {
          // console.log("YES PRESENT");
          updatedFavQrArray.splice(
            updatedFavQrArray.indexOf(
              this.qrByCategoryNameData[idx].qr_code_id
            ),
            1
          );
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "red--text",
            Message: "Removed from the favorites",
          };
        } else {
          // console.log("NOT PRESENT");
          updatedFavQrArray.push(this.qrByCategoryNameData[idx].qr_code_id);
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "green--text",
            Message: "Added to the favourites",
          };
        }
        // console.log("NOW_CHECK", updatedFavQrArray);
        await this.updateFavouriteQrMethod(updatedFavQrArray);
        await this.listFavouriteQrMethod();
      }
    },

    purchaseQrMethod(index) {
      if (this.$store.getters.get_user_info.user_name === undefined) {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Login before purchasing QRs!",
          countdown: true,
        };
        setTimeout(() => {
          this.$router.push("/loginPage");
        }, 2000);
      } else {
        this.PurchaseQrDialog = true;
        this.StoreObj = this.qrByCategoryNameData[index];
      }
    },

    PurchaseQrDialogEmit(Toggle) {
      this.PurchaseQrDialog = false;
      if (Toggle === 2) {
        this.apiCall();
      }
    },

    viewQrCodeMethod(data) {
      this.StoreObj = data;
      this.ViewQrCodeDialog = true;
    },

    ViewQrCodeDialogEmit(Toggle) {
      this.ViewQrCodeDialog = false;
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
