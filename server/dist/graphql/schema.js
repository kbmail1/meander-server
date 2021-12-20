"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.resolvers = void 0;
var apollo_server_1 = require("apollo-server");
var synonyms_1 = require("./merriam/synonyms");
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type User {\n        id: String\n        name: String\n    }\n\n    type Query {\n        sayHello: User\n    }\n\n    type Query {\n        synonyms(word: String!): [String]\n    }\n"], ["\n    type User {\n        id: String\n        name: String\n    }\n\n    type Query {\n        sayHello: User\n    }\n\n    type Query {\n        synonyms(word: String!): [String]\n    }\n"])));
exports.typeDefs = typeDefs;
var resolvers = {
    Query: {
        sayHello: function () {
            console.log('resolver for sayHello');
            return { name: "hello qsdqsd", id: 2 };
        },
        synonyms: function (word) {
            word = 'apathy';
            console.log('resolver for synonyms: received word: ${word}');
            return (0, synonyms_1.getSynonyms)(word);
        }
    },
};
exports.resolvers = resolvers;
var templateObject_1;
