<template>
  <div class="loginDiv">
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-overlay class="loginOverlay">
      <v-card
        elevation="0"
        :width="550"
        :height="shownSignupBtn === true ? 600 : 500"
        class="mx-auto pa-10 loginCard"
      >
        <v-img src="@/assets/main-logo.png" class="mx-auto" :width="80" />
        <div class="cardContent mt-3">
          <div class="text-left" style="line-height: 25px" v-show="step === 1">
            <!-- <p style="font-size: 20px; color: #fdcb0a" class="pl-1">Hello,</p> -->
            <p
              style="
                font-size: 30px;
                color: #fdcb0a;
                font-weight: 600;
                text-align: center;
              "
              class="pa-0"
            >
              Welcome to QR Jungle!
            </p>
            <!-- <p style="font-size: 20px; color: #fdcb0a" class="pl-1">
              Welcome to QR Jungle!,
              <span class="white--text"
                >kindly
                <span
                  style="
                    text-decoration: underline #fdcb0a;
                    text-underline-offset: 2px;
                  "
                  >{{ shownSignupBtn === true ? "signup" : "login" }}</span
                ></span
              >
            </p> -->
          </div>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <div v-if="shownSignupBtn !== true">
                  <v-form ref="emailForm">
                    <v-text-field
                      class="mt-6 mb-6"
                      append-icon="mdi-email"
                      v-model="email"
                      :rules="emailRules"
                      @keydown.enter.prevent="validateEmail()"
                    >
                      <template #label>
                        <label style="font-size: 20px">Enter your email</label>
                      </template>
                    </v-text-field>
                  </v-form>
                </div>
                <div v-else>
                  <v-form ref="signUpDetails">
                    <v-text-field
                      class="mt-6 mb-6"
                      v-model="newUserName"
                      :rules="[(v) => !!v || 'Required']"
                      append-icon="mdi-account-circle"
                    >
                      <template #label>
                        <label style="font-size: 20px">Enter your name</label>
                      </template>
                    </v-text-field>
                    <v-text-field
                      class="mt-6 mb-6"
                      append-icon="mdi-email"
                      v-model="email"
                      :rules="emailRules"
                    >
                      <template #label>
                        <label style="font-size: 20px">Enter your email</label>
                      </template>
                    </v-text-field>
                  </v-form>
                </div>
              </v-card-text>
              <div class="d-flex justify-center ma-2">
                <v-btn
                  :loading="loginLoader"
                  block
                  rounded
                  @click="validateEmail()"
                  class="loginBtn pt-6 pb-6 text-capitalize"
                  ><span
                    style="font-size: 20px; letter-spacing: 1px; color: black"
                    >Login</span
                  ></v-btn
                >
              </div>
              <p class="text-center mt-5">
                Dont have an account?
                <a style="text-decoration: none; color: white" href="/signup"
                  ><span
                    style="
                      text-decoration: underline #fdcb0a;
                      text-underline-offset: 2px;
                    "
                    >Signup</span
                  ></a
                >
              </p>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <p
                  style="font-size: 20px; padding: 0; font-weight: 600"
                  class="mt-3 mb-9"
                >
                  Kindly provide the OTP sent to your email for verification.
                </p>
                <v-text-field
                  v-model="otpPassword"
                  rounded
                  dense
                  outlined
                  @keydown.enter.prevent="verifyOTP()"
                  label="Enter OTP"
                >
                </v-text-field>
                <!-- <v-otp-input
                  :height="80"
                  length="6"
                  v-model="otpPassword"
                  @keydown.enter.prevent="verifyOTP()"
                /> -->
              </v-card-text>
              <div class="flex-class ml-2 mr-2">
                <div>
                  <v-btn
                    dense
                    rounded
                    class="pl-5 pr-5 text-capitalize"
                    @click="resendOtpBtn()"
                    >Resend OTP<v-icon size="15" class="pl-2 hideIcon"
                      >mdi-refresh</v-icon
                    ></v-btn
                  >
                </div>
                <div>
                  <v-btn
                    dense
                    rounded
                    @click="reenterEmailMethod()"
                    class="pl-5 pr-5 text-capitalize"
                    ><v-icon size="15" class="pr-2 hideIcon"
                      >mdi-arrow-left</v-icon
                    >Re-enter email</v-btn
                  >
                </div>
              </div>
              <v-btn
                :disabled="otpPassword === ''"
                :loading="loginLoader"
                block
                rounded
                @click="verifyOTP()"
                class="loginBtn pt-8 pb-6 text-capitalize mt-5"
                ><span
                  class="mainYellowBtns"
                  style="font-size: 20px; letter-spacing: 1px; color: black"
                  >Verify & Login</span
                ></v-btn
              >
            </v-window-item>
          </v-window>
        </div>
      </v-card>

      <p class="pa-0 text-center mt-5" style="font-size: 13px">
        © Copyright {{ current_year }} QR Jungle. All Rights Reserved
      </p>
    </v-overlay>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { UserSignUpAPI } from "@/mixins/NewUserSignup.js";

