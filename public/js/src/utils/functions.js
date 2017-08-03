import $ from 'jquery'
import axios from 'axios'
import Notify from 'handy-notification'
import P from 'bluebird'
import * as user_action from '../actions/user-actions'

// FUNCTION FOR SHORTENING
const shortener = (elem, length) => {
    let parse = parseInt(length),
        len = elem.length
    if (!parse) { return; }
    return (len >= parse) ? `${elem.substr(0, length - 2)}..` : (len < parse) ? elem : null
}

// FUNCTION TO TOGGLE
const toggle = el => {
    let style = el.style.display
    style === "none" ? el.style.display = "block" : el.style.display = "none"
}

// FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD
const c_first = str => str.charAt(0).toUpperCase() + str.substr(1)

// TO REMOVE LINE OF LAST ELEMENT
const last_line_remover = () => {
    $('.modal_main').children().eq($('.display_content').children().length - 1).find('hr').remove()
}

// FUNCTION FOR GOING BACK
const back = (e, history) => {
    e.preventDefault()
    history.goBack()
}

// FUNCTION FOR COMMON LOGIN
const commonLogin = options => {
    let 
        { of, dispatch, data, btn, url, done, defBtnValue } = options,
        overlay2 = $('.overlay-2')

    btn
        .attr('value', 'Please wait..')
        .addClass('a_disabled')

    $.ajax({
        url,
        data,
        method: "POST",
        dataType: "JSON",
        success: (data) => {
            let { mssg, success, loggedIn, session } = data
            console.log(data)
            if (success) {
                of == "login" ? dispatch(user_action.login({ loggedIn, session })) : null
                Notify({ value: mssg, done: () => done() })
                btn.attr('value', 'Redirecting..')
            } else {
                Notify({ value: mssg })
                btn
                    .attr('value', defBtnValue)
                    .removeClass('a_disabled')
            }
            btn.blur()
        }
    })
}

module.exports = {
    shortener,
    toggle,
    c_first, 
    last_line_remover,
    back,
    commonLogin
}
