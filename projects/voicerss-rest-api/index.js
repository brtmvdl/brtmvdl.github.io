import { HTML, nFlex, nImage, nLink } from '@brtmvdl/frontend'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { AudioMessageComponent } from './components/audio.message.component.js'
import { MessageComponent } from './components/message.component.js'
import { SelectComponent } from './components/select.component.js'
import { InputComponent } from './components/input.component.js'
import { nButton } from './components/button.js'
import { AudioMessageModel } from './models/audio.message.model.js'
import { MessageModel } from './models/message.model.js'
import { getLanguages } from './languages.js'

export class Page extends HTML {
  children = {
    ip: new HTML(),
    src_input: new InputComponent('src', 'project ' + Date.now().toString()),
    key_input: new InputComponent('key', 'ebcb13f044794a24b8f1511008312127'),
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
    flex.append(this.getLeftHeaderHTML().setContainerStyle('width', '20%'))
    flex.append(this.getRightHeaderHTML().setContainerStyle('width', '80%'))
    return flex
  }

  getLeftHeaderHTML() {
    const html = new HTML()
    const image = new nImage()
    image.setStyle('width', 'calc(100% - 1rem)')
    image.src('./logo.png')
    image.alt('logo')
    const link = new nLink()
    link.href('https://voicerss.org/')
    link.setAttr('_new', true)
    link.append(image)
    html.append(link)
    return html.append(link)
  }

  getRightHeaderHTML() {
    return new HTML()
  }

  getBody() {
    const html = new nFlex()
    html.append(this.getForm().setContainerStyle('width', '20%'))
    html.append(this.getMessages().setContainerStyle('width', '80%'))
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
    return new nButton('send', () => this.onSendButtonClick())
  }

  onSendButtonClick() {
    this.addAudioMessage()
  }

  addAudioMessage() {
    const key = this.children.key_input.getValue()
    const src = this.children.src_input.getValue()
    const hl = this.children.language_select.getValue()
    const search = new URLSearchParams({ key, src, hl })
    const url = `http://api.voicerss.org/?${search.toString()}`
    this.addMessage(new AudioMessageModel(url, src))
  }

  addMessage(message = new MessageModel()) {
    this.children.messages.append(this.parseMessage(message))
  }

  parseMessage(message = new MessageModel()) {
    if (message.type = 'audio') {
      return new AudioMessageComponent(message)
    }

    return new TextComponent(message.type)
  }

  getMessages() {
    this.children.messages.setStyle('text-align', 'right')
    return this.children.messages
  }
}
