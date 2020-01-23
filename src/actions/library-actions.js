import { getSubsonicInstance } from '../helpers/api-helper'

import { playAlbum, playPlaylist, playTopSongs, addSong, playSongInPlaylist } from './mediaPlayer-actions'

export const SET_ARTISTLIST = 'SET_ARTISTLIST'
export const SET_SELECTEDARTIST = 'SET_SELECTEDARTIST'
export const SET_SELECTEDARTISTINFO = 'SET_SELECTEDARTISTINFO'
export const SET_SELECTEDARTISTTOPSONGS = 'SET_SELECTEDARTISTTOPSONGS'
export const SET_SELECTEDALBUM = 'SET_SELECTEDALBUM'
export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const SET_SELECTEDPLAYLIST = 'SET_SELECTEDPLAYLIST'
export const SET_SEARCHQUERY = 'SET_SEARCHQUERY'
export const SET_SEARCHRESULTS = 'SET_SEARCHRESULTS'
export const SET_ALBUMLISTTYPE = 'SET_ALBUMLISTTYPE'
export const SET_ALBUMLIST = 'SET_ALBUMLIST'

export const ALBUM_TYPE = 'ALBUM'
export const PLAYLIST_TYPE = 'PLAYLIST'
export const TOPSONG_TYPE = 'TOPSONG'
export const SEARCH_TYPE = 'SEARCH'

export const RANDOM_TYPE = 'Random';
export const RECENTADD_TYPE = 'Recently Added'
export const PINNED_TYPE = 'Pinned'
export const TOPRATED_TYPE = 'Top Rated'
export const MOSTPLAYED_TYPE = 'Most Played'
export const RECENTPLAYED_TYPE = 'Recently Played'
export const GENRE_TYPE = 'By Genre'


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

export function setSelectedArtistInfo(artistInfo) {
    return {
        type: SET_SELECTEDARTISTINFO,
        artistInfo
    }
}

export function setSelectedArtistTopSongs(topSongs) {
    return {
        type: SET_SELECTEDARTISTTOPSONGS,
        topSongs
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

export function setSearchQuery(searchQuery) {
    return {
        type: SET_SEARCHQUERY,
        searchQuery
    }
}

export function setSearchResults(searchResults) {
    return {
        type: SET_SEARCHRESULTS,
        searchResults
    }
}

export function setLibraryAlbumListType(libraryAlbumListType) {
    return {
        type: SET_ALBUMLISTTYPE,
        libraryAlbumListType
    }
}

export function setLibraryAlbumList(libraryAlbumList) {
    return {
        type: SET_ALBUMLIST,
        libraryAlbumList
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
        var state = getState()
        if(type === ALBUM_TYPE) {
            var album = state.library.selectedAlbum
            dispatch(addSong([album.song[index]]))
        } else if (type === PLAYLIST_TYPE) {
            var playlist = state.library.selectedPlaylist
            dispatch(addSong([playlist.entry[index]]))
        } else if (type === TOPSONG_TYPE) {
            var topSongs = state.library.selectedArtistTopSongs
            dispatch(addSong([topSongs[index]]))
        } else if (type === SEARCH_TYPE) {
            var songs = state.library.searchResults.song
            dispatch(addSong([songs[index]])) 
        }
       
    }
}

export function getArtistsFromServer() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;
        getSubsonicInstance(server).browsing.getArtists()
            .then(json => dispatch(setArtistList(json.artists)))
    }
}

export function getSelectedArtistFromServer(artistId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;
        let subsonic = getSubsonicInstance(server);
        Promise.all([subsonic.browsing.getArtistInfo2(artistId), subsonic.browsing.getArtist(artistId)])
            .then(values => {
                if(values[0]) dispatch(setSelectedArtistInfo(values[0].artistInfo2))
                if(values[1]) {
                    dispatch(setSelectedArtist(values[1].artist))
                    dispatch(getArtistTopSongsFromServer(values[1].artist.name))
                }
            })
    }
}

