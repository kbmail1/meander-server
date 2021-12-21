import React, { useContext } from 'react'
import AppContext from './AppContext'

const Landing = () => {
  const myContext = useContext(AppContext)

  const handleLogout = (e) => {
    myContext.handleUpdateUserProfile({
      loggedIn: false,
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
