import { HTML, nInput } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

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

export class Page extends PaddingComponent {
  children = {
    form: new nForm(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'market' }))
    this.append(this.getForm())
    this.append(new LinkComponent({ text: 'login link', href: GOOGLE.redirect_uri }))
    this.append(new ButtonComponent({ text: 'login button', onclick: () => this.children.form.submit() }))
    this.append(new ButtonComponent({ text: 'erase button', onclick: () => Local.set(['google', 'access_token'], '') }))
    this.append(new TextComponent({ text: Local.get(['google', 'access_token']) }))
    this.saveURLSearchParams()
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

  saveURLSearchParams() {
    const url = new URL(window.location)
    Array.from(new URLSearchParams(url.hash.replace('#', '?')))
      .map(([key, value]) => Local.set(['google', key], value))
  }
}
