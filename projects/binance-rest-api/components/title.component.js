import { HTML, nH2 } from '@brtmvdl/frontend'

export class TitleComponent extends nH2 {
  text = null
  tag = 'h2'

  constructor(text = '', tag = 'h2') {
    super()
    this.text = text
    this.tag = tag
  }

  getName() {
    return 'title-component'
  }

  getTagName() {
    return this.tag || 'h2'
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
    this.setStyles()
  }

  setStyles() {
    this.setStyle('margin', '0rem')
    // this.setStyle('', '')
  }
}
