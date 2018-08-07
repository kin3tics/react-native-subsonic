
export function generateUrl(server, apiAction) {
    return `${server.url}/rest/${apiAction}?u=${server.user}&p=${server.password}&v=${server.version}&f=${server.format}&c=${server.app}`
}

export function parseJsonResponse(json) {
    console.log(json);
    return json['subsonic-response'];
}