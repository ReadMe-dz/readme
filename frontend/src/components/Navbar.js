import React from 'react'
import { NavLink } from 'react-router-dom'

import searchIcon from '../assets/images/search-outline.svg'

export default function Navbar() {

    const onInputChange = e => {
        console.log(e.target.value)
    }

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <NavLink to="/">
                        <img src={`${process.env.PUBLIC_URL}/books-dz.logo.png`} alt="Books Dz Logo" /><span>Books Dz</span>
                    </NavLink>
                </li>

                <li className="links">
                    <ul>
                        <li className="search"><div className="icon"><img src={searchIcon} alt="search" /></div><input name="search" type="text" placeholder="Find your next book" onChange={onInputChange} /></li>

                        <li className="link"><NavLink to="/signin" activeClassName="active-link">Sign In</NavLink></li>
                        <li className="link"><NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
