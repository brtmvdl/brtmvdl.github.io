import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent } from './components/top.bar.component.js'
import { FormHTML } from './components/form.html.js'
import { MessagesHTML } from './components/messages.html.js'
import { MessageModel } from './models/messages.model.js'
import * as API from './utils/api.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TopBarComponent())
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = (window.innerWidth > window.innerHeight) ? new nFlex() : new HTML()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { endpoint, method, url, query, headers, body } } = {}) {
    API.request(method, url, query, headers, body)
      .then((output) => this.addMessage(new MessageModel(endpoint, { input: { method, url, query, headers, body }, output })))
      .catch((error) => this.addMessage(new MessageModel(endpoint, { error })))
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }

  getMessagesHTML() {
    return this.children.messages
  }
}
