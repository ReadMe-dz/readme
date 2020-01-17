import React from 'react'
import { NavLink } from 'react-router-dom'
import { isEmptyObj } from "../helpers/functions"
import searchIcon from '../assets/images/search-outline.svg'
import signOutIcon from '../assets/images/log-out-outline.svg'

export default function Navbar({ sign_out, user }) {

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
                        {

                            (!isEmptyObj(user))
                                ?
                                <div className="profile">
                                    <NavLink to="/">
                                        <div className="picture">
                                            <img src={`http://localhost:3300/${user.picture}`} alt="User profile" />
                                        </div>
                                        <p>{user.username}</p>
                                    </NavLink>
                                    <button onClick={sign_out}><img src={signOutIcon} alt="logout" /></button>
                                </div>
                                :
                                <div className="singing">
                                    <li className="link"><NavLink to="/signin" activeClassName="active-link">Sign In</NavLink></li>
                                    <li className="link"><NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink></li>
                                </div>
                        }
                    </ul>
                </li>
            </ul>
        </div>
    )
}

