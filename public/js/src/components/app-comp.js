import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './others/header-comp'
import Home from './home/home-comp'
import Welcome from './welcome/welcome-comp'
import Signup from './user/signup-comp'
import Login from './user/login-comp'
import Logout from './user/logout-comp'
import Error from './error/error-comp'

@connect(store => {
    return {
        user: store.user
    }
})

export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div className="app">
                    <Header user={this.props.user} />
                    <div className="notes_wrapper">
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/welcome' component={Welcome} />
                            <Route path='/signup' component={Signup} />
                            <Route path='/login' component={Login} />
                            <Route path='/logout' component={Logout} />
                            <Route path='/error/:what' component={Error} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}