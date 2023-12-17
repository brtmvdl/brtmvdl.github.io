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
  }

  children = {
    image: new nImage(),
    title: new HTML(),
    subtitle: new HTML(),
  }

  constructor({ id, title, subtitle } = {}) {
    super()

    this.state.id = id
    this.state.title = title
    this.state.subtitle = subtitle
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('margin', '2rem 0rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeftHTML().setContainerStyle('width', '50%'))
    flex.append(this.getRightHTML().setContainerStyle('width', '50%'))
    this.append(flex)
  }

  getLeftHTML() {
    return new HTML()
  }

  getRightHTML() {
    return new HTML()
  }

  getTitlesHTML() {
    const titles = new HTML()
    titles.append(this.getTitleHTML())
    titles.append(this.getSubtitleHTML())
    return titles
  }

  getHref() {
    return `/xp/${this.state.id}/`
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

  getImageHTML() {
    const link = new nLink2()
    link.href(this.getHref())
    this.children.image.src(`/xp/${this.state.id}/image.png`)
    return link.append(this.children.image)
  }
}

class LeftExperiences extends Experience {
  getLeftHTML() {
    return this.getImageHTML()
  }

  getRightHTML() {
    const html = new HTML()
    html.append(this.getTitleHTML())
    html.append(this.getSubtitleHTML())
    return html
  }
}

class RightExperiences extends Experience {
  getLeftHTML() {
    const html = new HTML()
    html.append(this.getTitleHTML())
    html.append(this.getSubtitleHTML())
    return html
  }

  getRightHTML() {
    return this.getImageHTML()
  }
}

export class Experiences extends HTML {
  onCreate() {
    experiences
      .map((xp, ix) => [xp, ix % 2 === 0])
      .map(([xp, side]) => this.append(side ? new LeftExperiences(xp) : new RightExperiences(xp)))
  }
}

export class Page extends Container {
  onCreate() {
    super.onCreate()
    this.children.content.append(new Socials())
    this.children.content.append(new Experiences())
  }
}
