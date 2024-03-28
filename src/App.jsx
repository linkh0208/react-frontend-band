import './App.css'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {
  return (
    <>
      < Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Home/> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
