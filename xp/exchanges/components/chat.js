import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormHTML } from './form.js'
import { MessagesHTML } from './messages.js'

export class ChatHTML extends HTML {
  children = {
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.children.form)
    flex.append(this.children.messages)
    this.append(flex)
  }
}