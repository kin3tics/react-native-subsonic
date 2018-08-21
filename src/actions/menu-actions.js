import { generateUrl, parseJsonResponse, OK } from '../helpers/api-helper'

import { getArtistsFromServer } from './library-actions'

export const MENU_MAIN = 'MENU'
export const MENU_LIBRARY = 'LIBRARY'
export const MENU_SEARCH = 'SEARCH'

export const SET_MENU = 'SET_MENU'

export function setMenu(active) {
    return {
        type: SET_MENU,
        active
    }
}

export function dispatchArtistFetch(active) {
    return (dispatch) => {
    try {
        dispatch(setMenu(active));
        dispatch(getArtistsFromServer());
    }
    catch(e) {console.log(e)}
    }
}
