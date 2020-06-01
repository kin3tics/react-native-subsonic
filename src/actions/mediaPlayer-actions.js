import * as Vibrant from 'node-vibrant';

import { getSubsonicInstance } from '../helpers/api-helper'

export const PLAY_SELECTEDALBUM = 'PLAY_SELECTEDALBUM'
export const PLAY_SELECTEDPLAYLIST = 'PLAY_SELECTEDPLAYLIST'
export const PLAY_SONG = 'PLAY_SONG'
export const PLAY_TOPSONGS = 'PLAY_TOPSONGS'
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

export function playTopSongs(topSongs, startingIndex) {
    return {
        type: PLAY_TOPSONGS,
        topSongs,
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

function setAutoProgression(attempt = 0) {
    return (dispatch, getState) => {
        var state = getState();
        var mediaPlayer = state.mediaPlayer.mediaPlayer;
        if(mediaPlayer) {
            mediaPlayer.off('end')
            mediaPlayer.once('end', function() {
                dispatch(pauseSong())
                dispatch(playNextSongInPlaylist())
            })
        } else if (attempt < 10) {
            setTimeout(() => { dispatch(setAutoProgression(attempt++))}, 240)
        }
    }
}

export function playSelectedSongFromServer(songId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        getSubsonicInstance(server).media.stream(songId).then(uri => {
            dispatch(playSong(songId, uri));
            dispatch(beginSeekTracking());
            dispatch(setAutoProgression());
        });
        
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
        let subsonic = getSubsonicInstance(server);

        //if index is outside of the bounds don't do anything
        if (playlistIndex < 0 
            || playlistIndex > (mediaPlayer.activePlaylist.length - 1)) {
            return;
        }
        var songId = mediaPlayer.activePlaylist[playlistIndex].id;
        var coverArt = mediaPlayer.activePlaylist[playlistIndex].coverArt;
        var prevCoverArtUri = mediaPlayer.songCoverArtUri;
        Promise.all([subsonic.media.stream(songId), subsonic.media.getCoverArt(coverArt)])
            .then(values => {
                var uri = values[0];
                let coverArtUri = values[1];
                
                dispatch(setPlaylistActiveIndex(playlistIndex));
                dispatch(playSong(songId, uri));
                dispatch(beginSeekTracking());
                dispatch(setAutoProgression());
        
                if(prevCoverArtUri !== coverArtUri || !mediaPlayer.songPalette) {
                    dispatch(getSongArt(coverArtUri));
                }
            })
    }
}

export function getSongArt(coverArtUri) {
    return (dispatch) => {
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

        //If in the middle of a song, go to the beginning of the song
        if (mediaPlayer.songSeek > 10) {
            dispatch(seekSong(0));
            
        } else {
            var playlistIndex = (mediaPlayer.activePlaylistIndex - 1);
            //if already at beginning of playlist don't do anything
            if (playlistIndex < 0) {
                return;
            }
            dispatch(playSongInPlaylist(playlistIndex));
        }
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
