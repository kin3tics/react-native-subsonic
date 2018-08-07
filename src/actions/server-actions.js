import { generateUrl, parseJsonResponse } from '../helpers/api-helper'

export const SET_SERVERNAME = 'SET_SERVERNAME'
export const SET_SERVERUSER = 'SET_SERVERUSER'
export const SET_SERVERPASS = 'SET_SERVERPASS'
export const SET_SERVERVERSION = 'SET_SERVERVERSION'
export const SET_SERVERFORMAT = 'SET_SERVERFORMAT'
export const SET_SERVERAPPNAME = 'SET_SERVERAPPNAME'

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
        api: json.version
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

export function testServer(json) {
    return {
        type: TEST_SERVER,
        api: json.api
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
            } catch (e) {console.log(e)}
            return;
        }

        return fetch(generateUrl(server, 'ping'))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setServerVersion(json)))
    }
}

