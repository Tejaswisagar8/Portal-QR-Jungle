<template>
  <div class="home-page">
    <NavbarSection />
    <section id="first-section">
      <v-container fluid class="pa-0 sec2Container">
        <v-row align="center">
          <v-col lg="4" md="4" sm="6" xs="12" class="sec2Col1">
            <span class="heading1"
              >Unleash the Power of QR Codes: Find, Categorize, and
              Purchase</span
            >
            <p class="pt-2 text-justify">
              Unlock the potential of QR codes with tailored solutions for your
              specific requirements. Explore a diverse range of categories and
              find the perfect fit for your business or personal use. Easily
              purchase and integrate these innovative tools to enhance your
              digital interactions.
            </p>
            <div>
              <v-btn
                dark
                dense
                class="mt-2 text-capitalize"
                @click="scrollToSection()"
                >Explore Categories</v-btn
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
      <v-container fluid class="pa-0 sec3Container">
        <div class="d-flex justify-center">
          <span class="heading1 text-center mb-6 textDecorations"
            >Categories</span
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
            v-for="(item, idx) in firstQrImgWithCategoryName"
            :key="idx"
            cols="auto"
            class="pa-3"
          >
            <div class="hover-container">
              <v-card
                elevation="0"
                class="pa-0 borderRadius20px zoom-out"
                @click="viewQrMethod(item.categoryName)"
              >
                <v-img
                  :height="160"
                  :width="160"
                  :src="`https://qrjungle-all-qrcodes.s3.ap-south-1.amazonaws.com/${item.qrImg}`"
                  class="borderRadius20px"
                />
                <v-card-text class="text-center">
                  <span class="heading2 text-capitalize">{{
                    item.categoryName
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <div>
      <FooterSection />
    </div>
  </div>
</template>

<script>
import NavbarSection from "@/views/MainPages/Navbar.vue";
import FooterSection from "@/views/ChildPages/FooterSection.vue";

import { currentUserDetails } from "@/mixins/GetCurrentUserDetails.js";
import { GetCategoryList } from "@/mixins/GetAllCategoryList.js";
import { GetQrByCategoryName } from "@/mixins/GetQrByCategoryName.js";
import { Auth } from "aws-amplify";

export default {
  mixins: [currentUserDetails, GetCategoryList, GetQrByCategoryName],
  components: { NavbarSection, FooterSection },
  data() {
    return {};
  },

  async mounted() {
    await this.currentUserDetailsMethod();
    await this.GetCategoryListMethod();
    this.categoryInfo.map(async (item) => {
      await this.GetQrByCategoryNameMethod(item.category_name);
    });
  },

  methods: {
    viewQrMethod(category_name) {
      // console.log("NAAME", category_name);
      // this.$router.push({
      //   name: "qrdetails",
      //   params: { categoryName: category_name },
      // });
      this.$router.push({
        name: "QRDetails",
        query: {
          categoryName: category_name,
        },
      });
      this.StoreObj = category_name;
    },

    scrollToSection() {
      this.$refs.secondSection.scrollIntoView({ behavior: "smooth" });
    },

    async logoutMethod() {
      try {
        await Auth.signOut({ global: true });
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "green--text",
          Message: "Logged out successfully!",
        };
        this.$store.commit("SET_USER_INFO", "");
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  font-family: "Josefin Sans", sans-serif;
}

.sec2Container {
  background-color: #dddddd;
  padding-top: 150px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-bottom: 100px !important;
}

.sec3Container {
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.hover-container {
  display: inline-block; /* Needed to prevent overflowing parent element */
  transition: transform 0.3s ease;
}

.hover-container:hover {
  transform: scale(0.75);
}

.textDecorations {
  text-decoration: underline #006769;
  text-underline-offset: 4px;
}
</style>
