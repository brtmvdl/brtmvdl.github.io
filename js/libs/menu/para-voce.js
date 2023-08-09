import { nElement, nFlex, nImage, nLink } from '../../nelement/index.js'
import { URLS } from '../../utils/constants.js'

export class ParaVoceMenu extends nElement {
  onCreate() {
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLogo())
    flex.append(this.getCursosLink())
    flex.append(this.getAppsJogosLink())
    flex.append(this.getAtendimentoLink())
    flex.append(this.getSearch())
    return flex
  }

  getLogo() {
    const link = new nLink()
    link.href(URLS.PARAVOCE)
    const image = new nImage()
    image.src('/img/logo.png')
    image.setStyle('', '')
    return link.append(image)
  }

  createLink(href = '/', text = '') {
    const link = new nLink()
    link.setText(text)
    link.href(href)
    link.setContainerStyle('padding', '1rem')
    return link
  }

  getCursosLink() {
    return this.createLink(URLS.PARAVOCE_CURSOS, 'Cursos')
  }

  getAppsJogosLink() {
    return this.createLink(URLS.PARAVOCE_APPS, 'Apps')
  }

  getAtendimentoLink() {
    return this.createLink(URLS.PARAVOCE_ATENDIMENTO, 'Atendimento')
  }

  getSearch() {
    const image = new nImage()
    image.src('/img/magnifying-glass.svg')
    // image.on('click', () => console.log('search'))
    return image
  }
}