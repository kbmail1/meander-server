"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var dictSchema_1 = require("./dictSchema");
// TODO: check if available in redis. If not, get it from disctionary.
exports.resolvers = {
    Query: {
        getWordInfo: function () { return dictSchema_1.wordInfoSample; },
    },
};
