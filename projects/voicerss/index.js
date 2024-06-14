import { HTML, nFlex, nImage, nLink, nButton, nSelect } from '@brtmvdl/frontend'
import { AudioMessageComponent } from './components/audio.message.component.js'
import { MessageComponent } from './components/message.component.js'
import { SelectComponent } from './components/select.component.js'
import { InputComponent } from './components/input.component.js'
import { AudioMessageModel } from './models/audio.message.model.js'
import { MessageModel } from './models/message.model.js'
import { createButton } from './functions.js'
import { getLanguages } from './languages.js'

import { TextComponent } from '../../assets/js/components/text.component.js'

export class Page extends HTML {
  children = {
    ip: new HTML(),
    src_input: new InputComponent('src', 'projects'),
    key_input: new InputComponent('key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    language_select: new SelectComponent('languages'),
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    const flex = new nFlex()
    flex.append(this.getLogoLink().setContainerStyle('width', '20%'))
    flex.append(this.getIpHTML().setContainerStyle('width', '80%'))
    return flex
  }

  getLogoLink() {
    const link = new nLink()
    link.href('https://voicerss.org/')
    link.setAttr('_new', true)
    const image = new nImage()
    image.setStyle('width', 'calc(100% - 1rem)')
    image.src('./logo.png')
    image.alt('logo')
    link.append(image)
    return link
  }

  getIpHTML() {
    const html = new nFlex()
    html.append(this.getDownloadButton())
    html.append(this.getIpText())
    return html
  }

  getDownloadButton() {
    return createButton('download')
  }

  getIpText() {
    return new HTML()
  }

  getBody() {
    const html = new nFlex()
    html.append(this.getForm())
    html.append(this.getMessages())
    return html
  }

  getForm() {
    const form = new HTML()
    form.append(this.getParametersForm())
    form.append(this.getSendButton())
    return form
  }

  getParametersForm() {
    const form = new HTML()
    form.append(this.getSrcInput())
    form.append(this.getKeyInput())
    form.append(this.getLanguageSelect())
    return form
  }

  getSrcInput() {
    return this.children.src_input
  }

  getKeyInput() {
    this.children.key_input.children.input.setAttr('type', 'password')
    return this.children.key_input
  }

  getLanguageSelect() {
    Array.from(getLanguages()).map((l) => this.children.language_select.children.select.addOption(l, l))
    return this.children.language_select
  }

  getSendButton() {
    return createButton('send', () => this.onSendButtonClick())
  }

  onSendButtonClick() {
    const key = this.children.key_input.getValue()
    const src = this.children.src_input.getValue()
    const hl = this.children.language_select.getValue()
    const search = new URLSearchParams({ key, src, hl })
    const url = `http://api.voicerss.org/?${search.toString()}`

    this.addMessage(new AudioMessageModel(url))
  }

  addMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessage(message))
  }

  parseMessage(message = new MessageModel()) {
    switch (message.type) {
      case null: return new MessageComponent(message)
      case 'audio': return new AudioMessageComponent(message)
    }

    return new TextComponent(message.type)
  }

  getMessages() {
    return this.children.messages
  }
}
