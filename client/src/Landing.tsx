import React, { useContext } from 'react'
import AppContext from './AppContext'

const Landing = () => {
  const myContext = useContext(AppContext)

  const handleLogout = (e) => {
    myContext.handleUpdateUserProfile({
      loggedIn: false,
      userId: 'guest',
      since: new Date(),
    })
  }

  return (
    <div>
      Landing page
      <button name="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Landing
