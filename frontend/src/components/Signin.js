import React, { useState } from 'react'
import Axios from 'axios'
import Navbar from './Navbar'
import openedEye from '../assets/images/eye-outline.svg'
import closedEye from '../assets/images/eye-off-outline.svg'
import { connect } from 'react-redux'
import { signin } from '../redux-store/action-creators/auth'

function Signin({ history }) {
    const [user, setUser] = useState({})
    const [eyeIsOpen, setEyeIsOpen] = useState(false)
    const [validUser, setValidUser] = useState({ email: false, password: false })
    const [message, setMessage] = useState({ value: null, type: null })

    const onInputChange = e => {
        if (e.target.name === "email") (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e.target.value))) ? setValidUser({ ...validUser, email: true }) : setValidUser({ ...validUser, email: false })
        if (e.target.name === "password") (e.target.value.length > 6) ? setValidUser({ ...validUser, password: true }) : setValidUser({ ...validUser, password: false })
        setUser({ ...user, [e.target.name]: e.target.value })
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
        const url = 'http://localhost:3300/users/login'
        Axios.post(url, user)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                signin(res.data.token, res.data.user)
                history.push("/")
            })
            .catch(err => (err.response) ? setMessage({ value: err.response.data.message, type: "error" }) : setMessage({ value: err.message, type: "error" }))
    }

    return (
        <div className="signin">
            <Navbar />
            <div className="signin-container">
                <div className="form-container">
                    <h4>Sign In</h4>
                    {(message) ? <div className={`message ${message.type}`}><p>{message.value}</p></div> : null}

                    <form onSubmit={onFormSubmit} encType="multipart/form-data">
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
                        <button disabled={!(validUser.email && validUser.password)}>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signin: (token, user) => dispatch(signin(token, user))
})

export default connect(null, mapDispatchToProps)(Signin);