import React from 'react'
import $ from 'jquery'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'

import * as fn from '../../utils/functions'
import * as user_action from '../../actions/user-actions'

@connect(store => {
    return {
        user: store.user
    }
})

export default class Logout extends React.Component{

    componentWillMount = () => {
        let { dispatch } = this.props
        dispatch(user_action.getSession())
        dispatch(user_action.logout())
    } 

    render(){
        let { user: { loggedIn } } = this.props

        return(
            <div>
                { !loggedIn ? <Redirect to="/login" /> : null }
                <Helmet>
                    <title>Logging you out!!</title>
                </Helmet>
                <FadeIn duration="300ms">
                    <h1>Logging you out..!!</h1>
                </FadeIn>
            </div>
        )
    }
}