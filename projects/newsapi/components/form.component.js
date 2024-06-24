import { HTML } from '@brtmvdl/frontend'
import { InputComponent } from '../../../assets/js/components/input.component.js'
import { ButtonComponent } from './button.component.js'
import { padLeft } from '../../../assets/js/utils/str.js'

export class FormComponent extends HTML {
  children = {
    apiKey: new InputComponent('api key', this.getDefaultApiKey(), 'password'),
    query: new InputComponent('query', this.getDefaultQuery()),
    from: new InputComponent('from', this.getDefaultFrom()),
    to: new InputComponent('to', this.getDefaultTo()),
    sortBy: new InputComponent('sort by', this.getDefaultsortBy()),
  }

  getDefaultApiKey() {
    return ''
  }

  getDefaultQuery() {
    return 'Apple'
  }

  getDateString(offset = 0) {
    const date = new Date(Date.now() - offset)
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((d) => padLeft(d, 2, '0')).join('-')
  }

  getDefaultFrom() {
    return this.getDateString(1000 * 60 * 60 * 24 * 7) // 7 days
  }

  getDefaultTo() {
    return this.getDateString()
  }

  getDefaultsortBy() {
    return 'popularity'
  }

  onCreate() {
    super.onCreate()
    this.append(this.getForm())
  }

  getForm() {
    const form = new HTML()
    form.append(this.getApiKeyInputComponent())
    form.append(this.getQueryInputComponent())
    form.append(this.getFromInputComponent())
    form.append(this.getToInputComponent())
    form.append(this.getSortInputComponent())
    form.append(this.getSendButtonComponent())
    return form
  }

  getApiKeyInputComponent() {
    return this.children.apiKey
  }

  getQueryInputComponent() {
    return this.children.query
  }

  getFromInputComponent() {
    return this.children.from
  }

  getToInputComponent() {
    return this.children.to
  }

  getSortInputComponent() {
    return this.children.sortBy
  }

  getSendButtonComponent() {
    const button = new ButtonComponent()
    button.setText('send')
    button.on('click', () => this.onSendButtonComponentClick())
    return button
  }

  onSendButtonComponentClick() {
    const search = new URLSearchParams({
      apiKey: this.children.apiKey.getValue(),
      q: this.children.query.getValue(),
      from: this.children.from.getValue(),
      to: this.children.to.getValue(),
      sortBy: this.children.sortBy.getValue(),
    })

    const url = `https://newsapi.org/v2/everything?${search.toString()}`
    fetch(url, { mode: 'cors' }).then((res) => res.json())
      .then((json) => this.onNewsApiEverything(json))
      .catch((err) => this.onError(err))
  }

  onNewsApiEverything(json) {
    this.dispatchEvent('result', json)
  }

  onError(err) {
    this.dispatchEvent('error', err)
  }
}
