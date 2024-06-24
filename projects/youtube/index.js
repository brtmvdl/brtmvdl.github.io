import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopComponent } from '../../assets/js/components/top.component.js'
import { FormHTML } from './components/form.component.js'
import { MessagesHTML } from './components/messages.html.js'
import { MessageModel } from './models/messages.model.js'
import * as API from './utils/api.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    top_bar: new TopComponent('https://developers.google.com/youtube/v3/docs'),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTopBar())
    this.append(this.getFlex())
  }

  getTopBar() {
    return this.children.top_bar
  }

  getFlex() {
    const flex = (window.innerWidth > window.innerHeight) ? new nFlex() : new HTML()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { request, query, body, headers } } = {}) {
    console.log({ request, query, body, headers })
    const message = new MessageModel(request, { query, body, headers })
    this.sendMessage(message)
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    API.sendMessage(message)
      .then((json) => console.log(json))
      .catch((err) => console.error(err))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
