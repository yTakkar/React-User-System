const user_default = {
    loggedIn: false,
    session: {
        id: null,
        username: null,
        email: null,
        joined: null
    }
}

const user = (state=user_default, action) => {
    let py = action.payload
    switch (action.type) {
        case "GET_SESSION":
            return { ...state, loggedIn: py.loggedIn, session: py.session }
            break

        case "LOGIN":
            return { ...state, loggedIn: py.loggedIn, session: py.session }
            break

        case "LOGOUT":
            return { ...state, loggedIn: false, session: {} }
            break
    }
    return state
}

export default user