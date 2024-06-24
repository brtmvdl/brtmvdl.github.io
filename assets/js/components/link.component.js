import { HTML, nLink } from '@brtmvdl/frontend'

export class LinkComponent extends nLink {
  state = {
    text: '',
    href: '',
  }

  constructor(text, href = '') {
    super()
    this.state.text = text
    this.state.href = href
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    this.href(this.state.href)
    this.setStyle('margin', '1rem 0rem 1rem 0rem')
    this.setStyle('text-decoration', 'none')
    this.setStyle('display', 'inline-block')
    this.setStyle('color', '#ffffff')
  }

}
