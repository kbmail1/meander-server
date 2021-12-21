import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import Landing from './Landing'
import Login from './Login'

// no props from direct parent...
const Home = () => {
  const myContext = useContext(AppContext)

  let compToRender
  if (myContext.isLoggedIn()) {
    return <Landing />
  } else {
    return <Login />
  }
}

export default Home
