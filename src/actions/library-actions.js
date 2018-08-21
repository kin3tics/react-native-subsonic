import { generateUrl, generateUrlwithId, parseJsonResponse, OK } from '../helpers/api-helper'

import { playAlbum, playSelectedSongFromServer } from './mediaPlayer-actions'

export const SET_ARTISTLIST = 'SET_ARTISTLIST'
export const SET_SELECTEDARTIST = 'SET_SELECTEDARTIST'
export const SET_SELECTEDALBUM = 'SET_SELECTEDALBUM'


export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'

export function setArtistList(artists) {
    return {
        type: SET_ARTISTLIST,
        artists
    }
}

export function setSelectedArtist(artist) {
    return {
        type: SET_SELECTEDARTIST,
        artist
    }
}

export function setSelectedAlbum(album) {
    return {
        type: SET_SELECTEDALBUM,
        album
    }
}


export function playSelectedAlbum(startingIndex = 0) {
    return (dispatch, getState) => {
        var state = getState();
        var album = state.library.selectedAlbum;
        dispatch(playAlbum(album,startingIndex));
        dispatch(playSelectedSongFromServer(album.song[0].id))
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

export function getSelectedArtistFromServer(artistId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return fetch(generateUrlwithId(server, 'getArtist', artistId))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setSelectedArtist(json.artist)))
    }
}

export function getSelectedAlbumFromServer(albumId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return fetch(generateUrlwithId(server, 'getAlbum', albumId))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setSelectedAlbum(json.album)))
    }
}
