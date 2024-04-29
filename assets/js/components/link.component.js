import { HTML, nLink } from '@brtmvdl/frontend'

export class LinkComponent extends nLink {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('margin', '1rem 0rem 1rem 0rem')
    this.setStyle('text-decoration', 'none')
    this.setStyle('display', 'inline-block')
    this.setStyle('color', '#ffffff')
  }
}
