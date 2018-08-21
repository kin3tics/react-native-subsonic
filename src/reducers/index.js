import { combineReducers } from 'redux'

import server from './server'
import menu from './menu'
import library from './library'
import mediaPlayer from './mediaPlayer'


export default combineReducers({
    server,
    menu,
    library,
    mediaPlayer
})