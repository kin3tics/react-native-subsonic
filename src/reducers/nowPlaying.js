//import { MENU_MAIN } from '../actions/menu-actions'

const nowPlaying = (
    state = { 
        activePlaylistIndex: null,
        activePlaylist: []
    }, 
    action ) => {
    switch (action.type) {
        case('PLAY_SELECTEDALBUM'):
            return Object.assign({}, state, { 
                activePlaylist: (action.album && action.album.song.length > 0)
                    ? action.album.song
                    : [],
                activePlaylistIndex: action.startingIndex
            });
        default:
            return state;
    }
}

export default nowPlaying