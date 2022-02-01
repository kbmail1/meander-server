require('source-map-support').install()
import fs, { access } from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolvers } from './resources/gql/dictResolver'

import axios from 'axios'
import { IWordInfo, parseWordInfo } from './wordResultParser'
import { ApolloServer } from 'apollo-server-express'
import { emptyWordInfo, typeDefs } from './resources/gql/dictSchema'
import jwt from 'jsonwebtoken'
import { sendEmail } from './emailService'
import * as mongoService from './mongoService'

import crypto from 'crypto'
// Consts

let mongoInitialized: Promise<boolean>

const PORT_HTTPS = 8888
const PORT_HTTP = 8887
const DICT_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const corsOptions = {
    origin: '*',
    credentails: true // allow to send coories over CORS
}
dotenv.config()
const app = express();
mongoInitialized = mongoService.initConnection()

const getCredsForHttps = () => {
    console.log(`----- ${__dirname}`)
    const privateKey = fs.readFileSync(path.join(__dirname, './localhost.key'))
    const certificate = fs.readFileSync(path.join(__dirname, './localhost.crt'))
    // const privateKey = fs.readFileSync('/Users/kundanbapat/.localhost-ssl/localhost.key')
    // const certificate = fs.readFileSync('/Users/kundanbapat/.localhost-ssl/localhost.crt')
    return { key: privateKey, cert: certificate, }
}

// --- Express middleware
if ('production'.length > 0) {
    app.use(express.static("build"))
}
// bodyParser() deprecated.  factory methods still available.
// express 4.16+ - express.json() and express.urlencoded() prefered.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();
app.use(jsonParser)
app.use(bodyParser.raw());

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

app.get('/', (req, res) => {
    console.log('/ get request')
    res.status(200).json({
        status: true,
        data: `Hello from Node Server at ${PORT_HTTPS}`
    })
})

const users = [
    {
        email: 'kundan.bapat@gmail.com',
        username: 'kundan',
        enc_password: 'ece3040fc3d84622bed5713df4b4edc12cfe2da1471f11cadc2928a704b21f89',
    }
]

app.post('/testjwt', jsonParser, (req: express.Request, res: express.Response) => {
    const token = req.body.token
    console.log('testjwt: token received: ', token)
    const verifyResult = jwt.verify(token, 'abcd')
    console.log('token you sent: ', token)
    console.log(`result of verification: ', ${verifyResult}`)
    console.log('next time provide op to perform')

    res.status(200).json({
        result: verifyResult,
        token_you_sent: token
    })
    return
})

// Mongo calls.
app.post('/mongo/create', (req, res) => {
    console.log('mongo create post request')
    // mongoService.create(req.body.user, (result: any) => {
    mongoService.create({
        email: 'a@b.com',
        password: '123',
        chatlets: [],
        friends: []
    }, (result: any) => {
        res.status(200).json({
            status: true,
            result,
        })
    })
})

// Mongo calls.
app.post('/mongo/read', (req, res) => {
    console.log('mongo read post request')
    mongoService.read(req.body.email, (result: any) => {
        res.status(200).json({
            status: true,
            result,
        })
    })
})


// Mongo calls.
app.post('/mongo/update', jsonParser, (req: express.Request, res: express.Response) => {
    console.log('mongo update post request - ', req.body.user)
    mongoService.update (req.body.user, (result: any) => {
        res.status(200).json({
            status: true,
            result,
        })
    })
})

// Mongo calls.
app.post('/mongo/remove', (req, res) => {
    console.log(' mongo remove post request')
    mongoService.remove (req.body.email)
})

app.post('/signup', jsonParser, (req: express.Request, res: express.Response) => {
    console.log('..../signup', req.body)
    sendEmail(req.body.code)
    res.status(200).end(JSON.stringify({
        success: 'sent email. please enter code'
    }, null, 2))
})

app.post('/login', jsonParser, (req: express.Request, res: express.Response) => {

    console.log('..../login', req.body)
    const email = req.body.email
    const password = req.body.password
    const enc = crypto.createHash('sha256').update(password).digest('hex')
    console.log(`${email}, ${password}`)
    console.log(`encoded: ${enc}`)

    console.log(`enc: ${enc}, from db: ${users[0].enc_password}`)
    // TODO: use docker psql - client is expected to hash their password. if stoken, orig password stays safe
    //  server - frequenty update token.
    if (users[0].email === email && users[0].enc_password === enc) {
        const payload = {
            data: enc,
        }
        let accessToken = jwt.sign(payload, 'abcd', {
            expiresIn: '60d',
        })
        console.log(`accesstoken: ${accessToken}`)
        res.status(200).json({
            login: true,
            token: accessToken,
        })
    } else {
        res.status(400).json({
            login: true,
            token: '',
            message: 'email and/or password did not match'
        })
    }
})

app.get('/dict/:lookupWord', (req, res) => {
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

const credOptions = getCredsForHttps()
// http.createServer(app)
https.createServer(credOptions, app)
    .listen(PORT_HTTPS, () => {
        console.log(`Express and 🚀 Server are running at: ${PORT_HTTPS}`)
    })