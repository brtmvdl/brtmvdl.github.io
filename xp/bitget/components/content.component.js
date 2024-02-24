import { HTML, nFlex } from '@brtmvdl/frontend'
import { FormComponent } from './form.component.js'
import { MessagesComponent } from './messages.component.js'

export class ContentComponent extends HTML {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormComponent())
    flex.append(this.getMessagesComponent())
    return flex
  }

  getFormComponent() {
    return this.children.form
  }

  getMessagesComponent() {
    return this.children.messages
  }
}
