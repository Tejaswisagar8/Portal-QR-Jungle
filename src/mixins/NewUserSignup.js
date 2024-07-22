const axios = require("axios");

export const UserSignUpAPI = {
  data() {
    return {};
  },

  methods: {
    async UserSignUpAPIMethod(name, email) {
      try {
        const config = {
          method: "post",
          url: "https://hciu6m7wcj.execute-api.ap-south-1.amazonaws.com/prod/user_signup",
          data: {
            user_name: name,
            user_email_id: email,
            command: "userSignUp",
          },
        };

        const result = await axios(config);
        return result.data.data;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
