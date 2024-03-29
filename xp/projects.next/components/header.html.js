import { HTML, nFlex } from '@brtmvdl/frontend'

export class HeaderHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getCreateProjectButton())
    return flex
  }

  getTitle() {
    const title = new HTML()
    title.setStyle('margin', '1rem 0rem')
    title.setStyle('padding', 'calc(1rem / 2) 0rem')
    title.setText('Calc')
    return title
  }

  getCreateProjectButton() {
    const button = new HTML()
    button.setStyle('padding', 'calc(1rem / 2) 0rem')
    button.setStyle('margin', '1rem 0rem')
    button.setStyle('cursor', 'pointer')
    button.setText('create project')
    button.on('click', () => this.dispatchEvent('createproject'))
    return button
  }
}
