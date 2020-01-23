import { AsyncStorage } from "react-native";
import md5 from 'md5';

function storeValueToAsync(obj) {
    try {
        let storingValue = JSON.stringify(obj);
        AsyncStorage.setItem('serverInfo', storingValue);
    } catch (error) { 
        console.log(error); 
    }
}

function generateSecret() {
    return [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
}

const server = (
    state = { 
        url: '',
        user: '',
        password: '',
        secret: '',
        version: '1.15.0',
        format: 'json',
        app: 'REACT_NATIVE',
        valid: false,
        message: null
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
            let secret = generateSecret();
            console.log(secret);
            var obj = Object.assign({}, state, { 
                password: md5(`${action.password}${secret}`),
                secret: secret
            });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERVERSION':
            var obj = Object.assign({}, state, { version: action.version });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERFORMAT':
            var obj = Object.assign({}, state, { format: 'json' });
            storeValueToAsync(obj);
            return obj;
        case 'SET_SERVERAPPNAME':
            var obj = Object.assign({}, state, { app: 'REACT_NATIVE' });
            storeValueToAsync(obj);
            return obj;
        case 'LOGIN_ATTEMPT':
            var obj = Object.assign({}, state, { 
                valid: action.success?true:false,
                message: action.errorMessage?action.errorMessage.code+': '+action.errorMessage.message:null
            });
            storeValueToAsync(obj);
            return obj;
        default:
            return state;
    }
}

export default server