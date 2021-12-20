import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import Home from './Home'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'

import * as dotenv from 'dotenv'
dotenv.config()

import './index.scss'

const App = () => {
  const [session, setSession] = useState({
    loggedIn: false,
    userid: 'guest',
  })
  const setLogin = (loggedIn: boolean, userid: string | null) => {
    setSession({
      ...session,
      loggedIn,
      userid: userid ? userid : 'guest',
    })
  }
  const isLoggedIn = () => session.loggedIn
  const [endpoints, setEndpoints] = useState({
    clientPort: process.env.CLIENT_PORT ? process.env.CLIENT_PORT : 7777,
    serverPort: process.env.SERVER_PORT ? process.env.SERVER_PORT : 8888,
  })

  const appProfile = {
    session,
    setLogin,
    isLoggedIn,
    endpoints,
  }

  return (
    <AppContext.Provider value={appProfile}>
      <Home />
    </AppContext.Provider>
  )
}

export default App
