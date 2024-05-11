import { HTML, nFlex, nInput } from '@brtmvdl/frontend'
import { LogoComponent } from './logo.component.js'
import { ButtonComponent } from './button.component.js'
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
    return new LogoComponent()
  }

  getRight() {
    const flex = new nFlex()
    flex.append(this.getForm())
    flex.append(this.getIpHTML())
    return flex
  }

  getForm() {
    this.children.form.setAttr('method', 'GET')
    this.children.form.setAttr('action', GOOGLE.auth_uri)
    this.children.form.append(this.getLoginButton())
    Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
      const input = new nInput()
      input.setAttr('type', 'hidden')
      input.setAttr('name', key)
      input.setValue(GOOGLE[key])
      this.children.form.append(input)
    })
    return this.children.form
  }

  getLoginButton() {
    const button = new ButtonComponent()
    button.setText('login')
    button.on('click', () => this.children.form.submit())
    return button
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
