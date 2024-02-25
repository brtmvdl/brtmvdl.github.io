import { HTML } from '@brtmvdl/frontend'

export class TextComponent extends HTML {
  state = {
    text: '',
    title: '',
  }

  constructor(text, title = '') {
    super()
    this.text = text
    this.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    this.setAttr('title', this.state.title)
  }
}
