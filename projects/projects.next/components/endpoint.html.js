import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/frontend/index.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'

export class EndpointHTML extends HTML {

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getUrlInput())
    flex.append(this.getHoursInput())
    flex.append(this.getDeleteButton())
    return flex
  }

  getUrlInput() {
    const input = new nInput()
    input.setPlaceholder('/home')
    return input
  }

  getHoursInput() {
    const input = new nInput()
    input.setAttr('type', 'number')
    input.setPlaceholder(8)
    return input
  }

  getDeleteButton() {
    return new ButtonComponent({ text: 'delete', onclick: () => console.log('delete') })
  }
}
