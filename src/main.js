import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import { Amplify } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

Vue.config.productionTip = false;

Amplify.configure({
  Auth: {
    userPoolId: "ap-south-1_Mpxebz2mD",
    region: "ap-south-1",
    userPoolWebClientId: "316g79dpqllo9a710p0tkjceun",
  },
  API: {
    aws_project_region: "ap-south-1",
    aws_appsync_graphqlEndpoint:
      "https://xdk7wbuc2fe2liojagvlatplbq.appsync-api.ap-south-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-south-1",
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
