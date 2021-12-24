import { Routes, Link, Route, useParams, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleLogoutClick = (e) => {
    e.preventDefault()
    navigate('/landing')
  }
  const handleDictClick = (e) => {
    e.preventDefault()
    navigate('/dict')
  }

  return (
    <>
      <div style={{ position: 'absolute', top: '120px' }}>
        I am Home
        <button onClick={handleLogoutClick}>Logout</button>
        <button onClick={handleDictClick}>Dictionary</button>
      </div>
    </>
  )
}

export default Home
