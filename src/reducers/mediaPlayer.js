const PAUSE = 'PAUSE';
const PLAY = 'PLAY';

import Sound from '../helpers/sound'

function handleError(err) {
    console.log(err);
}

const mediaPlayer = (
    state = { 
        songId: null,
        songSeek: 0,
        isPlaying: 0,
        mediaPlayer: null
    }, 
    action ) => {
    let s = null;
    switch (action.type) {
        case('PLAY_SONG'):
            if(state.mediaPlayer) { state.mediaPlayer.unload(); }
            s = Object.assign({}, state, { 
                songId: action.songId,
                isPlaying: 1,
                songSeek: 0,
                mediaPlayer: new Sound(action.uri, null, handleError)
            });
            s.mediaPlayer.play();
            return s;
        case('PAUSE_SONG'):
            s = Object.assign({}, state, {
                isPlaying: !state.isPlaying
            });
            if (s.isPlaying) {
                s.mediaPlayer.play();
            } else {
                s.mediaPlayer.stop();
            }
            return s;
        case('SEEK_SONG'):
            return Object.assign({}, state, {
                songSeek: !action.seek
            });
        default:
            return state;
    }
}

export default mediaPlayer