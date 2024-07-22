const axios = require("axios");

export const GetPresignedAPICall = {
  data() {
    return {
    };
  },

  methods: {
    async GetPresignedAPICallMethod(fileName) {
      try {
        const config = {
          method: "post",
          url: "https://ppq54dc20b.execute-api.ap-south-1.amazonaws.com/production/get_presigned_url",
          data: JSON.stringify({
            command: "getPresignedURL",
            key: fileName,
          }),
        };

        const result = await axios(config);
        return result.data.url;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
