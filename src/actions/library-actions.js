import { generateUrl, generateUrlwithId, parseJsonResponse, OK } from '../helpers/api-helper'

import { playAlbum, playPlaylist, playSelectedSongFromServer, addSong, playSongInPlaylist } from './mediaPlayer-actions'

export const SET_ARTISTLIST = 'SET_ARTISTLIST'
export const SET_SELECTEDARTIST = 'SET_SELECTEDARTIST'
export const SET_SELECTEDALBUM = 'SET_SELECTEDALBUM'
export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const SET_SELECTEDPLAYLIST = 'SET_SELECTEDPLAYLIST'

export const ALBUM_TYPE = 'ALBUM';
export const PLAYLIST_TYPE = 'PLAYLIST';


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

export function setPlaylists(playlists) {
    return {
        type: SET_PLAYLISTS,
        playlists
    }
}

export function setSelectedPlaylist(playlist) {
    return {
        type: SET_SELECTEDPLAYLIST,
        playlist
    }
}


export function playSelectedAlbum(startingIndex, isShuffle) {
    return (dispatch, getState) => {
        var state = getState();
        var album = state.library.selectedAlbum;
        dispatch(playAlbum(album, startingIndex, isShuffle));
        dispatch(playSongInPlaylist(startingIndex));
    }
}

export function addSelectedAlbumToPlaylist() {
    return (dispatch, getState) => {
        var state = getState();
        var album = state.library.selectedAlbum;
        dispatch(addSong(album.song));
    }
}

export function addSelectedSongToPlaylist(type, index) {
    return (dispatch, getState) => {
        var state = getState();
        if(type === ALBUM_TYPE) {
            var album = state.library.selectedAlbum;
            dispatch(addSong([album.song[index]]))
        } else if (type === PLAYLIST_TYPE) {
            var playlist = state.library.selectedPlaylist;
            dispatch(addSong([playlist.entry[index]]))
        }
       
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
            .then(dispatch(setSelectedAlbum(null)))
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

export function getPlaylistsFromServer() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return fetch(generateUrl(server, 'getPlaylists'))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setPlaylists(json.playlists.playlist)))
    }
}

export function getSelectedPlaylistFromServer(playlistId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return fetch(generateUrlwithId(server, 'getPlaylist', playlistId))
            .then(response => response.json())
            .then(rawjson => parseJsonResponse(rawjson))
            .then(json => dispatch(setSelectedPlaylist(json.playlist ? json.playlist.entry : [])))
    }
}

export function playSelectedPlaylist(startingIndex, isShuffle) {
    return (dispatch, getState) => {
        var state = getState();
        var playlist = state.library.selectedPlaylist;
        dispatch(playPlaylist(playlist, startingIndex, isShuffle));
        dispatch(playSongInPlaylist(startingIndex))
    }
}

