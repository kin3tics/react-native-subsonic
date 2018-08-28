const library = (
    state = { 
        artists: [],
        selectedArtist: null,
        selectedAlbum: null,
        playlists: [],
        selectedPlaylist: null
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
        default:
            return state;
    }
}

export default library