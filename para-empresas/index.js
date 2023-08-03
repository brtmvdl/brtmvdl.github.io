import { nElement, nLink } from '../js/nelement/index.js'
import { TopMenu } from '../js/libs/menu/top.js'
import { URLS } from '../js/utils/constants.js'
import { ParaEmpresasMenu } from '../js/libs/menu/index.js'

export class Page extends nElement {
  children = {
    top_menu: new TopMenu(URLS.PARAEMPRESAS),
    main_menu: new ParaEmpresasMenu(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getTopMenu())
    this.append(this.createLink(URLS.PARAEMPRESAS_))
    this.append(this.getMainMenu())
  }

  setStyles() {
    this.setStyle('font-family', 'Arial, sans-serif')
  }

  getTopMenu() {
    return this.children.top_menu
  }

  createLink(href = '', text = '') {
    const link = new nLink()
    link.href(href)
    link.setText(text)
    return link
  }

  getMainMenu() {
    return this.children.main_menu
  }
}
