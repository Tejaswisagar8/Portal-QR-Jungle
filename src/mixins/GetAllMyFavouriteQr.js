import { listMyFavourites } from "@/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

export const listFavouriteQr = {
  data() {
    return {
      favouriteQrCounts: "",
      disableLoader: undefined,
    };
  },

  methods: {
    async listFavouriteQrMethod() {
      try {
        const result = await API.graphql(graphqlOperation(listMyFavourites));
        const response = JSON.parse(result.data.listMyFavourites);
        this.favouriteQrCounts = response.data.length;
        let qrIdArray = response.data.map((item) => {
          return item.qr_code_id;
        });
        this.$store.commit("SET_FAV_QR_ID", qrIdArray);
        this.disableLoader = true;
        return JSON.parse(result.data.listMyFavourites).data;
      } catch (error) {
        this.disableLoader = true;
        this.favouriteQrCounts = 0;
        this.$store.commit("SET_FAV_QR_ID", []);
        console.log("Error", error);
      }
    },
  },
};
