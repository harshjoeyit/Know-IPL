import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './style.css'


const Header = () => {

    const initState = {
        black: false,
        open: true,
    }

    // states 
    const [state, setState] = useState(initState)
    const overlayRef = useRef(null)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const now = (window.scrollY > 10) ? true : false;
            setState({
                ...state,
                black: now
            })
		});
    }, []);

    const handlePageChange = () => {
        if (!state.open) {
			handleOpenCloseNav();
		}
    }

    const handleOpenCloseNav = () => {
        let el = overlayRef.current;
        el.style.height = el.style.height == '100vh' ? '0' : '100vh';
        setState(ps => ({
            ...ps,
            open: !ps.open
        }))
    }

    return (
        <>
            <div className="overlay" ref={ overlayRef }>
                
                <div className={state.black ? 'header header_black' : 'header'} >
                    <Link to="/">
                        <div className="logo"></div>
                    </Link>
                    
                    <div className="nav-btn" onClick={ handleOpenCloseNav }>  
                    {
                        state.open 
                        ? <i className='fa fa-bars'></i>
                        : <i className='fa fa-times'></i>
                    }
                    </div>
                
                </div>
                
                <div className="overlay-content">
                    <Link to="/teams">
                        <span 
                            className="navlink"
                            onClick={handlePageChange}
                        >Teams</span>
                    </Link>
                    <Link to="/games">
                        <span 
                            className="navlink"
                            onClick={handlePageChange}
                        >Games</span>
                    </Link>
                    <Link to="/players">
                        <span 
                            className="navlink"
                            onClick={handlePageChange}
                        >Players</span>
                    </Link>
                    <Link to="/stats">
                        <span 
                            className="navlink"
                            onClick={handlePageChange}
                        >Stats</span>
                    </Link>
                </div>
            
            </div>

            <section className="banner">
            </section>
        </>
    )
}

export default Header
