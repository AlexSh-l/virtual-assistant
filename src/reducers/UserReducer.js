import { User } from "../User"

const defaultState = {
    isAuthorized: false,
    name: null,
    info: ""
}

const AUTHORIZE_USER = "AUTHORIZE_USER"
const LOG_OUT = "LOG_OUT"

export const userReducer = (state = defaultState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case AUTHORIZE_USER:
            if ((action.payload.name === User.name) && (action.payload.password === User.password)) {
                newState.isAuthorized = true
                newState.name = User.name
                newState.info = User.info
            } else {
                newState.name = ""
                newState.info = ""
            }
            return newState
        case LOG_OUT:
            if (state.isAuthorized) {
                newState.isAuthorized = false
                newState.name = null
                newState.info = null
            }
            return newState
        default:
            return state
    }
}

export const authorizeUserAction = (payload) => {
    return {
        type: AUTHORIZE_USER,
        payload
    }
}

export const logOutUserAction = () => {
    return {
        type: LOG_OUT
    }
}