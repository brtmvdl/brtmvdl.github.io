import { HTML, nFlex, nLink, nH1, nButton } from '../../../assets/js/libs/frontend/index.js'

export class HeaderComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLogoLink())
    flex.append(this.getButton())
    return flex
  }

  getLogoLink() {
    const link = new nLink()
    link.setStyle('color', '#000000')
    link.href('?')
    link.append(this.getTitle())
    return link
  }

  getTitle() {
    const title = new nH1()
    title.setStyle('margin', '1rem')
    title.setText('Workout')
    return title
  }

  getButton() {
    const button = new nButton()
    button.setStyle('margin', '1rem')
    button.setStyle('padding', '1rem')
    button.setText('start')
    button.addEventListener('click', () => console.log('click'))
    return button
  }
}
