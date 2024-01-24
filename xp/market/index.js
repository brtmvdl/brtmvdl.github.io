import { HTML, nButton, nH1, nInput, nLink } from '@brtmvdl/frontend'
import { GOOGLE } from './googleusercontent.js'

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
    this.append(this.getForm())
    this.append(this.getTitleLink())
    this.append(this.getLoginButton())
    this.append(this.getEraseButton())
    this.append(this.getAccessTokenHTML())
    this.append(this.getSpreadsheetsValuesGetButton())
    this.saveSessionInfo()
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

  getTitleLink() {
    const link = new nLink()
    link.href(GOOGLE.redirect_uri)
    link.setText('Market as a project')
    return link
  }

  getLoginButton() {
    const button = new nButton()
    button.setText('login')
    button.on('click', () => this.children.form.submit())
    return button
  }

  deleteAccessToken() {
    Local.set(['google', 'access_token'], '')
  }

  getEraseButton() {
    const button = new nButton()
    button.setText('erase')
    button.on('click', () => this.deleteAccessToken())
    return button
  }

  getAccessTokenHTML() {
    const access_token = new HTML()
    access_token.setText(Local.get(['google', 'access_token']))
    return access_token
  }

  saveSessionInfo() {
    Array.from(location.hash.substring(1).matchAll(/([^&=]+)=([^&]+)/g))
      .map(([, key, value]) => Local.set(['google', key], value))
  }

  getSpreadsheetsValuesGetButton() {
    const button = new nButton()
    button.setText('spreadsheets.values.get')
    button.on('click', () => console.log('spreadsheets.values.get'))
    return button
  }
}
