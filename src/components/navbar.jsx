import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logonew.png';

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    // Function to close the menu
    const closeMenu = () => setIsNavExpanded(false);

    return (
        <>
            {isNavExpanded && <div className="overlay" onClick={closeMenu}></div>}
            <nav className="navbar">
                <Link to='/'><img className='logo' src={logo} alt='cartoon crt television on fire' /></Link>
                <div className={`hamburger-menu ${isNavExpanded ? "is-active" : ""}`} onClick={() => setIsNavExpanded(!isNavExpanded)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`rightnavbar ${isNavExpanded ? 'active' : ''}`}>
                    <a href='https://www.instagram.com/tv.bonfire/' target='_blank' rel='noreferrer' className="nav-link">INSTAGRAM</a>
                    <Link className="nav-link" to='/videos' onClick={() => closeMenu()}>VIDEOS</Link>
                    <Link className="nav-link" to='/music' onClick={() => closeMenu()}>MUSIC</Link>
                    <Link className="nav-link" to='/live' onClick={() => closeMenu()}>LIVE</Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
