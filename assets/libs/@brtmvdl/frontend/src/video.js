import { nInput } from './input.js'

export class nVideo extends nInput {
  getName() {
    return 'video'
  }

  getTagName() {
    return 'video'
  }

  setSrcObject(value = null) {
    this.element.srcObject = value
    return this
  }

  getSrcObject() {
    return this.element.srcObject
  }

  play() {
    this.element.play()
    return this
  }

  stop() {
    this.element.stop()
    return this
  }

}
