import { HTML, nLink } from '../libs/frontend/index.js'

export class LinkComponent extends nLink {
  getName() { return 'link-component' }

  state = { text: null, href: null, }

  constructor({ text = null, href = null } = {}) {
    super()
    this.state.text = text
    this.state.href = href
  }

  onCreate() {
    super.onCreate()
    if (this.state.href) this.href(this.state.href)
    if (this.state.text) this.setText(this.state.text)
    this.setStyle('text-decoration', 'none')
    this.setStyle('display', 'inline-block')
    this.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem ')
  }

}
