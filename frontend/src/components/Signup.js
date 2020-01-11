import React, { useState } from 'react'
import Axios from 'axios'
import Navbar from './Navbar'
import openedEye from '../assets/images/eye-outline.svg'
import closedEye from '../assets/images/eye-off-outline.svg'
import wilaya from '../assets/data/wilaya.json'

export default function Signup() {
    const [user, setUser] = useState({ wilaya: "Adrar" })
    const [eyeIsOpen, setEyeIsOpen] = useState(false)
    const [validUser, setValidUser] = useState({ username: false, email: false, password: false, repassword: false })
    const [pictureName, setPictureName] = useState("No Profile Picture")
    const [message, setMessage] = useState({ value: null, type: null })

    const onInputChange = e => {
        if (e.target.name === "picture") {
            setPictureName(e.target.value.slice(e.target.value.lastIndexOf("\\") + 1))
            let picture = e.target.files[0]
            setUser({ ...user, picture })
        } else {
            if (e.target.name === "username") (e.target.value.length > 4 && /^[a-z0-9_\-]+$/i.test(String(e.target.value))) ? setValidUser({ ...validUser, username: true }) : setValidUser({ ...validUser, username: false })
            if (e.target.name === "email") (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e.target.value))) ? setValidUser({ ...validUser, email: true }) : setValidUser({ ...validUser, email: false })
            if (e.target.name === "password") (e.target.value.length > 6) ? setValidUser({ ...validUser, password: true }) : setValidUser({ ...validUser, password: false })
            if (e.target.name === "repassword") (e.target.value === user.password) ? setValidUser({ ...validUser, repassword: true }) : setValidUser({ ...validUser, repassword: false })

            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const onEyeClick = (e, button) => {
        e.preventDefault()
        if (eyeIsOpen) {
            document.querySelector("#" + button).setAttribute("type", "password")
            document.querySelector(".the-eye." + button + " img").setAttribute("src", closedEye)
            setEyeIsOpen(false)
        } else {
            document.querySelector("#" + button).setAttribute("type", "text")
            document.querySelector(".the-eye." + button + " img").setAttribute("src", openedEye)
            setEyeIsOpen(true)
        }
    }

    const onFormSubmit = e => {
        e.preventDefault()
        let user_data = new FormData()
        user_data.append('username', user.username)
        user_data.append('email', user.email)
        user_data.append('password', user.password)
        user_data.append('repassword', user.repassword)
        user_data.append('wilaya', user.wilaya)
        user_data.append('picture', user.picture)

        const url = 'http://localhost:3300/users'

        Axios.post(url, user_data)
            .then(res => setMessage({ value: "The User Has Been Created Successfully", type: "success" }))
            .catch(err => (err.response) ? setMessage({ value: err.response.data.message, type: "error" }) : setMessage({ value: err.message, type: "error" }))
    }

    return (
        <div className="signup">
            <Navbar />
            <div className="signup-container">
                <div className="form-container">
                    <h4>Sign Up</h4>
                    {(message) ? <div className={`message ${message.type}`}><p>{message.value}</p></div> : null}
                    <form onSubmit={onFormSubmit} encType="multipart/form-data">
                        <div className={`input-field ${validUser.username ? '' : 'error'}`}>
                            <label htmlFor="username">username</label>
                            <input type="text" onChange={onInputChange} name="username" id="username" />
                            {validUser.username ? <p></p> : <p>must be more then 4 chars ( alph-numeric chars only ).</p>}
                        </div>
                        <div className={`input-field ${validUser.email ? '' : 'error'}`}>
                            <label htmlFor="email">email</label>
                            <input type="email" onChange={onInputChange} name="email" id="email" />
                            {validUser.email ? <p></p> : <p>Unvalid email address.</p>}
                        </div>
                        <div className={`input-field ${validUser.password ? '' : 'error'}`}>
                            <label htmlFor="password">password</label>
                            <div>
                                <input type="password" onChange={onInputChange} name="password" id="password" />
                                <button className="the-eye password" onClick={(e) => onEyeClick(e, "password")}>
                                    <img src={closedEye} alt="display / hide the password" />
                                </button>
                            </div>
                            {validUser.password ? <p></p> : <p>Must be more then 6 chars.</p>}
                        </div>
                        <div className={`input-field ${validUser.password ? '' : 'error'}`}>
                            <label htmlFor="repassword">confirm password</label>
                            <div>
                                <input type="password" onChange={onInputChange} name="repassword" id="repassword" />
                                <button className="the-eye repassword" onClick={(e) => onEyeClick(e, "repassword")}>
                                    <img src={closedEye} alt="display / hide the password" />
                                </button>
                            </div>
                            {validUser.repassword ? <p></p> : <p>Must be identical to the password.</p>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="address">address</label>
                            <select id="address" name="wilaya" onChange={onInputChange}>
                                {wilaya.map((w, index) => <option key={index} value={w.name}>{w.code} {w.name}</option>)}
                            </select>
                        </div>
                        <div className="input-field">
                            <label htmlFor="picture">profile picture</label>
                            <input type="file" onChange={onInputChange} name="picture" id="picture" />
                            <span>{pictureName}</span>
                        </div>

                        <button disabled={!(validUser.email && validUser.password && validUser.username && validUser.repassword)}>Sign Up Now</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


