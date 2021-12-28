import './App.scss'
import Header from './Header'
import Footer from './Footer'
import Dictionary from './dict/Dictionary'

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Dictionary />
      <Footer />
    </div>
  )
}

export default App
