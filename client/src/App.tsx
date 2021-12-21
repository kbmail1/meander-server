import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import Home from './Home'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'

import './app.scss'

const App = () => {
  const [userProfile, setUserProfile] = useState({
    loggedIn: false,
    userid: 'guest',
    since: new Date(),
  })
  const handleUpdateUserProfile = (
    loggedIn: boolean,
    userid: string | null,
    since: Date | null
  ) => {
    const freshUserProfile = Object.assign(appContext.userProfile, {
      loggedIn,
      userid,
      since,
    })
    setUserProfile(freshUserProfile)
  }
  const isLoggedIn = () => appContext.userProfile.loggedIn
  const [endpoints, setEndpoints] = useState({
    clientPort: 7777,
    serverPort: 8888,
  })

  const appContext = {
    userProfile,
    handleUpdateUserProfile,
    isLoggedIn,
    endpoints,
  }

  // TODO: make header, footer into components...
  return (
    <>
      <header>
        <div className="header-title">Meander Inc.</div>
      </header>
      <AppContext.Provider value={appContext}>
        <Home />
      </AppContext.Provider>
      <footer>
        <span className="footer__trademark">
          Meander<sup>&#174;</sup>
        </span>
        <span className="footer__copyright">
          <sup>&#169;</sup> Meander Inc.
        </span>
      </footer>
    </>
  )
}

export default App
