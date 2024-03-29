import './App.css'
import Home from './pages/home'
import Music from './pages/music'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/navbar'
import homebg from './assets/tvbonfire.jpg'

function Background() {
  return (
    <div className='homebg-container'>
      <img
        className='homebg'
        src={homebg}
      />
    </div>
  )
}

function App() {
  return (
    <>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/music' element={<Music />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
