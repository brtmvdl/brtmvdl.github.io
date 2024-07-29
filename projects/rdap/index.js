import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { FormComponent } from './components/form.component.js'
import { MessageModel } from './models/message.model.js'
import * as str from '../../assets/js/utils/str.js'

class RdapMessageModel extends MessageModel {
  TYPE = 'NONE'
}

class RdapResponseMessageModel extends RdapMessageModel {
  TYPE = 'SUCCESS'

  json = {}

  constructor(json = {}) {
    super()
    this.json = json
  }

  toJSON() {
    console.log('json', this.json)
    return this.json
  }
}

class RdapErrorResponseMessageModel extends RdapMessageModel {
  TYPE = 'ERROR'

  error = new Error('RDAP error')

  constructor(err = new Error()) {
    super()
    this.error = err
  }

  toJSON() {
    return { message: this.error.message }
  }
}

class ResponseComponent extends HTML {
  model = new RdapMessageModel()

  constructor(model = new RdapMessageModel()) {
    super()
    this.model = model
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  getHeader() {
    return new HTML()
  }

  getBody() {
    return new HTML()
  }

  getFooter(datetime = Date.now()) {
    return new TextComponent({ text: datetime, title: str.datetime2str(datetime) })
  }
}

class RdapResponseComponent extends ResponseComponent {
  onCreate() {
    super.onCreate()
    this.setText(this.model)
  }
}

class RdapErrorResponseComponent extends ResponseComponent {
  onCreate() {
    super.onCreate()
    this.setText(this.model)
  }
}

export class Page extends PaddingComponent {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new LinkComponent({ text: 'RDAP', href: '?' })
  }

  getBody() {
    return new TwoColumnsComponent({
      html1: this.getForm(),
      html2: this.getMessages(),
    })
  }

  getForm() {
    this.children.form.addEventListener('submit', ({ value }) => this.onFormSubmit(value))
    return this.children.form
  }

  onFormSubmit({ tld } = {}) {
    console.log('on form submit', tld)

    fetch(`https://rdap.org/domain/${tld}`).then((res) => res.json())
      .then((json) => this.addMessage(new RdapResponseMessageModel(json)))
      .catch((err) => this.addMessage(new RdapErrorResponseMessageModel(err)))
  }

  addMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessage(message))
  }

  parseMessage(message = new RdapMessageModel()) {
    switch (message.TYPE) {
      case 'SUCCESS': return new RdapResponseComponent(message)
      case 'ERROR': return new RdapErrorResponseComponent(message)
    }

    return new TextComponent({ text: JSON.stringify(message) })
  }

  getMessages() {
    this.children.messages.setStyle('text-align', 'right')
    return this.children.messages
  }
}