import Snackbar from "@/components/Extras/MySnackbar.vue";
export default {
  mixins: [UserSignUpAPI],
  components: {
    Snackbar,
  },
  data() {
    return {
      step: 1,
      emailForm: "",
      email: "",
      newUserName: "",
      newUserEmail: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      loginLoader: false,
      signupLoader: false,
      otpPassword: "",
      dayType: "",
      current_year: undefined,
      SnackBarComponent: {},
      user: "",
      shownSignupBtn: false,
    };
  },
  mounted() {
    this.getTimeOfDay();
    this.getCurrentYear();
    if (this.$store.getters.get_snackbar_token === true) {
      this.SnackBarComponent = {
        SnackbarVModel: true,
        color: "green--text",
        Message: "You've been logged out!",
      };
    }
  },

  methods: {
    // async signupMethod() {
    //   if (this.$refs.signUpDetails.validate()) {
    //     this.signupLoader = true;
    //     const response = await this.UserSignUpAPIMethod(
    //       this.newUserName,
    //       this.email
    //     );
    //     if (response.status === 200) {
    //       this.SnackBarComponent = {
    //         SnackbarVModel: true,
    //         color: "green--text",
    //         Message: response.status_message,
    //       };
    //       this.signupLoader = false;
    //       this.shownSignupBtn = false;
    //     }
    //   } else {
    //     this.SnackBarComponent = {
    //       SnackbarVModel: true,
    //       color: "red--text",
    //       Message: "Kindly provide valid credentials!",
    //     };
    //   }
    // },
    validateEmail() {
      if (this.$refs.emailForm.validate()) {
        this.loginLoader = true;
        this.GenerateOTPMethod();
      } else {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Kindly provide valid email !",
        };
      }
    },

    async GenerateOTPMethod(Toggle) {
      try {
        this.user = await Auth.signIn(this.email);
        // console.log("USER_INFO", this.user);
        if (this.user.challengeName === "CUSTOM_CHALLENGE") {
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "green--text",
            Message: "OTP has been sent to your email",
          };
          if (Toggle !== 2) {
            this.step++;
          }
          this.loginLoader = false;
        }
      } catch (error) {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Couldn't find your email, kindly sign up!",
        };
        this.loginLoader = false;
        // this.shownSignupBtn = true;
        console.log("Error", error);
      }
    },
    reenterEmailMethod() {
      this.step--;
      this.otpPassword = "";
    },

    async verifyOTP() {
      if (this.otpPassword !== "") {
        try {
          this.loginLoader = true;
          await Auth.sendCustomChallengeAnswer(
            this.user,
            this.otpPassword
          ).then(() => {
            this.navigateToLandingPage();
          });
        } catch (error) {
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "red--text",
            Message: "Invalid OTP try again!",
          };
          this.loginLoader = false;
          setTimeout(() => {
            this.resendOtpBtn();
          }, 1000);
          console.log("Error", error);
        }
      } else {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "OTP field can't be empty!",
        };
      }
    },

    resendOtpBtn() {
      this.otpPassword = "";
      this.GenerateOTPMethod(2);
    },
    navigateToLandingPage() {
      this.loginLoader = false;
      this.$router.push("/homepage");
    },

    getTimeOfDay() {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        this.dayType = "Morning";
      } else if (hour >= 12 && hour < 18) {
        this.dayType = "Afternoon";
      } else {
        this.dayType = "Evening";
      }
    },
    getCurrentYear() {
      const date = new Date();
      this.current_year = date.getFullYear();
    },
  },
};
</script>

<style scoped>
.loginDiv {
  font-family: "Mukta", sans-serif !important;
}
.loginOverlay {
  background: linear-gradient(135deg, #fdcb0a, #000000);
}

.loginCard {
  border-radius: 40px !important;
  height: 500px;
}

.flex-class {
  display: flex;
  justify-content: space-between;
}

.loginBtn {
  background-color: #fdcb0a !important;
  color: white !important;
}

.copyrightDiv {
  position: fixed;
  bottom: 10px;
}

@media (max-width: 565px) {
  .loginCard {
    width: 330px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .hideIcon {
    display: none !important;
  }

  .mainYellowBtns {
    font-size: 18px !important;
  }

  .otpPageMessage {
    font-size: 15px !important;
  }
}
</style>
