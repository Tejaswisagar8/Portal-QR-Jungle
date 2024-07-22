<template>
  <div>
    <section id="navbar-section sticky-top" ref="navbarSection">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div class="d-flex justify-left">
            <v-card
              elevation="0"
              @click="$router.push('/homepage')"
              style="background-color: black"
            >
              <v-img :width="65" src="@/assets/main-logo.png" />
            </v-card>
          </div>
          <v-btn
            icon
            style="border: 0"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <v-icon color="black" size="35">mdi-menu</v-icon>
          </v-btn>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto center-nav menuNavUL">
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="page"
                  @click="$router.push('/homepage')"
                  >Home</a
                >
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul class="dropdown-menu">
                  <div v-for="(categoryName, idx) in categoryInfo" :key="idx">
                    <li>
                      <a
                        class="dropdown-item text-capitalize"
                        @click="viewQrMethod(categoryName.category_name)"
                        >{{ categoryName.category_name }}</a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                  </div>
                </ul>
              </li>
              <li class="nav-item favouriteQRLI">
                <a class="nav-link" @click="$router.push('/myfavourites')"
                  >My Favourites</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="$router.push('/myqr')">My QRs</a>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="navbar-item pr-2 searchLI">
                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </li>
              <li class="navbar-item pl-2 pr-2 hearBtnLI">
                <div class="ml-2 mr-2">
                  <v-btn icon @click="$router.push('/myfavourites')"
                    ><v-icon color="red">mdi-heart</v-icon></v-btn
                  >
                  <v-badge
                    bottom
                    color="green"
                    :content="
                      $store.getters.get_fav_qr_id.length > 0
                        ? $store.getters.get_fav_qr_id.length
                        : 'o'
                    "
                    icon
                    class="wishlistBadge"
                    v-show="
                      $store.getters.get_user_info.user_name !== undefined
                    "
                  ></v-badge>
                </div>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn> -->
              </li>
              <li class="navbar-item pl-2 pr-2 hearBtnLI">
                <div class="ml-2 mr-2">
                  <v-btn icon @click="$router.push('/myqr')"
                    ><v-icon color="purple">mdi-cart</v-icon></v-btn
                  >
                </div>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn> -->
              </li>
              <li class="navbar-item logoutBTN">
                <div
                  v-if="$store.getters.get_user_info.user_name !== undefined"
                >
                  <v-btn
                    dark
                    dense
                    class="mt-2 text-capitalize"
                    @click="logoutMethod()"
                    >Logout</v-btn
                  >
                </div>
                <div v-else>
                  <v-btn
                    dark
                    dense
                    class="mt-2 text-capitalize"
                    @click="$router.push('/loginpage')"
                    >Login</v-btn
                  >
                </div>
              </li>
              <li class="navbar-item dropdown pl-2 accountDropdown">
                <v-btn
                  class="avatarLi pl-6 pr-3"
                  icon
                  v-if="$store.getters.get_user_info.user_name !== undefined"
                >
                  <v-avatar color="primary" size="40" class="white--text">{{
                    $store.getters.get_user_info.user_name.slice(0, 2)
                  }}</v-avatar>
                </v-btn>
                <v-btn icon v-else>
                  <v-icon size="25" color="blue">mdi-account-circle</v-icon>
                </v-btn>
                <ul class="dropdown-menu avatarDrodown btnUL">
                  <div class="mt-2">
                    <span style="font-size: 15px"
                      >Hello
                      <span
                        class="heading2"
                        style="color: #006769; font-weight: 700"
                        >{{
                          $store.getters.get_user_info.user_name === undefined
                            ? "User"
                            : $store.getters.get_user_info.user_name
                        }}</span
                      >,</span
                    >
                    <p style="color: grey">
                      {{ $store.getters.get_user_info.user_email_id }}
                    </p>
                  </div>
                  <li><hr class="dropdown-divider" /></li>
                  <div
                    v-if="$store.getters.get_user_info.user_name !== undefined"
                  >
                    <v-btn
                      dark
                      dense
                      class="mt-2 text-capitalize"
                      @click="logoutMethod()"
                      >Logout</v-btn
                    >
                  </div>
                  <div v-else>
                    <v-btn
                      dark
                      dense
                      class="mt-2 text-capitalize"
                      @click="$router.push('/loginpage')"
                      >Login</v-btn
                    >
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  </div>
</template>

<script>
import { GetCategoryList } from "@/mixins/GetAllCategoryList.js";
import { listFavouriteQr } from "@/mixins/GetAllMyFavouriteQr.js";

import { Auth } from "aws-amplify";
export default {
  mixins: [GetCategoryList, listFavouriteQr],
  data() {
    return {
      userName: "",
    };
  },
  async mounted() {
    await this.listFavouriteQrMethod();
    await this.GetCategoryListMethod();
    this.$refs.navbarSection.scrollIntoView({ behavior: "smooth" });
    // console.log("WORKINg");
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
.navbar {
  background-color: #dddddd;
  font-size: 17px;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 600;
}

.nav-item {
  padding-left: 30px;
  padding-right: 30px;
  color: black;
}

.nav-link {
  color: black;
}

.logoutBTN {
  display: none !important;
}

.favouriteQRLI {
  display: none !important;
}

.avatarLi {
  position: relative;
  bottom: 3px;
}

.dropdown-menu {
  width: 200px;
  height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  color: black;
}

.avatarDrodown {
  width: 250px;
  position: absolute;
  right: 5px;
  top: 40px;
  padding: 10px;
}

.center-nav {
  display: flex;
  justify-content: center;
  flex: 1;
}

.navbar-nav .dropdown:hover .dropdown-menu {
  display: block;
}

.wishlistBadge {
  position: relative;
  right: 3px;
  bottom: 22px;
  padding: 0;
}

@media (max-width: 992px) {
  .menuNavUL {
    display: grid !important;
    justify-content: center !important;
    margin: 0 !important;
    align-items: center !important;
  }

  .searchLI {
    display: none !important;
  }

  .accountDropdown {
    display: none !important;
  }

  .hearBtnLI {
    display: none !important;
  }

  .logoutBTN {
    margin: 0 !important;
    justify-content: center !important;
    display: grid !important;
  }

  .favouriteQRLI {
    margin: 0 !important;
    justify-content: center !important;
    display: grid !important;
  }
}
</style>
