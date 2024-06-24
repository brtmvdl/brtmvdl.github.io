import { HTML, nFlex, nInput } from '@brtmvdl/frontend'
import { FormComponent } from './form.component.js'

import { GOOGLE } from './../../../assets/js/utils/googleusercontent.js'

export class TopBarComponent extends HTML {
  children = {
    ip: new HTML(),
    login: new HTML(),
    form: new FormComponent(),
  }

  getName() { return 'top-bar-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getFlex())
    this.getIP()
  }

  setStyles() {
    this.setStyle('padding', '1rem 1rem 0rem 1rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    return new HTML()
  }

  getRight() {
    const flex = new nFlex()
    flex.append(this.getIpHTML())
    return flex
  }

  getIpHTML() {
    this.children.ip.setStyle('padding', 'calc(1rem / 1) calc(1rem / 2)')
    return this.children.ip
  }

  getIP() {
    fetch('https://api.ipify.org?format=json').then(res => res.json())
      .then(({ ip } = {}) => this.children.ip.setText(`IP: ${ip}`))
      .catch((err) => console.error(err))
  }
}
