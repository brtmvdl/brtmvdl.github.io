import { HTML, nInput, nButton } from '@brtmvdl/frontend'
import { FormComponent } from '../../assets/js/components/form.component.js'
import * as GOOGLE from '../../assets/js/utils/googleusercontent.js'

export class Page extends HTML {
  children = {
    google_form: new FormComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
    this.append(this.getGoogleForm())
  }

  getTitle() {
    const html = new HTML()
    html.setText('login')
    return html
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getGoogleLoginButton())
    return html
  }

  getGoogleLoginButton() {
    return this.createButton('google login', () => this.children.google_form.submit())
  }

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    return button
  }

  getGoogleForm() {
    this.children.google_form.setAttr('method', 'GET')
    this.children.google_form.setAttr('action', GOOGLE.auth_uri)

    Object.keys(GOOGLE).filter((key) => (typeof GOOGLE[key]) === 'string').map((key) => {
      const input = new nInput()
      input.setAttr('type', 'hidden')
      input.setAttr('name', key)
      input.setValue(GOOGLE[key])
      this.children.google_form.append(input)
    })

    return this.children.google_form
  }

}
