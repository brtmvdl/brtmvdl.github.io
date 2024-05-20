import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'
import { InputTextGroupComponent } from './components/input.text.group.component.js'
import { ButtonComponent } from './components/button.component.js'

export class Page extends HTML {
  children = {
    apiKey: new InputTextGroupComponent('api key', '', 'password'),
    query: new InputTextGroupComponent('query'),
    from: new InputTextGroupComponent('from'),
    to: new InputTextGroupComponent('to'),
    sortBy: new InputTextGroupComponent('sort by'),
    results: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent('News API'))
    this.append(this.getForm())
    this.append(this.getResultsHTML())
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
    console.log({ json })
  }

  onError(err) {
    console.error(err)
  }

  getResultsHTML() {
    return this.children.results
  }
}
