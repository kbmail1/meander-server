"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var dictResultParser_1 = require("./dictResultParser");
dotenv_1.default.config();
// ---- Init App ----
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4000;
var DICT_URL = process.env.URL || 'https://api.dictionaryapi.dev/api/v2/entries/en/';
// ------ Serve Assets
if ('production'.length > 0) {
    app.use(express_1.default.static("build"));
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.status(200).json({
        status: true,
        data: "Hello from Node Server at ".concat(PORT)
    });
    res.send('Hello World!');
});
app.get('/word/:wordspell', function (req, res) {
    var word = req.params.wordspell;
    console.log('received URL: ', req.url);
    console.log("received request for word: ".concat(word));
    console.log('===================');
    var url = "".concat(DICT_URL).concat(word);
    try {
        console.log('sending reques to DICT: ', url);
        axios_1.default.get(url)
            .then(function (result) {
            console.log((0, dictResultParser_1.parseWordInfo)(result.data));
            res.json(result.data);
        });
    }
    catch (err) {
        console.log("GET from ".concat(url, " failed... "), err);
    }
    /* => alternative to above, so that CORS is allowed.
     * => however, my problem right now (during development) is that
     * the react app is loaded from localhost:8080 and that app tries
     * accessing localhost:400 (node server).  So it is the react app
     * (based on create-reaact-app util) - which needs to be enabled for
     * CORS
     */
    /*
    var allowCrossDomain = function(req, res, next) {
       res.header('Access-Control-Allow-Origin', "*");
       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
   };

   app.use(allowCrossDomain);
   */
});
console.log(process.env.NODE_ENV);
app.listen(PORT, function () {
    console.log("Node Server listening at http://localhost:".concat(PORT));
});
/*
import { ApolloServer, gql } from "apollo-server";
import { resolvers, typeDefs } from "./graphql/schema";
const server = new ApolloServer({ typeDefs, resolvers });
const startServer = async () => {
    const { url } = await server.listen();
    console.log(`GraphQL server running at ${url}`);
    console.log(`Playground is running at ${url}playground`);
};
startServer();
*/
