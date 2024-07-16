import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'
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
    const title = new TextComponent({ text: 'calc' })
    title.setStyle('margin', '1rem 0rem')
    title.setStyle('padding', 'calc(1rem / 2) 0rem')
    return title
  }

  getCreateProjectButton() {
    const button = new ButtonComponent({ text: 'create project', onclick: () => this.dispatch('createproject') })
    button.setStyle('padding', 'calc(1rem / 2) 0rem')
    button.setStyle('margin', '1rem 0rem')
    button.setStyle('cursor', 'pointer')
    return button
  }
}
