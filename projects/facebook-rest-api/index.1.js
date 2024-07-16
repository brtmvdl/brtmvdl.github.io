import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { HeaderComponent } from '../../assets/js/components/header.component.js'
import { EndpointsComponent } from '../../assets/js/components/endpoints.component.js'
import { MessagesComponent } from '../../assets/js/components/messages.component.js'
import { getEndpointsList } from './lists/endpoints.list.js'
import * as messages from './components/messages/index.js'

export class Page extends HTML {
  children = {
    endpoints: new EndpointsComponent(getEndpointsList()),
    messages: new MessagesComponent(messages),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getEndpoints().setContainerStyle('width', '20%'))
    flex.append(this.getMessages().setContainerStyle('width', '79%'))
    return flex
  }

  getEndpoints() {
    return this.children.endpoints
  }

  getMessages() {
    return this.children.messages
  }
}
