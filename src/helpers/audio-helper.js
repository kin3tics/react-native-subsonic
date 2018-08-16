export function getDurationArray (durationInSeconds) {
    var duration = [0,0];
    duration[0] = Math.floor(durationInSeconds / 60);
    duration[1] = durationInSeconds - (duration[0] * 60);
    duration[1] = duration[1] < 10 ? "0" + duration[1] : duration[1];
    return duration;
}