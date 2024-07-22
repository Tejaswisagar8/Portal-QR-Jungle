<template>
  <div>
    <div v-if="showLoader === false">
      <section id="navbar-section">
        <nav
          class="navbar navbar-expand-lg fixed-top box-shadow"
          style="background-color: black"
        >
          <div class="container-fluid">
            <div class="d-flex justify-left">
              <v-card
                elevation="0"
                class="pa-0"
                @click="$router.push('/homepage')"
                style="background-color: black"
              >
                <v-img :width="80" src="@/assets/main-logo.png" />
              </v-card>
            </div>
            <!-- <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        </button> -->
            <button
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <v-icon color="white" size="35">mdi-menu</v-icon>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="ms-auto btnUl">
                <div class="ml-auto flex-class btnClass">
                  <div class="ml-2 mr-2 subBtnDiv viewgalleryBtnDiv">
                    <v-btn
                      rounded
                      class="text-capitalize"
                      @click="$router.push('/homepage')"
                      >View Gallery<v-icon color="black" class="pl-1" size="18"
                        >mdi-qrcode-scan</v-icon
                      ></v-btn
                    >
                  </div>
                  <div class="ml-2 mr-2 subBtnDiv">
                    <v-btn
                      rounded
                      class="text-capitalize"
                      color="#fdcb0a"
                      @click="$router.push('/loginpage')"
                      ><span>Login</span></v-btn
                    >
                  </div>
                  <div class="ml-2 mr-2 subBtnDiv">
                    <v-btn
                      rounded
                      class="text-capitalize"
                      color="white"
                      @click="$router.push('/signup')"
                      >Signup</v-btn
                    >
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      <section id="secondSection">
        <v-container fluid class="pa-0 mt-16">
          <div class="text-center mx-auto sec2ContentDiv" style="width: 900px">
            <h1 style="font-size: 45px; color: #fdcb0a; margin-top: 150px">
              Download the QR Jungle App By Scanning the Below QR Code...
            </h1>
            <p class="white--text">
              Unlock a world of unique QR codes and exciting features with QR
              Jungle. Seamlessly generate, scan, and customize QR codes for any
              purpose. Fast, secure, and easy to use—download now!
            </p>
            <v-img
              class="mx-auto"
              :width="280"
              src="@/assets/playstoreQr.jpg"
              style="border-radius: 20px"
            />
            <div class="flex-class justify-center mt-5">
              <div class="ma-5">
                <v-card
                  elevation="0"
                  class="pa-2"
                  @click="routeToOpenGooglePlayMethod()"
                >
                  <v-img :width="150" src="@/assets/googleplay.png" />
                </v-card>
              </div>
              <div class="ma-5">
                <v-card
                  elevation="0"
                  class="pa-2"
                  @click="routeToOpenAppStoreMethod()"
                >
                  <v-img :width="145" src="@/assets/appstore.png" />
                </v-card>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <section id="thirdSection">
        <v-container fluid class="pa-0">
          <div
            class="text-center mx-auto mt-15 sec3ContentDiv"
            style="width: 900px"
          >
            <h1 style="font-size: 45px; color: #fdcb0a">Explore the QRs...</h1>
            <p class="white--text">
              Explore the QRs" refers to delving into the various uses,
              functionalities, and applications of QR codes. This exploration
              covers how QR codes facilitate quick access to information,
              enhance marketing strategies, streamline transactions, and offer
              innovative solutions across different industries.
            </p>
          </div>
          <carousel-3d
            :width="270"
            :height="350"
            :controls-visible="false"
            :perspective="0"
            :space="350"
            :display="SliderImages.length - 2"
          >
            <slide
              style="border-radius: 30px"
              v-for="(carosuel, idx) in SliderImages"
              :key="idx"
              :index="idx"
            >
              <v-img :width="300" :height="350" :src="carosuel" />
            </slide>
          </carousel-3d>
        </v-container>
      </section>

      <section id="fourthSection">
        <v-container fluid class="pa-0 mt-15 mb-15">
          <div class="text-center mx-auto sec4ContentDiv" style="width: 900px">
            <h1 style="font-size: 45px; color: #fdcb0a">
              Are You Ready to Purchase Your QR Code?
            </h1>
            <v-btn
              rounded
              class="text-capitalize"
              @click="$router.push('/homepage')"
              >View Gallery<v-icon color="black" class="pl-1" size="18"
                >mdi-qrcode-scan</v-icon
              ></v-btn
            >
          </div>
        </v-container>
      </section>
    </div>

    <div v-if="showLoader">
      <MyLoader />
    </div>
  </div>
</template>

<script>
import MyLoader from "@/components/Extras/MyLoader.vue";
import { Carousel3d, Slide } from "vue-carousel-3d";
import axios from "axios";
export default {
  components: {
    Carousel3d,
    Slide,
    MyLoader,
  },
  data() {
    return {
      progressValue: 0,
      SliderImages: [
        require("@/assets/pic1.jpg"),
        require("@/assets/pic2.jpg"),
        require("@/assets/pic3.jpg"),
        require("@/assets/pic4.jpg"),
        require("@/assets/pic5.jpg"),
        require("@/assets/pic6.jpg"),
        require("@/assets/pic7.jpg"),
      ],
      showLoader: true,
    };
  },

  mounted() {
    setTimeout(() => {
      this.getQRCodeDetailsMethod(this.$route.params.QRID);
    }, 3000);
  },

  methods: {
    async getQRCodeDetailsMethod(qr_code_id) {
      try {
        var data = JSON.stringify({
          command: "getQRCodeDetails",
          qr_code_id,
        });
        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://ppq54dc20b.execute-api.ap-south-1.amazonaws.com/production/get_qr_code_details",
          headers: {},
          data: data,
        };
        let result = await axios(config);
        if (
          result.status == 200 &&
          result.data &&
          result.data.status &&
          result.data.status == "SUCCESS"
        ) {
          let data = result.data.data;
          window.location.replace(data.redirect_url);
        } else {
          this.showLoader = false;
          console.log("Something Went Wrong!!");
        }
      } catch (error) {
        console.warn("Error", error);
      }
    },

    routeToOpenGooglePlayMethod() {
      window.open(
        "https://play.google.com/store/apps/details?id=com.mobil80.qrjungle&hl=en",
        "_blank"
      );
    },

    routeToOpenAppStoreMethod() {
      window.open(
        "https://apps.apple.com/in/app/qrjungle/id6504745064",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.flex-class {
  display: flex;
  flex-wrap: wrap;
}

.carousel-3d-controls,
.prev,
.next {
  color: red !important;
}
.box-shadow {
  background-color: #000;
  z-index: 1000;
  box-shadow: 0 4px 6px #fdcb0a;
}

@media (max-width: 923px) {
  .sec2ContentDiv {
    width: 100% !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .sec3ContentDiv {
    width: 100% !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .sec4ContentDiv {
    width: 100% !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

/* @media (max-width: 487px) {
  .btnClass {
    display: flex !important;
    justify-content: right !important;
  }
} */

@media (max-width: 992px) {
  .btnClass {
    display: grid !important;
    justify-content: center !important;
    place-items: center;
  }

  .subBtnDiv {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .viewgalleryBtnDiv {
    display: none !important;
  }

  #fourthSection {
    display: none !important;
  }
}
</style>
