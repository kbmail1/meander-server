require('source-map-support').install()
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolvers } from './resources/gql/dictResolver'
dotenv.config()

import axios from 'axios'
import { IWordInfo, parseWordInfo } from './dictResultParser'

import { ApolloServer } from 'apollo-server-express'
import { wordInfoSample, typeDefs } from './resources/gql/dictSchema'

// ---- Init App ----
const PORT = 8888
const DICT_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const corsOptions = {
    origin: '*',
    credentails: true // allow to send coories over CORS
}
// REST (express) server
const app = express();
// ------ Serve Assets
if ('production'.length > 0) {
    app.use(express.static("build"))
}
app.use(express.json())
app.use(cors(corsOptions))

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

// setup data format; allow cross origin for rest.

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: `Hello from Node Server at ${PORT}`
    })
    res.send('Hello World!')
})

let sample: IWordInfo = {
    error: '',
    word: '',
    phonetic: '',
    phonetics: [],
    origin: '',
    meanings: []
}

app.get('/rest/word/:lookupWord', (req, res) => {
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
                sample = {
                    error: `${err.response.status}: ${err.response.data.title}; `,
                    word: word,
                    phonetic: '',
                    phonetics: [],
                    origin: '',
                    meanings: []
                }
                res.json(sample)
            })
    } catch (err) {
        console.log(`GET from ${url} failed... `, err)
        sample = {
            error: `${err.response.status}: ${err.response.data.title}`,
            word: word,
            phonetic: '',
            phonetics: [],
            origin: '',
            meanings: []
        }
        res.json(sample)
    }
})

// start the common sserver
app.listen(PORT, () => {
    console.log(`Express and 🚀 Server are running at: http://localhost:${PORT}`)
})
