import { nElement } from '../js/nelement/index.js'
import { TopMenu } from '../js/libs/menu/top.js'
import { ParaVoceMenu } from '../js/libs/menu/para-voce.js'
import { URLS } from '../js/utils/constants.js'

export class Page extends nElement {
  children = {
    top_menu: new TopMenu(URLS.MONTEOSEU),
    main_menu: new ParaVoceMenu(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getTopMenu())
    this.append(this.getMainMenu())
  }

  setStyles() {
    this.setStyle('font-family', 'Arial, sans-serif')
  }

  getTopMenu() {
    return this.children.top_menu
  }

  getMainMenu() {
    return this.children.main_menu
  }
}
