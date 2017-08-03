import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FadeIn } from 'animate-components'

export default class Error extends React.Component {
    render() {
        let { params: { what } } = this.props.match
            
        if (what == "notfound") {
            title = "User not found"
            desc = "user"
        } else if (what == "note_notfound") {
            title = "Note not found"
            desc = "note"
        } else {
            title = "Error"
            desc = "page"
        }

        return (
            <div class='error' >
                <Helmet>
                    <title>Oops! {title} • Notes App</title>
                </Helmet>
                <FadeIn duration="300ms" >
                    <div className="welcome_div error_div">
                        <div className="error_info">
                            <span>Oops, the {desc} you're looking for does not exist!!</span>
                        </div>
                        <img src="/images/error-3.svg" alt="" />
                        <div class="error_bottom">
                            <Link to='/' className="pri_btn error_login" >Try going to homepage</Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        )
    }
}
