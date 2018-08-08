const artists = (
    state = { 
        artists: [],
        currentArtist: null
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
        default:
            return state;
    }
}

export default artists