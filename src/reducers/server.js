import md5 from 'md5';

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
            return Object.assign({}, state, { url: action.url });
        case 'SET_SERVERUSER':
            return Object.assign({}, state, { user: action.user });
        case 'SET_SERVERPASS':
            let secret = generateSecret();
            return Object.assign({}, state, { 
                password: md5(`${action.password}${secret}`),
                secret: secret
            });
        case 'SET_SERVERVERSION':
            return Object.assign({}, state, { version: action.version });
        case 'SET_SERVERFORMAT':
            return Object.assign({}, state, { format: 'json' });
        case 'SET_SERVERAPPNAME':
            return Object.assign({}, state, { app: 'REACT_NATIVE' });
        case 'LOGIN_ATTEMPT':
            return Object.assign({}, state, { 
                valid: action.success?true:false,
                message: action.errorMessage?action.errorMessage.code+': '+action.errorMessage.message:null
            });
        default:
            return state;
    }
}

export default server