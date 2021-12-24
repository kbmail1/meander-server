require('source-map-support').install()
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolvers } from './resources/gql/dictResolver'
import axios from 'axios'
import { IWordInfo, parseWordInfo } from './dictResultParser'
import { ApolloServer } from 'apollo-server-express'
import { emptyWordInfo, typeDefs } from './resources/gql/dictSchema'

import bodyParser from 'body-parser';


// Consts

const PORT_HTTPS = 8888
const PORT_HTTP = 8887
const DICT_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const corsOptions = {
    origin: '*',
    credentails: true // allow to send coories over CORS
}
dotenv.config()
const app = express();

const setCreds = () => {
    const privateKey = fs.readFileSync('./src/resources/certs/localhost.key')
    const certificate = fs.readFileSync('./src/resources/certs/localhost.crt')
    return { key: privateKey, cert: certificate, }
}

const expressMiddleware = () => {
    // --- Express middleware
    if ('production'.length > 0) {
        app.use(express.static("build"))
    }
    // bodyParser() deprecated.  factory methods still available.
    // express 4.16+ - express.json() and express.urlencoded() prefered.
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(cors(corsOptions))
}

const apolloMiddleware = () => {
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

expressMiddleware()
const credentials = setCreds()
apolloMiddleware()

// setup data format; allow cross origin for rest.

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: `Hello from Node Server at ${PORT_HTTPS}`
    })
    res.send('Hello World!')
})

app.post('/rest/word/:lookupWord', (req, res) => {
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

// start the common server - https for

app.listen(PORT_HTTPS, () => {
    console.log(`Express and 🚀 Server are running at: https://localhost:${PORT_HTTPS}`)
})