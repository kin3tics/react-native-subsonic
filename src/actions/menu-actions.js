import { generateUrl, parseJsonResponse, OK } from '../helpers/api-helper'

import { getArtistsFromServer } from './library-actions'

export const MENU_MAIN = 'MENU'
export const MENU_LIBRARY = 'LIBRARY'
export const MENU_SEARCH = 'SEARCH'
export const MENU_PLAYLIST = 'PLAYLIST'
export const MENU_NOWPLAYING = 'NOWPLAYING'

export const SET_MENU = 'SET_MENU'

export function setMenu(active) {
    return {
        type: SET_MENU,
        active
    }
}

