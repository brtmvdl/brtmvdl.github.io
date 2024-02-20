import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopComponent } from './components/top.component.js'
import { FormComponent } from './components/form.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { MessageModel } from './models/message.model.js'

export class Page extends HTML {
  children = {
    top: new TopComponent(),
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  state = {
    messages: [],
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
    this.append(this.getTopHTML())
    this.append(this.getFlex())
  }

  setEvents() {
    this.children.top.on('download', () => this.onDownload())
  }

  onDownload() {
    this.addMessage(new MessageModel('/download', { response: this.state.messages }))
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getTopHTML() {
    return this.children.top
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  getFormHTML() {
    this.children.form.on('response', ({ value: { request, response } }) => this.onFormResponse(request, response))
    this.children.form.on('error', ({ value: { request, error } }) => this.onFormError({ request, error }))
    return this.children.form
  }

  onFormResponse(request, response) {
    this.addMessage(new MessageModel(request.pathname, { request, response }))
  }

  onFormError(request, error) {
    this.addMessage(new MessageModel('/error', { request, error }))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.children.messages.dispatchEvent('message', message)
    this.state.messages.push(message)
  }
}
