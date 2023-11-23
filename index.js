import { HTML, nFlex, nH1, nImage, nLink, nSpan } from './libs/@brtmvdl/frontend/src/index.js'

import { projects } from './js/projects.js'

export class Page extends HTML {
  children = {
    top: new HTML,
    socials: new nFlex,
    experiencies: new HTML,
  }

  state = {
    socials: [
      { image: './img/twitter.svg', link: 'https://twitter.com/brtmvdl', },
      { image: './img/linkedin.svg', link: 'https://www.linkedin.com/in/brtmvdl', },
      { image: './img/github.svg', link: 'https://github.com/brtmvdl', },
    ],
  }

  onCreate() {
    this.append(this.getTop())
    this.append(this.getContent())
  }

  getTop() {
    this.children.top.setText('brtmvdl')

    this.children.top.setStyle('background-color', '#000000')
    this.children.top.setStyle('text-align', 'center')
    this.children.top.setStyle('font-size', '2rem')
    this.children.top.setStyle('padding', '1rem')
    this.children.top.setStyle('color', '#ffffff')

    return this.children.top
  }

  getContent() {
    const html = new HTML()

    html.append(this.getSocials())
    html.append(this.getExperiencies())

    html.setStyle('max-width', '40rem')
    html.setStyle('margin', '0 auto')
    html.setStyle('padding', '1rem')

    return html
  }

  getSocials() {
    this.state.socials.map(({ image: photo, link: url }, ix) => {
      const link = new nLink()
      link.href(url)
      const image = new nImage()
      image.src(photo)
      link.append(image)
      image.setStyle('width', '4rem')
      this.children.socials.append(link)
    })

    return this.children.socials
  }

  getExperiencies() {
    projects.map(({ title, subtitle, url }, ix) => {
      const html = new nLink()
      html.setStyle('color', '#000000')
      html.setStyle('padding', '1rem')
      html.href(`http://${url}`)

      const imageHTML = new nImage()
      imageHTML.src(`/img/${title}.png`)
      imageHTML.alt(title)
      // html.append(imageHTML)

      const titleHTML = new nH1()
      titleHTML.setText(title)
      html.append(titleHTML)

      this.children.experiencies.append(html)
    })

    return this.children.experiencies
  }
}
