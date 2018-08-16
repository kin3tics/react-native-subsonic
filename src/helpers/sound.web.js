import { Howl } from 'howler'

export default class Sound {
  static setCategory() {}

  constructor(asset, basePath, error) {
    that = this;
    this.sound = new Howl({
      src: [asset],
      onloaderror: error,
      html5: true,
      onplayerror: function(err) {
          console.log(err);
        that.sound.once('unlock', function() {
            that.sound.play();
        });
      }
    })
    
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)    
  }

  play() {
    this.sound.play()
    return this
  }

  stop() {
    this.sound.stop()
    return this
  }

  unload() {
      this.sound.unload()
  }
}