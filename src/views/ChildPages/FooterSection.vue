<template>
  <div class="footer-section currentFont">
    <section class="first-section">
      <v-container fluid class="pa-0 sec1Container">
        <v-row>
          <v-col cols="12" lg="3" md="4" sm="12" xs="12">
            <v-card
              :width="90"
              elevation="0"
              @click="$router.push('/homepage')"
              style="background-color: black"
            >
              <v-img :width="90" src="@/assets/main-logo.png" />
            </v-card>
            <div class="flex-class mt-4">
              <div class="mr-2">
                <v-icon color="white" size="22">mdi-facebook</v-icon>
              </div>
              <div class="ml-2 mr-2">
                <v-icon color="white" size="22">mdi-instagram</v-icon>
              </div>
              <div class="ml-2 mr-2">
                <v-icon color="white" size="22">mdi-twitter</v-icon>
              </div>
              <div class="ml-2">
                <v-icon color="white" size="22">mdi-youtube</v-icon>
              </div>
            </div>
            <div class="mt-3">
              <span class="white--text"
                >©Copyright {{ currentYear }} QR Jungle. All Rights
                Reserved</span
              >
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="4" sm="12" xs="12">
            <span class="heading2 white--text textDecorations">Support</span>
            <div style="display: grid">
              <div>
                <v-btn text class="text-capitalize white--text"
                  >Contact us</v-btn
                >
              </div>
              <div>
                <v-btn text class="white--text">FAQ</v-btn>
              </div>
              <div>
                <v-btn text class="text-capitalize white--text"
                  >Help Center</v-btn
                >
              </div>
              <div>
                <v-btn text class="text-capitalize white--text"
                  >Live Chat</v-btn
                >
              </div>
              <div>
                <v-btn text class="text-capitalize white--text"
                  >Community Forums</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="4" sm="12" xs="12">
            <span class="heading2 white--text textDecorations"
              >Other Services</span
            >
            <div style="display: grid">
              <div>
                <v-btn text class="text-capitalize white--text">About Us</v-btn>
              </div>
              <div>
                <v-btn text class="white--text text-capitalize">Careers</v-btn>
              </div>
              <div>
                <v-btn text class="text-capitalize white--text">Blog</v-btn>
              </div>
              <div>
                <v-btn text class="text-capitalize white--text">Partners</v-btn>
              </div>
              <div>
                <v-btn text class="text-capitalize white--text"
                  >Legal Information</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="4" sm="12" xs="12">
            <span class="heading2 white--text"
              ><v-icon color="white" size="22" class="pr-2">mdi-email</v-icon
              >Stay upto date from QR Jungle</span
            >
            <div v-if="$store.getters.get_user_info.user_name === undefined">
              <v-btn
                dark
                dense
                class="mt-2 text-capitalize"
                @click="$router.push('/loginpage')"
                >Login</v-btn
              >
            </div>
            <div v-else>
              <v-btn
                dark
                dense
                class="mt-2 text-capitalize"
                @click="logoutMethod()"
                >Logout</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      currentYear: "",
    };
  },
  mounted() {
    this.currentYear = new Date().getFullYear();
  },

  methods: {
    async logoutMethod() {
      try {
        await Auth.signOut({ global: true });
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "green--text",
          Message: "Logged out successfully!",
        };
        this.$router.push("/homepage");
        this.$store.commit("SET_USER_INFO", "");
        localStorage.clear();
        sessionStorage.clear();
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
</script>

<style scoped>
.sec1Container {
  background-color: #006769;
  padding-top: 150px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-bottom: 100px !important;
}

.textDecorations {
  text-decoration: underline white;
  text-underline-offset: 2px;
}
</style>