function getArtistTopSongsFromServer(artistName) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;
        return getSubsonicInstance(server).browsing.getTopSongs(artistName)
            .then(json => dispatch(setSelectedArtistTopSongs(json.topSongs.song)))
    }
}

export function getSelectedAlbumFromServer(albumId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return getSubsonicInstance(server).browsing.getAlbum(albumId)
            .then(json => dispatch(setSelectedAlbum(json.album)))
    }
}

export function getPlaylistsFromServer() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return getSubsonicInstance(server).playlists.getPlaylists()
            .then(json => dispatch(setPlaylists(json.playlists.playlist)))
    }
}

export function getSelectedPlaylistFromServer(playlistId) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        return getSubsonicInstance(server).playlists.getPlaylist(playlistId)
            .then(json => dispatch(setSelectedPlaylist(json.playlist)))
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

export function playSelectedArtistTopSongs(startingIndex) {
    return (dispatch, getState) => {
        var state = getState();
        var topSongs = state.library.selectedArtistTopSongs;
        dispatch(playTopSongs(topSongs, startingIndex));
        dispatch(playSongInPlaylist(startingIndex));
    }
}

export function searchServer(searchText) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        if(!searchText) {
            dispatch(setSearchQuery(''));
            dispatch(setSearchResults(null));
            return;
        }

        dispatch(setSearchQuery(searchText))
        return getSubsonicInstance(server).searching.search3(searchText)
            .then(json => dispatch(setSearchResults(json.searchResult3)));
    }
}

export function playSearchedSong(index) {
    return (dispatch, getState) => {
       

        dispatch(addSelectedSongToPlaylist(SEARCH_TYPE, index))
        setTimeout(function() {
            var state = getState();
            var playlist = state.mediaPlayer.activePlaylist;

            dispatch(playSongInPlaylist(playlist.length-1))
        }, 250)

    }
}

export function getGenreList() {
    var state = getState();
    var server = state.server;
    var library = state.library;

    
    dispatch(setSearchQuery(searchText))
    return getSubsonicInstance(server).browsing.getGenres()
        .then(json => {
            dispatch(setGenreList(json.genres))
            if(!library.selectedGenre) {
                dispatch(setSelectedGenre(json.genres[0]))
            }
        })
}

function getAlbumListTypeFromNiceName(name) {
    switch(name) {
        case RANDOM_TYPE:
            return 'random'
        case RECENTADD_TYPE:
            return 'newest'
        case PINNED_TYPE:
            return 'starred'
        case MOSTPLAYED_TYPE:
            return 'frequent'
        case RECENTPLAYED_TYPE:
            return 'recent'
        case GENRE_TYPE:
            return 'byGenre'
    }
}

export function getAlbumList(type, genre, size, offset) {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;

        let niceType = getAlbumListTypeFromNiceName(type)
        var obj = {};
        if(genre) {
            obj['genre'] = genre;
        }
        if(size) {
            obj['size'] = size;
        } else {
            obj['size'] = 50;
        }
        if(offset) {
            obj['offset'] = offset;
        } else {
            obj['offset'] = 0;
        }

        return getSubsonicInstance(server).browsing.getAlbumList2(niceType, obj)
            .then(json => dispatch(setLibraryAlbumList((json.albumList2 && json.albumList2.album) ? json.albumList2.album : [])))
    }
}

export function pinSelectedAlbum() {
    return (dispatch, getState) => {
        var state = getState();
        var server = state.server;
        var selectedAlbum = state.library.selectedAlbum;

        var modifiedAlbum = Object.assign({}, selectedAlbum, { 
            starred: !(selectedAlbum.starred)
        });
    
        let action = modifiedAlbum.starred ? 'star' : 'unstar'
        return getSubsonicInstance(server).media[action]({ albumId: selectedAlbum.id })
            .then(() => dispatch(setSelectedAlbum(modifiedAlbum)))
    }
}

