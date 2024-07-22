import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    favQrId: [],
  },
  getters: {
    get_user_info: (state) => {
      return state.userInfo;
    },

    get_fav_qr_id: (state) => {
      return state.favQrId;
    },
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
    },

    SET_FAV_QR_ID(state, id) {
      state.favQrId = id;
    },
  },
  plugins: [createPersistedState()],
  actions: {},
  modules: {},
});
