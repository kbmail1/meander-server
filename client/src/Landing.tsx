import React, { useContext } from 'react'

import AppContext from './AppContext'

export default function Landing() {
  const myContext = useContext(AppContext)

  const handleLogout = (e) => {
    myContext.setLogin(false, null)
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
