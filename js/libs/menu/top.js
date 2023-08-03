import { nElement, nLink } from '../../nelement/index.js'
import * as COLORS from '../../nelement/utils/colors.js'

import { nUncontaineredLink } from '../../components/uncontainered-link.js'

import { URLS } from '../../utils/constants.js'

export class TopMenu extends nElement {
  children = {
    para_voce: new nUncontaineredLink(),
    para_empresas: new nUncontaineredLink(),
    para_desenvolvedores: new nUncontaineredLink(),
    monte_o_seu: new nUncontaineredLink(),
    sob_demanda: new nUncontaineredLink(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getParaVoceLink())
    this.append(this.getParaEmpresasLink())
    this.append(this.getParaDesenvolvedoresLink())
    this.append(this.getMonteOSeuLink())
    this.append(this.getSobDemandaLink())
  }

  setStyles() {
    this.setContainerStyle('background-color', COLORS.BLUE_4)
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('margin', '0 auto')
    this.setStyle('padding', '1rem')
    this.setStyle('width', '80rem')
  }

  createLink(chid = new nLink(), text = '', href = '') {
    chid.setStyle('margin-right', '1rem')
    chid.setText(text)
    chid.href(href)
    return chid
  }

  getParaVoceLink() {
    return this.createLink(
      this.children.para_voce,
      'Para você',
      URLS.PARAVOCE,
    )
  }

  getParaEmpresasLink() {
    return this.createLink(
      this.children.para_empresas,
      'Para Empresas',
      URLS.PARAEMPRESAS,
    )
  }

  getParaDesenvolvedoresLink() {
    return this.createLink(
      this.children.para_desenvolvedores,
      'Para Desenvolvedores',
      URLS.PARADESENVOLVEDORES,
    )
  }

  getMonteOSeuLink() {
    return this.createLink(
      this.children.monte_o_seu,
      'Monte o seu',
      URLS.MONTEOSEU,
    )
  }

  getSobDemandaLink() {
    return this.createLink(
      this.children.sob_demanda,
      'Sob Demanda',
      URLS.SOBDEMANDA,
    )
  }
}
