import Sound from '../helpers/sound'
import { shuffle } from '../helpers/audio-helper'

function handleError(err) {
    console.log(err);
}

function setSongActiveMap(item, index, activeIndex) {
    index === activeIndex ? item.isActive = true : item.isActive = false;
    return item;
}

const mediaPlayer = (
    state = { 
        songId: null,
        songUri: null,
        songSeek: 0,
        songCoverArtUri: null,
        songPalette: null,
        isPlaying: 0,
        mediaPlayer: null,
        activePlaylistIndex: null,
        activePlaylist: []
    }, 
    action ) => {
    let s = null;
    switch (action.type) {
        case('PLAY_SONG'):
            //If trying to 'play' current song don't do anything
            if (action.songId === state.songId) { return state; }
            //Make sure media player is unloaded so that multiple players aren't created
            if(state.mediaPlayer) { state.mediaPlayer.unload(); }

            s = Object.assign({}, state, { 
                songId: action.songId,
                songUri: action.uri,
                isPlaying: 1,
                songSeek: 0,
                mediaPlayer: new Sound(action.uri, null, handleError)
            });
            s.mediaPlayer.play();
            return s;
        case('PAUSE_SONG'):
            s = Object.assign({}, state, {
                isPlaying: !state.isPlaying,
                songSeek: (state.isPlaying)
                    ? state.mediaPlayer.getSeek()
                    : state.songSeek
            });
            if(!s.mediaPlayer) s.mediaPlayer = new Sound(state.songUri, null, handleError);
            if (s.isPlaying) {
                s.mediaPlayer.setSeek(s.songSeek);
                s.mediaPlayer.play();
            } else {
                s.mediaPlayer.stop();
            }
            return s;
        case('SEEK_SONG'):
            if(!state.mediaPlayer) state.mediaPlayer = new Sound(state.songUri, null, handleError);
            if (!action.seek && action.seek !== 0) {
                return Object.assign({}, state, {
                    songSeek: state.mediaPlayer.getSeek()
                });
            }

            state.mediaPlayer.setSeek(action.seek);
            return Object.assign({}, state, {
                songSeek: action.seek
            });
        case('PLAY_SELECTEDALBUM'):
            let songs = !action.album ? [] : action.isShuffle
                    ? shuffle(action.album.song)
                    : action.album.song
            return Object.assign({}, state, { 
                activePlaylist: (songs.length > 0)
                    ? songs.map(function(item, index) {
                        return setSongActiveMap(item, index, action.startingIndex);
                    })
                    : [],
                activePlaylistIndex: action.startingIndex
            });
        case('PLAY_SELECTEDPLAYLIST'): {
            let songs = !action.playlist.entry ? [] : action.isShuffle
                    ? shuffle(action.playlist.entry)
                    : action.playlist.entry
            return Object.assign({}, state, {
                activePlaylist: (songs.length > 0)
                    ? songs.map(function(item, index) {
                        return setSongActiveMap(item, index, action.startingIndex);
                    })
                    : [],
                activePlaylistIndex: action.startingIndex
            });
        }
        case('PLAY_TOPSONGS'): {
            return Object.assign({}, state, {
                activePlaylist: (action.topSongs.length > 0)
                    ? action.topSongs.map(function(item, index) {
                        return setSongActiveMap(item, index, action.startingIndex);
                    })
                    : [],
                activePlaylistIndex: action.startingIndex
            });
        }
        case('SET_PLAYLIST_ACTIVEINDEX'):
            return Object.assign({}, state, {
                activePlaylist: state.activePlaylist.map(function(item, index) {
                    return setSongActiveMap(item, index, action.playlistIndex);
                }),
                activePlaylistIndex: action.playlistIndex
            });
        case('ADD_SONG'):
            return Object.assign({}, state, {
                activePlaylist: state.activePlaylist.concat(action.songArray.map(function(item) {
                    //Always want the added songs to be 'inactive'
                    return setSongActiveMap(item, -1, state.activePlaylistIndex);
                })),
                activePlaylistIndex: !state.activePlaylistIndex ? 0 : state.activePlaylistIndex
            });
        case('SET_ART'):
            return Object.assign({}, state, {
                songCoverArtUri: action.coverArtUri,
                songPalette: action.palette
            });
        default:
            return state;
    }
}

export default mediaPlayer