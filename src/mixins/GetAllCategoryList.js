const axios = require("axios");

export const GetCategoryList = {
  data() {
    return {
      categoryInfo: [],
    };
  },

  methods: {
    async GetCategoryListMethod() {
      try {
        const config = {
          method: "post",
          url: "https://hciu6m7wcj.execute-api.ap-south-1.amazonaws.com/prod/list_categories",
          data: {
            command: "listCategories",
            next_token: null,
          },
        };
        const result = await axios(config);
        // console.log("LIST_CATEGORIES_REST_API", result.data.data.items);
        this.categoryInfo = result.data.data.items.filter((item) => {
          if (item.category_status === "ACTIVE") {
            return item;
          }
        });
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
};

// const axios = require("axios");

// export const GetCategoryList = {
//   data() {
//     return {
//       categoryInfo: [],
//     };
//   },

//   methods: {
//     async GetCategoryListMethod() {
//       try {
//         const config = {
//           method: "post",
//           url: "https://ppq54dc20b.execute-api.ap-south-1.amazonaws.com/production/list_available_categories",
//           data: {
//             command: "listActiveCategories",
//           },
//         };
//         const result = await axios(config);
//         console.log("LIST_CATEGORIES_REST_API", result.data);
//         this.categoryInfo = result.data;
//       } catch (error) {
//         console.log("Error", error);
//       }
//     },
//   },
// };
