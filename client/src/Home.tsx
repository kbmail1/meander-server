import { Routes, Link, Route, useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AppContext, { Role } from './AppContext'
import Landing from './Landing'
import Login from './Login'

const Home = () => {
  const navigate = useNavigate()

  const handleLogoutClick = (e) => {
    e.preventDefault()
    navigate('/landing')
  }
  const handleDictClick = (e) => {
    e.preventDefault()
    navigate('/dict')
  }

  const appContext = useContext(AppContext)
  if (!appContext || !appContext?.isLoggedIn) {
    return <Login />
  }

  if (appContext.role in [Role.Guest, Role.Admin]) {
    return <Landing />
  } else {
    return <Login />
  }
}

export default Home
