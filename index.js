import { HTML, nFlex, nH1, nImage, nLink } from '@brtmvdl/frontend'

import { Container } from './assets/js/components/container.js'
import { experiences } from './assets/js/lists/xp.js'

export class Socials extends nFlex {
  onCreate() {
    const self = this
    self.setStyles()

    Array.from(['twitter', 'linkedin', 'github']).map((social) => {
      const link = new nLink()
      link.href(`/pages/${social}/`)
      const image = new nImage()
      image.setStyle('max-width', '4rem')
      image.src(`/assets/img/${social}.svg`)
      link.append(image)
      self.append(link)
    })
  }

  setStyles() {
    super.setStyles()
    this.spaceBetween()
    this.setStyle('min-width', '100%')
  }
}

class nLink2 extends nLink {
  onCreate() {
    this.setStyle('color', 'inherit')
    this.setStyle('text-decoration', 'none')
  }
}

class Experience extends HTML {
  state = {
    id: null,
    title: null,
    subtitle: null,
    dates: [],
    tags: [],
  }

  children = {
    image: new nImage(),
    title: new HTML(),
    subtitle: new HTML(),
    dates: new HTML(),
    tags: new HTML(),
  }

  constructor({ id, title, subtitle, dates = [], tags = [] } = {}) {
    super()

    this.state.id = id
    this.state.title = title
    this.state.subtitle = subtitle
    this.state.dates = dates
    this.state.tags = tags
  }

  onCreate() {
    this.setStyles()
    this.append(this.getImageHTML())
    this.append(this.getTitleHTML())
    this.append(this.getSubtitleHTML())
  }

  setStyles() {
    this.setStyle('margin', '2rem 0rem')
  }

  getHref() {
    return `/xp/${this.state.id}/`
  }

  getImageHTML() {
    const link = new nLink2()
    link.href(this.getHref())
    this.children.image.src(`/xp/${this.state.id}/image.jpg`)
    return link.append(this.children.image)
  }

  getTitleHTML() {
    const link = new nLink2()
    link.href(this.getHref())
    this.children.title.setText(this.state.title)
    this.children.title.setStyle('font-size', '2rem')
    return link.append(this.children.title)
  }

  getSubtitleHTML() {
    const link = new nLink2()
    link.href(this.getHref())
    this.children.subtitle.setText(this.state.subtitle)
    return link.append(this.children.subtitle)
  }

}

export class Experiences extends HTML {
  onCreate() {
    experiences.map((xp) => this.append(new Experience(xp)))
  }
}

export class Page extends Container {
  onCreate() {
    super.onCreate()
    this.children.content.append(new Socials())
    this.children.content.append(this.getTitle('Experiences'))
    this.children.content.append(new Experiences())
  }

  getTitle(title) {
    const html = new nH1()
    html.setText(title)
    return html
  }
}
