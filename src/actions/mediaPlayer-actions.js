import * as Vibrant from 'node-vibrant';

import { generateUrlwithId } from '../helpers/api-helper'

export const PLAY_SELECTEDALBUM = 'PLAY_SELECTEDALBUM'
export const PLAY_SELECTEDPLAYLIST = 'PLAY_SELECTEDPLAYLIST'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const SET_PLAYLIST_ACTIVEINDEX = 'SET_PLAYLIST_ACTIVEINDEX'
export const PREV_SONG = 'PREV_SONG'
export const SEEK_SONG = 'SEEK_SONG'
export const ADD_SONG = 'ADD_SONG'
export const SET_ART = 'SET_ART'

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

export function playAlbum(album, startingIndex, isShuffle) {
    return {
        type: PLAY_SELECTEDALBUM,
        album,
        startingIndex,
        isShuffle
    }
}

export function playPlaylist(playlist, startingIndex, isShuffle) {
    return {
        type: PLAY_SELECTEDPLAYLIST,
        playlist,
        startingIndex,
        isShuffle
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

export function setSongArt(coverArtUri, palette) {
    return {
        type: SET_ART,
        coverArtUri,
        palette
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

function setAutoProgression() {
    return (dispatch, getState) => {
        var state = getState();
        var mediaPlayer = state.mediaPlayer.mediaPlayer;
        mediaPlayer.off('end')
        mediaPlayer.once('end', function() {
            dispatch(pauseSong())
            dispatch(playNextSongInPlaylist())
        })
    }
}

export function playSelectedSongFromServer(songId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        var uri = generateUrlwithId(server, 'stream', songId);
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
        dispatch(setAutoProgression());
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
        var coverArt = mediaPlayer.activePlaylist[playlistIndex].coverArt;
        var uri = generateUrlwithId(server, 'stream', songId);
        let coverArtUri = generateUrlwithId(server, 'getCoverArt', coverArt);
        
        dispatch(setPlaylistActiveIndex(playlistIndex));
        dispatch(playSong(songId, uri));
        dispatch(beginSeekTracking());
        dispatch(setAutoProgression());

        if(mediaPlayer.songCoverArtUri === coverArtUri) return;

        let v = Vibrant.from(coverArtUri)
        v.getPalette((err, palette) => {
            dispatch(setSongArt(coverArtUri, palette));
        })
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
        dispatch(playSongInPlaylist(playlistIndex));
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
        dispatch(playSongInPlaylist(playlistIndex));
    }
}

export function setNewPlaylistOrder(newPlaylist) {
    return (dispatch, getState) => {
        var state = getState();
        var playlist = state.mediaPlayer.activePlaylist;
        var playlistIndex = state.mediaPlayer.activePlaylistIndex;

        var selectedIndexAfterReorder = newPlaylist.findIndex(i => i.id == playlist[playlistIndex].id);

        dispatch(playPlaylist(newPlaylist, selectedIndexAfterReorder, false))
    }
}
