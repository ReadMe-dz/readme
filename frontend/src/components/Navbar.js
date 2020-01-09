import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><img src={`${process.env.PUBLIC_URL}/books-dz.logo.png`} /><span>BooksDz</span></li>
                <li>search</li>
                <li>login</li>
                <li>subsrcibe</li>
            </ul>
        </div>
    )
}
