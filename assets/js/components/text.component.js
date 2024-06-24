import { HTML } from '@brtmvdl/frontend'

export class TextComponent extends HTML {
  text = null
  title = null

  constructor(text = '', title = null) {
    super()
    this.text = text
    this.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
    if (this.title) {
      this.setAttr('title', this.title)
    }
    this.setStyle('margin', '1rem 0rem')
    this.setStyle('padding', '1rem')
  }
}
