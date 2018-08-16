import { combineReducers } from 'redux'

import server from './server'
import menu from './menu'
import artists from './artists'
import nowPlaying from './nowPlaying'
import mediaPlayer from './mediaPlayer'


export default combineReducers({
    server,
    menu,
    artists,
    nowPlaying,
    mediaPlayer
})