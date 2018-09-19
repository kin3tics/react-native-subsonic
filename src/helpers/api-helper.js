export const OK = 'ok';


export function generateUrl(server, apiAction) {
    return `${server.url}/rest/${apiAction}?u=${server.user}&p=${server.password}&v=${server.version}&f=${server.format}&c=${server.app}`
}

export function generateUrlwithId(server, apiAction, id) {
    return generateUrl(server, apiAction) + `&id=${id}`
}

export function generateUrlwithCustomParam(server, apiAction, param, data) {
    return generateUrl(server, apiAction) + `&${param}=${data}`
}

export function parseJsonResponse(json) {
    console.log(json);
    return json['subsonic-response'];
}