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
title.setText('Google Login')
app.append(title)

const link = new nLink()
link.href(GOOGLE.redirect_uri)
link.setText('Login')
app.append(link)

const btnErase = new nButton()
btnErase.setText('erase')
btnErase.on('click', () => Local.set(['google', 'access_token'], ''))
app.append(btnErase)

Array.from(location.hash.substring(1).matchAll(/([^&=]+)=([^&]+)/g))
  .map(([, key, value]) => Local.set(['google', key], value))

const access_token = new HTML()
access_token.setText(Local.get(['google', 'access_token']))
app.append(access_token)
