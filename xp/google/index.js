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

const app = HTML.fromId('app')

const title = new nH1()
title.setText('Google OAuth 2.0 Login')
app.append(title)

const form = new nForm()
form.setAttr('method', 'GET')
form.setAttr('action', GOOGLE.auth_uri)
app.append(form)

Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
  const input = new nInput()
  input.setAttr('type', 'hidden')
  input.setAttr('name', key)
  input.setValue(GOOGLE[key])
  form.append(input)
})

const link = new nLink()
link.href(GOOGLE.redirect_uri)
link.setText('Google OAuth 2.0 Login')
app.append(link)

const btnLogin = new nButton()
btnLogin.setText('login')
btnLogin.on('click', () => form.submit())
app.append(btnLogin)

const btnErase = new nButton()
btnErase.setText('erase')
btnErase.on('click', () => Local.set(['google', 'access_token'], ''))
app.append(btnErase)

Array.from(location.hash.substring(1).matchAll(/([^&=]+)=([^&]+)/g))
  .map(([, key, value]) => Local.set(['google', key], value))

const access_token = new HTML()
access_token.setText(Local.get(['google', 'access_token']))
app.append(access_token)

