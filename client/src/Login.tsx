import React, { useState, useContext } from 'react'
import AppContext from './AppContext'

const Login = () => {
  const [userid, setUser] = useState({ userid: '', password: '' })
  const myContext = useContext(AppContext)

  // force relogin.
  if (myContext.session?.isLoggedIn) {
    myContext.toggleLogin(null)
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    })
  }

  const handleLogin = () => {
    // TODO: validate... - no setXYZ if failed.
    myContext.toggleLogin(userid)
  }

  return (
    <form className="login-form">
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </form>
  )
}
