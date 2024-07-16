import { HTML } from '../../assets/js/libs/frontend/index.js'

import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { EndpointsComponent } from '../../assets/js/components/endpoints.component.js'
import { TopComponent } from '../../assets/js/components/top.component.js'
import { MessagesComponent } from './components/messages.component.js'
import inputs from './components/inputs/index.js'

import { SuccessMessageModel } from '../../assets/js/models/success.message.model.js'
import { ErrorResponseModel } from '../../assets/js/models/error.response.model.js'
import { ErrorMessageModel } from '../../assets/js/models/error.message.model.js'
import { ResponseModel } from '../../assets/js/models/response.model.js'
import { EndpointModel } from '../../assets/js/models/endpoint.model.js'
import { MessageModel } from '../../assets/js/models/message.model.js'
import { RequestModel } from '../../assets/js/models/request.model.js'

import { getEndpointsList } from './utils/lists.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    top_bar: new TopComponent('https://developers.google.com/youtube/v3/docs'),
    form: new EndpointsComponent(getEndpointsList(), inputs),
    messages: new MessagesComponent(),
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
    return new TwoColumnsComponent({ html1: this.getFormHTML(), html2: this.getMessagesComponent(), })
  }

  getFormHTML() {
    this.children.form.addEventListener('send', (data) => this.onFormSend(data))
    return this.children.form
  }

  onFormSend({ value: { endpoint = new EndpointModel(), query: queryParams } } = {}) {
    const url = new URL(endpoint.url)
    Object.keys(queryParams).map((q) => url.searchParams.set(q, queryParams[q]))
    this.sendRequest(new RequestModel(endpoint.name, endpoint.method, url.toString(), [], queryParams))
  }

  sendRequest(request = new RequestModel()) {
    fetch(request.getUrl(), { headers: request.headers, body: request.body, method: request.method })
      .then((json) => this.addMessage(new SuccessMessageModel(request, new ResponseModel(json))))
      .catch((err) => this.addMessage(new ErrorMessageModel(request, new ErrorResponseModel(err))))
  }

  getMessagesComponent() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatch('message', message)
  }
}
