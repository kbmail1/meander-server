import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import Login from './Login'
import Landing from './Landing'

// no props from direct parent...
const Home = () => {
  const myContext = useContext(AppContext)

  let compToRender
  if (myContext.isLoggedIn()) {
    compToRender = <Landing />
  } else {
    compToRender = <Login />
  }

  return { compToRender }
}

export default Home
