const path = require("path");
module.exports = {
  entry: [
    "./js/load.js",
    "./js/backend.js",
    "./js/debounce.js",
    "./js/util.js",
    "./js/data.js",
    "./js/pin.js",
    "./js/message.js",
    "./js/form.js",
    "./js/mapinit.js",
    "./js/filter.js",
    "./js/movePin.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
