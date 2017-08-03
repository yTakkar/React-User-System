import React from 'react'
import $ from 'jquery'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import Timeago from 'handy-timeago'

import * as fn from '../../utils/functions'
import * as user_action from '../../actions/user-actions'

@connect(store => {
    return { user: store.user }
})

export default class Home extends React.Component{

    componentDidMount = () => this.props.dispatch(user_action.getSession())

    render(){
        let 
            { user: { loggedIn, session: { username, email, joined } } } = this.props,
            j = Timeago(joined)

        return (
            <div>
                { !loggedIn ? <Redirect to="/welcome" /> : null }
                <Helmet>
                    <title>Hello!! How are you??</title>
                </Helmet>
                <FadeIn duration="300ms">
                    <h1>{`Hello to this adventurous world from ${username} having the e-mail address of ${email} who joined this app ${j}`}</h1>
                </FadeIn>
            </div>
        )
    }
}
