import { MENU_MAIN } from '../actions/menu-actions'

const menu = (
    state = { 
        active: MENU_MAIN
    }, 
    action ) => {
    switch (action.type) {
        case 'SET_MENU':
            return Object.assign({}, state, { active: action.active });
        default:
            return state;
    }
}

export default menu