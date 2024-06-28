import { HTML } from '@brtmvdl/frontend'

export class nAudio extends HTML {
  constructor(src) {
    super()
    this.setSrc(src)
    this.setAttr('controls', '')
  }

  getTagName() {
    return 'audio'
  }

  getName() {
    return 'audio'
  }

  setSrc(src) {
    this.element.src = src
    return this
  }

}
