import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { padLeft } from '../../../assets/js/utils/str.js'

import * as API from '../../../assets/js/utils/api.js'

export class FormComponent extends HTML {
  children = {
    apiKey: new InputComponent({ label: 'api key', value: this.getDefaultApiKey(), type: 'password' }),
    query: new InputComponent({ label: 'query', value: this.getDefaultQuery() }),
    from: new InputComponent({ label: 'from', value: this.getDefaultFrom() }),
    to: new InputComponent({ label: 'to', value: this.getDefaultTo() }),
    sortBy: new InputComponent({ label: 'sort by', value: this.getDefaultsortBy() }),
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
    return new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonComponentClick() })
  }

  onSendButtonComponentClick() {
    API.rest.newsapi.v2.call('everything', {
      apiKey: this.children.apiKey.getValue(),
      q: this.children.query.getValue(),
      from: this.children.from.getValue(),
      to: this.children.to.getValue(),
      sortBy: this.children.sortBy.getValue(),
    })
      .then((json) => this.onNewsApiEverything(json))
      .catch((err) => this.onError(err))
  }

  onNewsApiEverything(json) {
    this.dispatch('result', json)
  }

  onError(err) {
    this.dispatch('error', err)
  }
}
