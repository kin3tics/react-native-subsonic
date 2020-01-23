export const OK = 'ok';


export function generateUrl(server, apiAction) {
    return `${server.url}/rest/${apiAction}?u=${server.user}&p=${server.password}&v=${server.version}&f=${server.format}&c=${server.app}`
}

export function generateUrlwithId(server, apiAction, id) {
    return generateUrlwithCustomParams(server, apiAction, {id: id});
}

export function generateUrlwithCustomParam(server, apiAction, param, data) {
    var object = {};
    object[param] = data;
    return generateUrlwithCustomParams(server, apiAction, object);
}

export function generateUrlwithCustomParams(server, apiAction, paramData) {
    var url = generateUrl(server, apiAction);
    
    Object.keys(paramData).forEach(function(key,index) {
        url+= `&${key}=${paramData[key]}`;
    });

    return url;
}

export function parseJsonResponse(json) {
    return json['subsonic-response'];
}

export function getSubsonicInstance(server) {
    return require('subsonicjs')(server.user, server.password, server.secret, server.url);
}