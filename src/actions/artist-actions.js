import { generateUrl, parseJsonResponse, OK } from '../helpers/api-helper'

export const SET_ARTISTLIST = 'SET_ARTISTLIST'

export function setArtistList(artists) {
    return {
        type: SET_ARTISTLIST,
        artists
    }
}

export function getArtistsFromServer() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return fetch(generateUrl(server, 'getArtists'))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setArtistList(json.artists)))
    }
}