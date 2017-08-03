import React from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

export default class Header extends React.Component {
    render() {
        let { user: { loggedIn } } = this.props

        return (
            <div class='header_loggedin' >
                {
                    loggedIn ?
                        <div class='left'>
                            <NavLink activeClassName='ha_active' exact={true} to='/' >Home</NavLink>
                        </div>
                    : 
                        <div class='left'>
                            <NavLink activeClassName='ha_active' exact={true} to='/welcome' >Home</NavLink>
                            <NavLink activeClassName='ha_active' to='/signup' >Signup</NavLink>
                            <NavLink activeClassName='ha_active' to='/login' >Login</NavLink>
                        </div>
                }
                {
                    loggedIn ?
                        <div className='right'>
                            <NavLink activeClassName='ha_active' to='/logout' >Logout</NavLink>
                        </div>
                    : 
                        null
                }
            </div>
        )
    }
}
