import React, { useState, useContext } from 'react'
import AppContext from './AppContext'
import BannerMessage, * as banner from './BannerMessage'
import './login.scss'

const Login = () => {
  const [creds, setCreds] = useState({ userid: '', password: '' })
  const [errors, setErrors] = useState({
    userIdError: false,
    passwordError: false,
  })
  const [bannerConfig, setBannerConfig] = useState(banner.DefaultConfig)
  const myContext = useContext(AppContext)

  // force logout.
  if (myContext.isLoggedIn()) {
    myContext.handleUpdateUserProfile({ loggedIn: false })
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    // TODO: validate... then rest ...  Right now, stay on same (login) page and show/test banner on submit

    /*
    myContext.handleUpdateUserProfile({
      loggedIn: true,
      userId: creds.userid,
      since: new Date(),
    })
    */
  }

  // this keeps field values up to date.
  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <>
      <BannerMessage />
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
          <button className="submit-button" onClick={handleSubmit}>
            {' '}
            Submit{' '}
          </button>
        </li>
      </ul>
    </>
  )
}

export default Login
