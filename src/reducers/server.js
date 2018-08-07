import { AsyncStorage } from "react-native";

function storeValueToAsync(obj) {
    try {
        let storingValue = JSON.stringify(obj);
        AsyncStorage.setItem('serverInfo', storingValue);
    } catch (error) { 
        console.log(error); 
    }
}

const server = (
    state = { 
        url: null,
        user: null,
        password: null,
        version: '1.15.0',
        format: 'json',
        app: 'REACT_NATIVE'
    }, 
    action ) => {
    switch (action.type) {
        case 'SET_SERVERNAME':
            var obj = Object.assign({}, state, { url: action.url });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERUSER':
            var obj = Object.assign({}, state, { user: action.user });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERPASS':
            var obj = Object.assign({}, state, { password: action.password });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERVERSION':
            var obj = Object.assign({}, state, { version: action.version });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERFORMAT':
            var obj = Object.assign({}, state, { format: 'json' });
            storeValueToAsync(obj);
            console.log(state);
            return obj;
        case 'SET_SERVERAPPNAME':
            var obj = Object.assign({}, state, { app: 'REACT_NATIVE' });
            storeValueToAsync(obj);
            console.log(state);
            return obj;
        default:
            return state;
    }
}

export default server