import { nElement, nFlex, nImage, nLink } from '../nelement/index.js'

export class ParaVoceMenu extends nElement {
  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('', '')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLogo())
    flex.append(this.getCursosLink())
    flex.append(this.getAppsJogosLink())
    flex.append(this.getMusicaLink())
    return flex
  }

  getLogo() {
    const link = new nLink()
    link.href('/para-voce/')
    const image = new nImage()
    image.src('/img/logo.png')
    return link.append(image)
  }

  createLink(href = '/', text = '') {
    const link = new nLink()
    link.href(href)
    link.setText(text)
    return link
  }

  getCursosLink() {
    return this.createLink('/para-voce/cursos/')
  }

  getAppsJogosLink() {
    return this.createLink('/para-voce/apps-jogos/')
  }

  getMusicaLink() {
    return this.createLink('/para-voce/musica/')
  }
}
