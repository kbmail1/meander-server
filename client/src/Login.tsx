import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import './login.scss'

const Login = () => {
  const [creds, setCreds] = useState({ userid: '', password: '' })
  const [errors, setErrors] = useState({
    userIdError: false,
    passwordError: false,
  })

  const myContext = useContext(AppContext)

  // force logout.
  if (myContext.isLoggedIn()) {
    myContext.handleUpdateUserProfile({ loggedIn: false })
  }

  // this keeps field values up to date.
  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.stopPropagation()
    // TODO: validate... - no setXYZ if failed.

    if (creds.userid.trim().length === 0) {
    }

    myContext.handleUpdateUserProfile({
      loggedIn: true,
      userId: creds.userid,
      since: new Date(),
    })
  }

  return (
    <>
      <header>Meander Inc.</header>
      <form>
        <ul
          style={{
            border: '1px solid gray',
            overflow: 'auto',
          }}
        >
          <li>
            <h2>login</h2>
          </li>
          <li>
            <label htmlFor="userid" className="required">
              User ID
            </label>
            <input
              className="required"
              type="text"
              id="userid"
              placeholder="User Id"
              name="userid"
              value={creds.userid}
              onChange={handleChange}
            />
          </li>
          <li>
            <label htmlFor="password" className="required">
              Password
            </label>
            <input
              className="required"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={creds.password}
              onChange={handleChange}
            />
          </li>
          <li>
            <button className="submit-button"> Submit </button>
          </li>
        </ul>
      </form>
      <footer>
        <span style={{ paddingLeft: '20px', fontFamily: 'cursive' }}>
          Meander<sup>&#174;</sup>
        </span>
        <span>
          Copyright Meander Inc.<sup>&#169;</sup>
        </span>
      </footer>
    </>
  )
}

export default Login
