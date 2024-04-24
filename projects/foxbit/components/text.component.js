import { HTML } from '@brtmvdl/frontend'

export class TextComponent extends HTML {
  state = {
    text: '',
    label: '',
  }

  constructor(text, label = '') {
    super()
    this.state.text = text
    this.state.label = label
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    if (this.state.label) 
      this.setAttr('title', this.state.label)
  }
}
