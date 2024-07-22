import { updateFavourites } from "@/graphql/mutations.js";
import { API, graphqlOperation } from "aws-amplify";

export const updateFavouriteQr = {
  methods: {
    async updateFavouriteQrMethod(array) {
      try {
        const result = await API.graphql(
          graphqlOperation(updateFavourites, {
            favourites: JSON.stringify(array),
          })
        );
        // console.log("UPDATE_FAV", result);
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
