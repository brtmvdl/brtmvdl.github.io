import { nElement, nFlex, nLink } from '../nelement/index.js'
import * as COLORS from '../nelement/utils/colors.js'

import { nUncontaineredLink } from '../../js/components/uncontainered-link.js'

export class TopMenu extends nElement {
  children = {
    para_voce: new nUncontaineredLink(),
    para_empresas: new nUncontaineredLink(),
    monte_o_seu: new nUncontaineredLink(),
    sob_demanda: new nUncontaineredLink(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getParaVoceLink())
    this.append(this.getParaEmpresasLink())
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

  getParaVoceLink() {
    this.children.para_voce.setText('Para você')

    this.children.para_voce.setStyle('margin-right', '1rem')

    return this.children.para_voce
  }

  getParaEmpresasLink() {
    this.children.para_empresas.setText('Para Empresas')

    this.children.para_empresas.setStyle('margin-right', '1rem')

    return this.children.para_empresas
  }

  getMonteOSeuLink() {
    this.children.monte_o_seu.setText('Monte o seu')

    this.children.monte_o_seu.setStyle('margin-right', '1rem')

    return this.children.monte_o_seu
  }

  getSobDemandaLink() {
    this.children.sob_demanda.setText('Sob Demanda')

    this.children.sob_demanda.setStyle('margin-right', '1rem')

    return this.children.sob_demanda
  }
}
