<template>
  <div class="currentFont">
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <NavbarSection />
    <section id="first-section">
      <v-container fluid class="pa-0 sec1Container">
        <v-row>
          <v-col lg="4" md="4" sm="6" xs="12" class="sec2Col1">
            <span class="heading1">Your Favourite QRs</span>
            <p class="pt-2 text-justify">
              Keep all your important QR codes at your fingertips with our
              Favorites feature. Easily access and manage the QR codes you use
              most frequently. Categorize and organize them to streamline your
              workflow. Enhance your efficiency by having your go-to QR codes
              readily available.
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
          <span class="heading1 text-center mb-6 textDecorations"
            >My Favourites</span
          >
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
            v-for="(item, idx) in paginatedData"
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
                          <v-btn icon @click="wishlistMethod(idx)">
                            <v-icon
                              size="20"
                              :key="idx"
                              :color="
                                $store.getters.get_fav_qr_id.includes(
                                  item.qr_code_id
                                ) === true
                                  ? 'red'
                                  : 'white'
                              "
                              >mdi-heart</v-icon
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
            <!-- <div >
              <span class="heading2">No favourite QR's available!!</span>
            </div> -->
          </v-col>
          <h1 v-if="favouriteQrCounts === 0" class="text-center heading2 mt-5">
            No Favourite QRs are Available Now!
          </h1>
          <v-btn
            v-if="favouriteQrCounts === 0"
            dense
            dark
            class="text-capitalize mt-3"
            style="max-width: 130px"
            @click="$router.push('/homepage')"
            >Add now<v-icon size="17" class="pl-1">mdi-plus</v-icon></v-btn
          >
        </v-row>
        <div class="text-center mt-5" v-if="favouriteQrCounts !== 0">
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
import Snackbar from "@/components/Extras/MySnackbar.vue";
import FooterSection from "@/views/ChildPages/FooterSection.vue";

import { listFavouriteQr } from "@/mixins/GetAllMyFavouriteQr.js";
import { updateFavouriteQr } from "@/mixins/UpdateFavourites.js";
export default {
  mixins: [listFavouriteQr, updateFavouriteQr],
  components: {
    NavbarSection,
    Snackbar,
    FooterSection,
  },

  data() {
    return {
      page: 1,
      itemsPerPage: 16,
      myFavQrData: [],
      SnackBarComponent: {},
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(this.myFavQrData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.myFavQrData.slice(start, end);
    },
  },

  mounted() {
    this.apiCallMethod();
  },

  methods: {
    async apiCallMethod() {
      this.myFavQrData = await this.listFavouriteQrMethod();
    },

    async wishlistMethod(idx) {
      const favQrIDs = this.$store.getters.get_fav_qr_id;
      favQrIDs.splice(idx, 1);
      await this.updateFavouriteQrMethod(favQrIDs);
      this.apiCallMethod();
      this.SnackBarComponent = {
        SnackbarVModel: true,
        color: "red--text",
        Message: "Removed from the favourites",
      };
    },

    navigateToSection() {
      this.$refs.secondSection.scrollIntoView({ behavior: "smooth" });
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
