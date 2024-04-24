import { HTML, nButton, nH1, nInput, nLink } from '@brtmvdl/frontend'
import { GOOGLE } from './../../assets/js/utils/googleusercontent.js'
import * as Local from '../../assets/js/utils/local.js'

class nForm extends HTML {
  getName() { return 'form' }

  getTagName() { return 'form' }

  submit() {
    this.element.submit()
    return this
  }
}

export class Page extends HTML {
  children = {
    form: new nForm(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getForm())
    this.append(this.getLink())
    this.append(this.getLoginButton())
    this.append(this.getEraseButton())
    this.append(this.getAccessTokenHTML())
    this.saveURLSearchParams()
  }

  getTitleHTML() {
    const link = new nLink()
    const h1 = new nH1()
    h1.setText('Market')
    link.append(h1)
    return link
  }

  getForm() {
    this.children.form.setAttr('method', 'GET')
    this.children.form.setAttr('action', GOOGLE.auth_uri)
    Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
      const input = new nInput()
      input.setAttr('type', 'hidden')
      input.setAttr('name', key)
      input.setValue(GOOGLE[key])
      this.children.form.append(input)
    })
    return this.children.form
  }

  getLink() {
    const link = new nLink()
    link.href(GOOGLE.redirect_uri)
    link.setText('login link')
    return link
  }

  getLoginButton() {
    const button = new nButton()
    button.setText('login button')
    button.on('click', () => this.children.form.submit())
    return button
  }

  getEraseButton() {
    const button = new nButton()
    button.setText('erase button')
    button.on('click', () => Local.set(['google', 'access_token'], ''))
    return button
  }

  getAccessTokenHTML() {
    const html = new HTML()
    html.setText(Local.get(['google', 'access_token']))
    return html
  }

  saveURLSearchParams() {
    const url = new URL(window.location)
    Array.from(new URLSearchParams(url.hash.replace('#', '?')))
      .map(([key, value]) => Local.set(['google', key], value))
  }
}
