const library = (
    state = { 
        artists: [],
        selectedArtist: null,
        selectedAlbum: null
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
            return Object.assign({}, state, { artists: artistArray });
        case 'SET_SELECTEDARTIST':
            return Object.assign({}, state, { selectedArtist: action.artist});
        case 'SET_SELECTEDALBUM':
            return Object.assign({}, state, { selectedAlbum: action.album});
        default:
            return state;
    }
}

export default library