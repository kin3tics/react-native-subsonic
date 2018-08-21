import { generateUrl, generateUrlwithId, parseJsonResponse, OK } from '../helpers/api-helper'

export const PLAY_SELECTEDALBUM = 'PLAY_SELECTEDALBUM'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const SET_PLAYLIST_ACTIVEINDEX = 'SET_PLAYLIST_ACTIVEINDEX'
export const PREV_SONG = 'PREV_SONG'
export const SEEK_SONG = 'SEEK_SONG'
export const ADD_SONG = 'ADD_SONG'

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

export function setPlaylistActiveIndex(playlistIndex) {
    return {
        type: SET_PLAYLIST_ACTIVEINDEX,
        playlistIndex
    }
}

export function nextSong() {
    return {
        type: PREV_SONG
    }
}

export function seekSong(seek) {
    return {
        type: SEEK_SONG,
        seek
    }
}

export function addSong(songArray) {
    return {
        type: ADD_SONG,
        songArray
    }
}

let seekTrackerTimeout = null;

function beginSeekTracking() {
    return (dispatch, getState) => {
        if (seekTrackerTimeout) {
            clearTimeout(seekTrackerTimeout);
            seekTrackerTimeout = null;
        }
        seekTrackerTimeout = setTimeout(function() {
            var state = getState();
            var mediaPlayer = state.mediaPlayer

            if (mediaPlayer.isPlaying) {
                dispatch(seekSong(null));
                dispatch(beginSeekTracking());
            }
        }, 1000)
    }
}

export function playSelectedSongFromServer(songId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
    }
}

export function pauseSongInPlaylist() {
    return (dispatch) => {
        dispatch(pauseSong());
        dispatch(beginSeekTracking());
    }
}

export function playSongInPlaylist(playlistIndex) {
    return (dispatch, getState) => {
        var state = getState();
        var mediaPlayer = state.mediaPlayer;
        var server = state.server;

        //if index is outside of the bounds don't do anything
        if (playlistIndex < 0 
            || playlistIndex > (mediaPlayer.activePlaylist.length - 1)) {
            return;
        }
        var songId = mediaPlayer.activePlaylist[playlistIndex].id;
        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(setPlaylistActiveIndex(playlistIndex));
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
    }
}

export function playNextSongInPlaylist() {
    return (dispatch, getState) => {
        var state = getState();
        var mediaPlayer = state.mediaPlayer;
        var server = state.server;

        var playlistIndex = (mediaPlayer.activePlaylistIndex + 1);
        //if already at end of playlist don't do anything
        if (playlistIndex > (mediaPlayer.activePlaylist.length - 1)) {
            return;
        }
        var songId = mediaPlayer.activePlaylist[playlistIndex].id;
        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(setPlaylistActiveIndex(playlistIndex));
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
    }
}

export function playPreviousSongInPlaylist() {
    return (dispatch, getState) => {
        var state = getState();
        var mediaPlayer = state.mediaPlayer;
        var server = state.server;

        var playlistIndex = (mediaPlayer.activePlaylistIndex - 1);
        //if already at beginning of playlist don't do anything
        if (playlistIndex < 0) {
            return;
        }
        var songId = mediaPlayer.activePlaylist[playlistIndex].id;
        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(setPlaylistActiveIndex(playlistIndex));
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
    }
}
