import { getCurrentUserDetails } from "@/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";

export const currentUserDetails = {
  data() {
    return {};
  },
  methods: {
    async currentUserDetailsMethod() {
      try {
        const result = await API.graphql(
          graphqlOperation(getCurrentUserDetails)
        );
        this.$store.commit(
          "SET_USER_INFO",
          JSON.parse(result.data.getCurrentUserDetails).data.items[0]
        );
        // console.log("USER_INFO", result)
      } catch (error) {
        console.log("Error", error);
        this.$store.commit("SET_USER_INFO", { user_name: undefined });
      }
    },
  },
};
