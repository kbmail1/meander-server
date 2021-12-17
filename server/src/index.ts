import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'
// import * as parser from './dictResultParser.ts'

dotenv.config()

// ---- Init App ----
const app = express();
const PORT = process.env.PORT || 4000
const DICT_URL = process.env.URL || 'https://api.dictionaryapi.dev/api/v2/entries/en/'

// ------ Serve Assets
if ('production'.length > 0) {
    app.use(express.static("build"))
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: `Hello from Node Server at ${PORT}`
    })
    res.send('Hello World!')
})

app.get('/word/:wordspell', (req, res) => {
    let word = req.params.wordspell
    console.log('received URL: ', req.url)
    console.log(`received request for word: ${word}`)
    console.log('===================')

    const url = `${DICT_URL}${word}`
    try {
        console.log('sending reques to DICT: ', url)
        axios.get(url)
            .then(result => {
                // console.log(parser.parseWordInfo(result.data))
                res.json(result.data)
            })
    } catch (err) {
        console.log(`GET from ${url} failed... `, err)
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


})

console.log(process.env.NODE_ENV)
app.listen(PORT, () => {
    console.log(`Node Server listening at http://localhost:${PORT}`)
})


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


