import AppContext, { starterAppContext } from './AppContext'
import Header from './Header'
import Footer from './Footer'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Landing from './Landing'
import About from './About'
import NotFound from './NotFound'
import Dictionary from './dict/Dictionary'

const App = () => {
  // TODO: make header, footer into components...
  return (
    <>
      <AppContext.Provider value={starterAppContext}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  )
}

export default App
