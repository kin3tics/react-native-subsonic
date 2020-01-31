export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function getColorForMissingArtwork(index, theme) {
    let i = index % 5
    switch(i)
    {
        case 1:
            return theme.second
        case 2:
            return theme.third
        case 3:
            return theme.fourth
        case 4:
            return theme.fifth
        case 0:
        default:
            return theme.first
    }

}