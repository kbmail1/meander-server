import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import Home from './Home'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'

import './index.scss'

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
    setUserProfile({
      ...userProfile,
      loggedIn,
      userid: userid ? userid : 'guest',
      since: since ? since : new Date(),
    })
  }
  const isLoggedIn = () => userProfile.loggedIn
  const [endpoints, setEndpoints] = useState({
    clientPort: 7777,
    serverPort: 8888,
  })

  const appProfile = {
    userProfile,
    handleUpdateUserProfile,
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
