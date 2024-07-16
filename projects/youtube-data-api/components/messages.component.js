import { HTML } from '../../../assets/js/libs/frontend/index.js'
import * as Components from '../../../assets/js/components/messages.component.js'
import * as messages from './messages/index.js'

export class MessagesComponent extends Components.MessagesComponent {
  getMessageHTML(name, data) {
    console.log('get message html', { name, data })

    switch (name) {
      case  'Videos: list': return new messages.VideosListMessageCardComponent(data)
    }

    return new HTML()
  }
}
