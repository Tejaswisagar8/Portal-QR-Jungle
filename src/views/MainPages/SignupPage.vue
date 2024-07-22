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
          </div>
          <v-card-text>
            <v-form ref="signupForm">
              <v-text-field
                v-model="userName"
                label="Enter your name"
                :rules="usernameRules"
              >
              </v-text-field>
              <v-text-field
                v-model="userEmail"
                label="Enter your email"
                :rules="emailRules"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <div class="d-flex justify-center ma-2">
            <v-btn
              :loading="signupLoader"
              block
              rounded
              @click="signupMethod()"
              class="loginBtn pt-6 pb-6 text-capitalize"
              ><span
                class="mainYellowBtns"
                style="font-size: 20px; letter-spacing: 1px"
                >Signup</span
              ></v-btn
            >
          </div>
          <p class="text-center mt-5">
            Already have an account?
            <a style="text-decoration: none; color: white" href="/loginpage"
              ><span
                style="
                  text-decoration: underline #fdcb0a;
                  text-underline-offset: 2px;
                "
                >Login</span
              ></a
            >
          </p>
        </div>
      </v-card>

      <p class="pa-0 text-center mt-5" style="font-size: 13px">
        © Copyright {{ current_year }} QR Jungle. All Rights Reserved
      </p>
    </v-overlay>
  </div>
</template>

<script>
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
      userName: "",
      userEmail: "",
      usernameRules: [(v) => !!v || "User name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      signupLoader: false,
      SnackBarComponent: {},
      user: "",
    };
  },
  //   mounted() {
  //     this.getTimeOfDay();
  //     this.getCurrentYear();
  //     if (this.$store.getters.get_snackbar_token === true) {
  //       this.SnackBarComponent = {
  //         SnackbarVModel: true,
  //         color: "green--text",
  //         Message: "You've been logged out!",
  //       };
  //     }
  //   },

  methods: {
    async signupMethod() {
      if (this.$refs.signupForm.validate()) {
        this.signupLoader = true;
        const response = await this.UserSignUpAPIMethod(
          this.userName,
          this.userEmail
        );
        if (response.status === 200) {
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "green--text",
            Message: response.status_message,
          };
          this.signupLoader = false;
        }
        if (response.status === 400) {
          this.SnackBarComponent = {
            SnackbarVModel: true,
            color: "red--text",
            Message: `Email already exists, kindly Login!`,
          };
          this.signupLoader = false;
        }
      } else {
        this.SnackBarComponent = {
          SnackbarVModel: true,
          color: "red--text",
          Message: "Kindly provide valid credentials!",
        };
      }
    },

    // getTimeOfDay() {
    //   const now = new Date();
    //   const hour = now.getHours();
    //   if (hour >= 5 && hour < 12) {
    //     this.dayType = "Morning";
    //   } else if (hour >= 12 && hour < 18) {
    //     this.dayType = "Afternoon";
    //   } else {
    //     this.dayType = "Evening";
    //   }
    // },

    // getCurrentYear() {
    //   const date = new Date();
    //   this.current_year = date.getFullYear();
    // },
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

  .mainYellowBtns {
    font-size: 18px !important;
  }

  .otpPageMessage {
    font-size: 15px !important;
  }
}
</style>
