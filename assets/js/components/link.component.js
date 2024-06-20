import { HTML, nLink } from '@brtmvdl/frontend'

export class LinkComponent extends HTML {
  state = {
    text: '',
    href: '',
  }

  children = {
    link: new nLink(),
  }

  constructor(text, href = '') {
    super()
    this.state.text = text
    this.state.href = href
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    this.children.link.setText(this.state.text)
    this.children.link.href(this.state.href)
    this.children.link.setStyle('margin', '1rem 0rem 1rem 0rem')
    this.children.link.setStyle('text-decoration', 'none')
    this.children.link.setStyle('display', 'inline-block')
    this.children.link.setStyle('color', '#ffffff')
    return this.children.link
  }
}
