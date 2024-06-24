import { HTML, nFlex } from '@brtmvdl/frontend'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'

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
    const title = new TextComponent('Calc')
    title.setStyle('margin', '1rem 0rem')
    title.setStyle('padding', 'calc(1rem / 2) 0rem')
    return title
  }

  getCreateProjectButton() {
    const button = new ButtonComponent('create project', () => this.dispatchEvent('createproject'))
    button.setStyle('padding', 'calc(1rem / 2) 0rem')
    button.setStyle('margin', '1rem 0rem')
    button.setStyle('cursor', 'pointer')
    return button
  }
}
