import { Howl } from 'howler'

export default class Sound {
  static setCategory() {}

  constructor(asset, basePath, error) {
    let that = this;
    this.sound = new Howl({
      src: [asset],
      onloaderror: error,
      html5: true,
      onplayerror: function(err) {
          console.log(err);
        that.sound.once('unlock', function() {
            that.sound.play()
        });
      }
    })

    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)  
    this.getSeek = this.getSeek.bind(this)
    this.setSeek = this.setSeek.bind(this) 
    this.off = this.off.bind(this)
    this.once = this.once.bind(this)
  }

  play() {
    this.sound.play()
    return this
  }

  setSeek(seek) {
    this.sound.seek(seek);
  }

  getSeek() {
    return this.sound.seek();
  }

  stop() {
    this.sound.stop()
    return this
  }

  off(event) {
    this.sound.off(event)
  }

  once(event, callback) {
    this.sound.once(event, callback)
  }

  unload() {
      this.sound.unload()
  }
}