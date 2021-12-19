"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var axios_1 = __importDefault(require("axios"));
var dictResultParser_1 = require("./dictResultParser");
var apollo_server_express_1 = require("apollo-server-express");
var dictResolver_1 = require("./resources/gql/dictResolver");
var dictSchema_1 = require("./resources/gql/dictSchema");
// ---- Init App ----
var PORT = process.env.PORT || 8081;
var DICT_URL = process.env.URL || 'https://api.dictionaryapi.dev/api/v2/entries/en/';
var corsOptions = {
    origin: '*',
    credentails: true // allow to send coories over CORS
};
// REST (express) server
// GQL (Apollo) server
var apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: dictSchema_1.typeDefs,
    resolvers: dictResolver_1.resolvers,
});
var app = (0, express_1.default)();
// ------ Serve Assets
if ('production'.length > 0) {
    app.use(express_1.default.static("build"));
}
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
apolloServer.applyMiddleware({
    app: app,
    cors: corsOptions
});
// setup data format; allow cross origin for rest.
app.get('/', function (req, res) {
    res.status(200).json({
        status: true,
        data: "Hello from Node Server at ".concat(PORT)
    });
    res.send('Hello World!');
});
app.get('/rest/word/:lookupWord', function (req, res) {
    var word = req.params.lookupWord;
    console.log("received URL: ', ".concat(req.url, " for word: ").concat(word));
    var url = "".concat(DICT_URL).concat(word);
    try {
        axios_1.default.get(url)
            .then(function (result) {
            console.log((0, dictResultParser_1.parseWordInfo)(result));
            res.json(result.data);
        });
    }
    catch (err) {
        console.log("GET from ".concat(url, " failed... "), err);
    }
});
console.log(process.env.NODE_ENV);
// start the common sserver
app.listen(PORT, function () {
    console.log("Express and \uD83D\uDE80 Server are running at: http://localhost:".concat(PORT));
});
