import { HTML } from '../libs/frontend/index.js'

export class TextComponent extends HTML {
  getName() { return 'text-component' }

  state = { text: null, title: null, }

  constructor({ text, title = null } = { text: null }) {
    super()
    this.state.text = text
    this.state.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    if (this.state.title) this.setAttr('title', this.state.title)
    this.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem ')
  }

}
