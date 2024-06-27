import { HTML } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'

export class EndpointsComponent extends HTML {
  state = {
    endpoints: [],
  }

  constructor(endpoints = []) {
    super()
    this.state.endpoints = endpoints

    console.log({ endpoint: endpoints[0]?.name })
  }

  getName() { return 'endpoints-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getEndpointsSelect())
    this.append(this.getInputsHTML())
    this.append(this.getSendButton())
  }

  getEndpointsSelect() {
    const select = new SelectComponent({})
    Array.from(this.state.endpoints).map(({ name }) => select.addOption(name, name))
    return select
  }

  getInputsHTML() {
    return new HTML()
  }

  getSendButton() {
    return new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() })
  }

  onSendButtonClick() {
    console.log('on Send Button Click')
  }
}
