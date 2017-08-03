import axios from 'axios'

const getSession = () => {
    return dispatch => {
        axios.post('/api/get-session')
            .then(s => dispatch({ type: "GET_SESSION", payload: s.data }))
            .catch(e => console.log(e))
    }
}

const login = session => {
    return {
        type: "LOGIN",
        payload: session
    }
}

const logout = () => {
    return dispatch => {
        axios.post('/user/logout')
            .then(s => dispatch({ type: "LOGOUT", payload: s.data }) )
            .catch(e => console.log(e) )
    }
}

module.exports = {
    getSession,
    login,
    logout
}