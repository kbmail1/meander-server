import React, { useContext } from 'react'
import AppContext from './AppContext'
import './header-footer.scss'
import { guestMenu, adminMenu } from './resources/menus'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Landing from './Landing'
import About from './About'
import NotFound from './NotFound'
import Dictionary from './dict/Dictionary'

const Header = () => {
  const appContext = useContext(AppContext)

  let showMenu = guestMenu
  if (appContext?.isLoggedIn === true) {
    showMenu = adminMenu
  }
  const listItems = showMenu.map((item, ind) => (
    <li key={ind}>
      <Link to={item}>{item}</Link>
    </li>
  ))

  return (
    <>
      <header>
        <div className="header-title">Meander Inc.</div>
        <ul className="nav">{listItems}</ul>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dict" element={<Dictionary />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}
export default Header
