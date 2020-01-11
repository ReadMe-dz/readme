import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'

import ReduxStore from './redux-store'

export default function App() {
    return (
        <ReduxStore>
            <Router>
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route exact={true} path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </ReduxStore>
    )
}
