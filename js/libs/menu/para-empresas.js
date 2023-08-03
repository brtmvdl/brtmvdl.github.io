import { nElement, nFlex, nImage, nLink } from '../../nelement/index.js'
import * as URLS from '../../utils/constants.js'

export class ParaEmpresasMenu extends nElement {
  onCreate() {
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLogo())
    flex.append(this.getSearch())
    return flex
  }

  getLogo() {
    const link = new nLink()
    link.href(URLS.PARAEMPRESAS)
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
    return this.createLink('/para-voce/cursos/', 'Cursos')
  }

  getAppsJogosLink() {
    return this.createLink('/para-voce/apps-jogos/', 'Apps')
  }

  getAtendimentoLink() {
    return this.createLink('/para-voce/atendimento/', 'Atendimento')
  }

  getSearch() {
    const image = new nImage()
    image.src('/img/magnifying-glass.svg')
    image.on('click', () => console.log('search'))
    return image
  }
}
