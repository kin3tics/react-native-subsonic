import { generateUrl, generateUrlwithId, parseJsonResponse, OK } from '../helpers/api-helper'

export const PLAY_SELECTEDALBUM = 'PLAY_SELECTEDALBUM'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'

export function playSong(songId, uri) {
    return {
        type: PLAY_SONG,
        songId,
        uri
    }
}

export function pauseSong() {
    return {
        type: PAUSE_SONG
    }
}

export function playAlbum(album, startingIndex) {
    return {
        type: PLAY_SELECTEDALBUM,
        album,
        startingIndex
    }
}

export function playSelectedSongFromServer(songId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(playSong(songId, uri))
    }
}