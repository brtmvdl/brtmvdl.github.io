import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessageModel } from './models/messages.model.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    top_bar: new TopBarComponent(),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
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

  setStyles() {
    this.setStyle('font-family', 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"')
    this.setStyle('font-stretch', '100%')
    this.setStyle('font-weight', '400')
    this.setStyle('font-size', '16px')
  }

  getMessageInstance(data) {
    const error = data.status !== 200
    const method = this.state.messages.find(({ id }) => id === data.id)?.method
    const input = error ? data.error : data.result
    const side = error ? 'error' : 'output'
    return new MessageModel(method, { input, side, output: data })
  }

  getFormHTML() {
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, pathname, query = [], body = [] } } = {}) {
    console.log('onFormHtmlSubmit', { method, pathname, query, body })
    this.getResponse({ method, pathname, query, body })
      .then(json => console.log({ json }))
      .catch(err => console.error(err))
  }

  getResponse({ method, pathname, query = [], body = [], } = {}) {
    const apiKey = this.children.form.children.apiKey.getValue()
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }

    body = body.reduce((bd, [a, b]) => ({ ...bd, [a]: b }), {})
    query = query.reduce((q, [a, b]) => ({ ...q, [a]: b }), {})

    console.log('getResponse', { method, pathname, query, headers, body, })
    return fetch(`https://api.openai.com/v1${pathname}`, { method, headers, body: JSON.stringify(body) }).then(res => res.json())
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }

}
