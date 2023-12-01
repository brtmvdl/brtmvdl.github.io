import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    title: new HTML(),
    login_status_button: new nButton(),
    login_button: new nButton(),
  }

  onCreate() {
    this.append(this.getLoginStatusButton())
    this.append(this.getLoginButton())
  }

  getTitle() {
    this.children.title.setText('Facebook JavaScript SDK')
    return this.children.title
  }

  getLoginStatusButton() {
    this.children.login_status_button.setText('Get Login Status')
    this.children.login_status_button.on('click', () => FB.getLoginStatus((resp) => console.log('FB.getLoginStatus', { resp })))
    return this.children.login_status_button
  }

  getLoginButton() {
    this.children.login_button.setText('Login')
    this.children.login_button.on('click', () => FB.login((resp) => console.log('FB.login', { resp })))
    return this.children.login_button
  }
}
