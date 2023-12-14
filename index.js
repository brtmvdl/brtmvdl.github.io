import { HTML, nFlex, nH1, nImage, nLink } from '@brtmvdl/frontend'
import { Container } from './assets/js/components/container.js'
import { projects } from './assets/js/lists/projects.js'

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

export class Experiencies extends HTML {
  onCreate() {
    projects.map(({ title, subtitle, }, ix) => {
      const html = new nLink()
      html.setStyle('color', '#000000')
      html.setStyle('padding', '1rem')
      html.href(`/xp/${title}/`)

      const titleHTML = new nH1()
      titleHTML.setText(title)
      html.append(titleHTML)

      const imageHTML = new nImage()
      imageHTML.src(`./xp/${title}/image.png`)
      html.append(imageHTML)

      this.append(html)
    })
  }
}

export class Page extends Container {
  onCreate() {
    super.onCreate()
    this.children.content.append(new Socials())
    this.children.content.append(new Experiencies())
  }
}
