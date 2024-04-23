import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
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

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    return button
  }

  getGoogleLoginButton() {
    return this.createButton('google', () => this.doGoogleLogin())
  }

  doGoogleLogin() {
    console.log('do google login')
  }

}
