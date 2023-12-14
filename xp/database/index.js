import { HTML, nH1, nLink } from '@brtmvdl/frontend'

class Container extends HTML {
  onCreate() {
    this.setStyles()
  }

  setStyles() {
    this.setStyle('min-height', '100vh')
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}

export class Page extends HTML {
  children = {
    container: new Container(),
    title: new HTML(),
    description: new HTML(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getContainer())
  }

  setStyles() {
    this.setStyle('background-color', '#cccccc')
    this.setStyle('font-family', 'sans-serif')
  }

  getTitleHTML() {
    const link = new nLink()
    this.children.title.append(link)
    link.href('https://www.npmjs.com/package/@brtmvdl/database')
    link.setStyle('color', '#000000')

    const h1 = new nH1()
    link.append(h1)
    h1.setText('brtmvdl / database')
    h1.setStyle('padding', '1rem')
    h1.setStyle('margin', '0rem')

    return this.children.title
  }

  getDescriptionHTML() {
    this.children.description.setText('Easy Database Node.js library')

    return this.children.description
  }

  getWhiteArea() {
    const area = new HTML()
    area.setStyle('background-color', '#ffffff')
    area.setStyle('padding', '1rem')
    return area
  }

  getHowToInstallHTML() {
    return new HTML() // 
  }

  getHowToUseHTML() {
    return new HTML() // 
  }

  getContainer() {
    this.children.container.append(this.getTitleHTML())

    const area = this.getWhiteArea()
    area.append(this.getDescriptionHTML())
    area.append(this.getHowToInstallHTML())
    area.append(this.getHowToUseHTML())
    this.children.container.append(area)

    return this.children.container
  }
}
