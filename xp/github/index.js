import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    code: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getLoginButton())
    this.append(this.getCodeHTML())
  }

  getTitleHTML() {
    const html = new HTML()
    html.setText('GitHub Oauth 2.0 Login')
    return html
  }

  getLoginButton() {
    const button = new nButton()
    button.setText('login')
    button.on('click', () => this.onButtonClick())
    return button
  }

  onButtonClick() {
    console.log('click')
  }

  getCodeHTML() {
    return this.children.code
  }
}
