import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getLoginButton())
  }

  getTitle() {
    const title = new HTML()
    title.setText('Twitter')
    return title
  }

  getLoginButton() {
    const button = new nButton()
    button.setText('login')
    button.on('click', () => console.log('click'))
    return button
  }
}
