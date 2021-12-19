"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var dictSchema_1 = require("./schema/dictSchema");
exports.resolvers = {
    Query: {
        word: function () { return dictSchema_1.wordInfoSample; },
    },
};
