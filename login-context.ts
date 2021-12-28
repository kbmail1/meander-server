import React, { useContext } from 'react'

export const loginStatus = {
  loggedIn: true,
  toggle: (status) => !status
}

const LoginContext