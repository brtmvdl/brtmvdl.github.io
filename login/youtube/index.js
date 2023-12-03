import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    login_button: new nButton()
  }

  onCreate() {
    this.append(this.getLoginButton())
  }

  getLoginButton() {
    this.children.login_button.setText('login')

    this.children.login_button.on('click', () => console.log('login'))

    return this.children.login_button
  }
}
