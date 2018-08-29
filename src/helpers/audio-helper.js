export function getDurationArray (durationInSeconds) {
    var duration = [0,0];
    duration[0] = Math.floor(durationInSeconds / 60);
    duration[1] = durationInSeconds - (duration[0] * 60);
    duration[1] = duration[1] < 10 ? "0" + duration[1] : duration[1];
    return duration;
}

//The Fisher-Yates (aka Knuth) shuffle for Browser and Node.js
//Source: https://github.com/Daplie/knuth-shuffle
export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }