import React from 'react'
import $ from 'jquery'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'

import * as fn from '../../utils/functions'
import * as user_action from '../../actions/user-actions'

@connect(store => {
    return { user: store.user }
})

export default class Welcome extends React.Component {

    componentDidMount = () => this.props.dispatch(user_action.getSession())

    render() {
        let { user: { loggedIn } } = this.props

        return (
            <div>
                { loggedIn ? <Redirect to='/' /> : null }
                <Helmet>
                    <title>Welcome!!</title>
                </Helmet>
                <FadeIn duration="300ms">
                    <h1>You're welcome, Login to continue!!</h1>
                </FadeIn>
            </div>
        )
    }
}
