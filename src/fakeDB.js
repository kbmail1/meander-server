"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
console.log(crypto_1["default"].createHash('sha256')
    .update('kundan123')
    .digest('hex'));
