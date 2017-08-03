import React from 'react'
import $ from 'jquery'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Notify from 'handy-notification'

import * as fn from '../../utils/functions'
import * as user_action from '../../actions/user-actions'

@connect(store => {
    return { user: store.user }
})

export default class Signup extends React.Component{

    state = {
        username: '',
        email: '',
        password: '',
        password_again: '',
        redirect: false
    }  
    
    componentDidMount = () => {
        $('.r_username').focus()
        this.props.dispatch(user_action.getSession())
    } 

    update_ = (e, of) => {
        let v = e.target.value
        switch (of) {
            case "username":
                this.setState({ username: v })
                break;
            case "email":
                this.setState({ email: v })
                break;
            case "password":
                this.setState({ password: v })
                break;
            case "password_again":
                this.setState({ password_again: v })
                break;
        }
    }

    signup = e => {
        e.preventDefault()
        let
            username = $('.r_username').val(),
            email = $('.r_email').val(),
            password = $('.r_password').val(),
            password_again = $('.r_password_again').val()

        if (!username || !email || !password || !password_again) {
            Notify({ value: "Values are missing!" })
        } else if (password != password_again) {
            Notify({ value: "Passwords don't match!" })
        } else {

            let signupOpt = {
                of: "signup",
                data: {
                    username,
                    email,
                    password,
                    password_again
                },
                btn: $('.r_submit'),
                url: "/user/signup",
                done: () => this.setState({ redirect: true }),
                defBtnValue: "Sign up for free",
            }
            fn.commonLogin(signupOpt)

        }
    }

    render(){
        let 
            { username, email, password, password_again, redirect } = this.state,
            { user: { loggedIn } } = this.props

        return(
            <div>
                { redirect ? <Redirect to="/login" /> : null }
                { loggedIn ? <Redirect to="/" /> : null }
                <Helmet>
                    <title>Signup To Continue!!</title>
                </Helmet>
                <FadeIn duration="300ms">
                    <div className="notes_wrapper">
                        <div class="log_sign">
                            <Link to="/login" class="pri_btn">Already have an account?</Link>
                        </div>
                        <div className="register cua">
                            <div class="display_text">
                                <span>Get started now and let the fun begins</span>
                            </div>
                            <form className="form_register" onSubmit={this.signup} >
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={username} 
                                    class="r_username" 
                                    autoFocus 
                                    spellCheck="false" 
                                    autoComplete='false' 
                                    placeholder='Username' 
                                    required  
                                    onChange={e => this.update_(e, "username")}
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={email} 
                                    class="r_email" 
                                    spellCheck="false" 
                                    autoComplete='false' 
                                    placeholder='Email' 
                                    required 
                                    onChange={e => this.update_(e, "email")}
                                />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={password} 
                                    class="r_password" 
                                    placeholder='Password' 
                                    required
                                    onChange={e => this.update_(e, "password")}
                                />
                                <input 
                                    type="password" 
                                    name="password_again" 
                                    value={password_again} 
                                    class="r_password_again" 
                                    placeholder='Password again' 
                                    required 
                                    onChange={e => this.update_(e, "password_again")}
                                />
                                <input type="submit" name="" value="Sign up for free" class="r_submit" />
                            </form>
                        </div>
                    </div>
                </FadeIn>
            </div>
        )
    }
}