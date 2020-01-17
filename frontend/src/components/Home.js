import React, { useState } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { loaduser, signout } from '../redux-store/action-creators/auth'
import Navbar from './Navbar'
import { isEmptyObj } from "../helpers/functions"

function Home({ load_user, sign_out }) {

    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")

    if (token && isEmptyObj(user))
        Axios.get("http://localhost:3300/users/", { headers: { authorization: "Bearer " + token } })
            .then(res => {
                load_user(token, res.data.user)
                setUser(res.data.user)
            })
            .catch(err => console.dir(err))

    const _sign_out = () => {
        localStorage.removeItem("token")
        sign_out()
        window.location.reload()
    }

    return (
        <div className="home"><Navbar sign_out={_sign_out} user={user} /></div>
    )
}

const mapDispatchToProps = dispatch => ({
    load_user: token => dispatch(loaduser(token)),
    sign_out: () => dispatch(signout())
})
const mapStateToProps = store => ({ ...store })

export default connect(mapStateToProps, mapDispatchToProps)(Home)