import { combineReducers } from 'redux'

import server from './server'
import menu from './menu'
import artists from './artists'


export default combineReducers({
    server,
    menu,
    artists
})