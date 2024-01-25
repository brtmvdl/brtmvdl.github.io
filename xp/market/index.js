import { HTML, nButton, nH2, nInput, nLink } from '@brtmvdl/frontend'
import { GOOGLE } from './googleusercontent.js'
import * as api from '../../assets/js/utils/api.js'
import * as Local from '../../assets/js/utils/local.js'

// const API_KEY = "AIzaSyA5cMo5yL-zZyayWVF6ouxPodWDXV8UobY"

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
    this.setEvents()
    this.append(this.getForm())
    this.append(this.getTitleLink())
    this.append(this.getLoginButton())
    this.append(this.getEraseButton())
    this.append(this.getAccessTokenHTML())
    this.append(this.getFilesListButton())
    this.saveSessionInfo()
  }

  setEvents() {
    this.on('gapi.loaded', () => console.log('gapi.loaded'))
    this.on('gis.loaded', () => console.log('gis.loaded'))
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
    link.href('/xp/market/')
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

  getFilesListButton() {
    const button = new nButton()
    button.setText('List files in Google Drive API')
    button.on('click', () => console.log('get files list button'))
    return button
  }
}
