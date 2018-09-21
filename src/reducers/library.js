const library = (
    state = { 
        artists: [],
        selectedArtist: null,
        selectedArtistInfo: null,
        selectedArtistTopSongs: [],
        selectedAlbum: null,
        playlists: [],
        selectedPlaylist: null,
        searchQuery: '',
        searchResults: null
    }, 
    action ) => {
    switch (action.type) {
        case 'SET_ARTISTLIST':
            var artistArray = action.artists.index;
            artistArray.map(function(value) {
                value.title = value.name; 
                value.data = value.artist;
                value.artist = null;
            });
            return Object.assign({}, state, { 
                artists: artistArray 
            });
        case 'SET_SELECTEDARTIST':
            return Object.assign({}, state, { 
                selectedArtist: action.artist
            });
        case 'SET_SELECTEDARTISTINFO':
            return Object.assign({}, state, { 
                selectedArtistInfo: action.artistInfo
            });
        case 'SET_SELECTEDARTISTTOPSONGS':
            return Object.assign({}, state, { 
                selectedArtistTopSongs: action.topSongs
            });
        case 'SET_SELECTEDALBUM':
            return Object.assign({}, state, { 
                selectedAlbum: action.album 
            });
        case 'SET_PLAYLISTS':
            return Object.assign({}, state, { 
                playlists: action.playlists 
            });
        case 'SET_SELECTEDPLAYLIST':
            return Object.assign({}, state, { 
                selectedPlaylist: action.playlist 
            });
        case 'SET_SEARCHQUERY':
            return Object.assign({}, state, { 
                searchQuery: action.searchQuery 
            });
        case 'SET_SEARCHRESULTS':
            return Object.assign({}, state, { 
                searchResults: action.searchResults 
            });
        default:
            return state;
    }
}

export default library