import { HTML, nButton, nH2, nInput, nLink } from '@brtmvdl/frontend'
import { GOOGLE, API_KEY, DISCOVERY_DOC } from './googleusercontent.js'

export class Page extends HTML {
  onCreate() {
    this.append(this.getTitleLink())
    this.append(this.getLoadAuth2Button())
    this.append(this.getAuth2AuthorizeButton())
    this.append(this.getLoadClientButton())
    this.append(this.getClientInitButton())
    this.on('gapi', () => console.log('gapi'))
    this.on('gis', () => console.log('gis'))
  }

  getTitleLink() {
    const link = new nLink()
    link.href('/xp/market/')
    link.setText('Market as a project')
    return link
  }

  getLoadClientButton() {
    const button = new nButton()
    button.setText('load:client')
    button.on('click', () => gapi.load('client', { callback: () => console.log('gapi.load:client') }))
    return button
  }

  getLoadAuth2Button() {
    const button = new nButton()
    button.setText('load:auth2')
    button.on('click', () => gapi.load('auth2', { callback: () => console.log('gapi.load:auth2') }))
    return button
  }

  getClientInitButton() {
    const button = new nButton()
    button.setText('client.init')
    button.on('click', () => gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC], clientId: GOOGLE.client_id, scope: GOOGLE.scope }, console.log('client.init')))
    return button
  }

  getAuth2AuthorizeButton() {
    const button = new nButton()
    button.setText('auth2.authorize')
    button.on('click', () => gapi.auth2.authorize({ client_id: GOOGLE.client_id, scope: GOOGLE.scope, response_type: 'id_token permission' }, console.log('auth2.authorize')))
    return button
  }
}
