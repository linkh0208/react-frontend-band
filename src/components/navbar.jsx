import { Link } from "react-router-dom"
import logo from '../assets/logonew.png'
function Navbar() {
    return (
        <div className="navbar">
                <Link to='/'><div><img className='logo' src={logo} /></div></Link>
            <div className="rightnavbar">
                <a href='https://www.instagram.com/tv.bonfire/' target='_blank' rel='noreferrer' className="nav-link">INSTAGRAM</a>
                <Link className="nav-link" to='/videos' >VIDEOS</Link>
                <Link className="nav-link" to='/music' >MUSIC</Link>
                <Link className="nav-link" to='/live' >LIVE</Link>
            </div>
        </div>
    )
}

export default Navbar