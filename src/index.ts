require('source-map-support').install()
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolvers } from './resources/gql/dictResolver'

import axios from 'axios'
import { IWordInfo, parseWordInfo } from './wordResultParser'
import { ApolloServer } from 'apollo-server-express'
import { emptyWordInfo, typeDefs } from './resources/gql/dictSchema'

// Consts

const PORT_HTTPS = 8888
const PORT_HTTP = 8887
const DICT_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const corsOptions = {
    origin: '*',
    credentails: true // allow to send coories over CORS
}
dotenv.config()
const expressApp = express();

const getCredsForHttps = () => {
    console.log(`----- ${__dirname}`)
    const privateKey = fs.readFileSync(path.join(__dirname, './localhost.key'))
    const certificate = fs.readFileSync(path.join(__dirname, './localhost.crt'))
    // const privateKey = fs.readFileSync('/Users/kundanbapat/.localhost-ssl/localhost.key')
    // const certificate = fs.readFileSync('/Users/kundanbapat/.localhost-ssl/localhost.crt')
    return { key: privateKey, cert: certificate, }
}

const expressMiddleware = (app: any) => {
    // --- Express middleware
    if ('production'.length > 0) {
        app.use(express.static("build"))
    }
    // bodyParser() deprecated.  factory methods still available.
    // express 4.16+ - express.json() and express.urlencoded() prefered.
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors(corsOptions))
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());
}

const apolloMiddleware = (app: any) => {
    // GQL (Apollo) server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({
            app,
            cors: corsOptions
        })
    })
}

// Move BELOW out of this file
expressApp.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: `Hello from Node Server at ${PORT_HTTPS}`
    })
    // res.send('Hello World!')
})

// - post needed to field GQL requests from client -  expressApp.post('/rest/word/:lookupWord', (req, res) => {
// expressApp.post('/rest/word/:lookupWord', (req, res) => {
expressApp.get('/rest/word/:lookupWord', (req, res) => {
    let word = req.params.lookupWord
    console.log(`received URL: ', ${req.url} for word: ${word}`)
    const url = `${DICT_URL}${word}`

    try {
        axios.get(url)
            .then(result => {
                let data = result.data
                let parsedResult = parseWordInfo(data)
                console.log(parsedResult)
                res.json(parsedResult)
            })
            .catch(err => {
                console.log('axios get failed.')
                res.json(Object.assign(emptyWordInfo, { error: `${err.response.status}: ${err.response.data.title}` }))
            })
    } catch (err) {
        console.log(`GET from ${url} failed... `, err)
        res.json(Object.assign(emptyWordInfo, { error: `${err.response.status}: ${err.response.data.title}` }))
    }
})
// Move ABOVE out of this file.

// start the common server - https for
expressMiddleware(expressApp)
const credOptions = getCredsForHttps()
apolloMiddleware(expressApp)

// http.createServer(expressApp)
https.createServer(credOptions, expressApp)
    .listen(PORT_HTTPS, () => {
        console.log(`Express and ???? Server are running at: ${ PORT_HTTPS }`)
})