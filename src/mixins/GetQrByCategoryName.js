const axios = require("axios");

export const GetQrByCategoryName = {
  data() {
    return {
      qrByCategoryNameData: [],
      firstQrImgWithCategoryName: [],
      disableLoader: undefined,
    };
  },

  methods: {
    async GetQrByCategoryNameMethod(categoryName) {
      // console.log("CATEGORY_NAME", categoryName);
      try {
        const config = {
          method: "post",
          url: "https://hciu6m7wcj.execute-api.ap-south-1.amazonaws.com/prod/list_qr_by_category",
          data: {
            command: "listQrByCategory",
            qr_code_category_name: categoryName,
          },
        };
        const result = await axios(config);
        this.qrByCategoryNameData = result.data.data;
        this.firstQrImgWithCategoryName.push({
          categoryName: result.data.data[0].qr_code_category,
          qrImg: result.data.data[0].qr_code_image_url_key,
        });
        this.disableLoader = true;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};
