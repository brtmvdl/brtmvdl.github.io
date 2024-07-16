import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class VideoComponent extends HTML {
  getName() { return 'video-component' }

  getTagName() { return 'video' }

  srcObject(stream) {
    this.element.srcObject = stream
  }

  play() {
    this.element.play()
  }
}
