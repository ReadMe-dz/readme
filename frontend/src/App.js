import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route exact={true} path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
