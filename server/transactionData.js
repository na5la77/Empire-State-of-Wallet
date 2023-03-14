const axios = require("axios");
const fs = require("fs");

var transactions;
let url = "https://hadiziady.github.io/bezos_mock_api/mock_api.json";

const getAllTransactions = async (req, res) => {
  await axios({
    method: "get",
    url: url,
    responseType: "json",
  }).then(function (response) {
    const transactions = response.data;
    const sorted = { };
    transactions.forEach((element) => {
      if (element.date.toString().includes("2029-01-")) {
       
        sorted[element.date]=sorted[element.date]?
        sorted[element.date].concat([element]):[element]
      }
    });

    //this function sorts the data, however it came sorted

    // const ordered = Object.keys(sorted)
    //   .sort()
    //   .reduce((obj, key) => {
    //     obj[key] = sorted[key];
    //     return obj;
    //   }, {});
res.json(sorted)
  });
};

module.exports = getAllTransactions;
