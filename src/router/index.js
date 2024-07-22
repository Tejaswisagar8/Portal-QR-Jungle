import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/homepage",
    name: "homePage",
    component: () => import("@/views/MainPages/HomePage.vue"),
  },
  {
    path: "/qrdetails",
    name: "QRDetails",
    component: () => import("@/views/ChildPages/QrPages.vue"),
  },
  {
    path: "/myfavourites",
    name: "myFavourites",
    component: () => import("@/views/ChildPages/MyFavourites.vue"),
  },
  {
    path: "/myqr",
    name: "myQr",
    component: () => import("@/views/ChildPages/MyQr.vue"),
    props: true,
  },
  {
    path: "/loginpage",
    name: "loginPage",
    component: () => import("@/views/MainPages/LoginPage.vue"),
    props: true,
  },
  {
    path: "/signup",
    name: "signupPage",
    component: () => import("@/views/MainPages/SignupPage.vue"),
    props: true,
  },
  {
    path: "/",
    name: "WelcomePage",
    component: () => import("@/views/MainPages/WelcomePage.vue"),
  },
  {
    path: "/:QRID",
    name: "WelcomePage",
    component: () => import("@/views/MainPages/WelcomePage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
