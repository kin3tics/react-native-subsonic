import { getSubsonicInstance, OK } from '../helpers/api-helper'

export const SET_SERVERNAME = 'SET_SERVERNAME'
export const SET_SERVERUSER = 'SET_SERVERUSER'
export const SET_SERVERPASS = 'SET_SERVERPASS'
export const SET_SERVERVERSION = 'SET_SERVERVERSION'
export const SET_SERVERFORMAT = 'SET_SERVERFORMAT'
export const SET_SERVERAPPNAME = 'SET_SERVERAPPNAME'
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'

export const TEST_SERVER = 'TEST_SERVER'

export function setServerName(url) {
    return {
        type: SET_SERVERNAME,
        url
    }
}

export function setServerUser(user) {
    return {
        type: SET_SERVERUSER,
        user
    }
}

export function setServerPassword(password) {
    return {
        type: SET_SERVERPASS,
        password
    }
}

export function setServerVersion(json) {
    return {
        type: SET_SERVERVERSION,
        version: json.version
    }
}

export function setServerFormat() {
    return {
        type: SET_SERVERFORMAT
    }
}

export function setServerAppName() {
    return {
        type: SET_SERVERAPPNAME
    }
}

export function setServerLogin(success, errorMessage) {
    return {
        type: LOGIN_ATTEMPT,
        success,
        errorMessage
    }
}

export function pingServer() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        if(!server.format || !server.app)
        {
            try {
            dispatch(setServerFormat());
            dispatch(setServerAppName());
            } catch (e) {
                //console.log(e)
            }
            return;
        }

        return getSubsonicInstance(server).system.ping().then(json => {
                dispatch(setServerVersion(json));
                if(json.status===OK) {
                    dispatch(setServerLogin(true))
                } else {
                    dispatch(setServerLogin(false, json.error))
                }
            })
    }
}

