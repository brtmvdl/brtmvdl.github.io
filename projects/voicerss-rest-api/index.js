import { HTML } from '@brtmvdl/frontend'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { AudioMessageComponent } from './components/audio.message.component.js'
// import { MessageComponent } from './components/message.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { SelectComponent } from '../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { ImageComponent } from '../../assets/js/components/image.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { AudioMessageModel } from './models/audio.message.model.js'
import { MessageModel } from './models/message.model.js'
import { getLanguages } from './languages.js'

export class Page extends HTML {
  children = {
    ip: new HTML(),
    src_input: new InputComponent({ label: 'src', value: 'project ' + Date.now().toString() }),
    key_input: new InputComponent({ label: 'key', value: 'ebcb13f044794a24b8f1511008312127', type: 'password' }),
    language_select: new SelectComponent({ label: 'languages' }),
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new TwoColumnsComponent({ html1: this.getLeftHeaderHTML(), html2: this.getRightHeaderHTML() })
  }

  getLeftHeaderHTML() {
    const html = new HTML()
    const image = new ImageComponent({ src: './logo.png', alt: 'logo' })
    image.setStyle('width', 'calc(100% - 1rem)')
    const link = new LinkComponent({ href: 'https://voicerss.org/' })
    link.setAttr('_new', true)
    link.append(image)
    html.append(link)
    return html.append(link)
  }

  getRightHeaderHTML() {
    return new HTML()
  }

  getBody() {
    return new TwoColumnsComponent({ html1: this.getForm(), html2: this.getMessages() })
  }

  getForm() {
    const form = new HTML()
    form.append(this.getParametersForm())
    form.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
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
    return this.children.key_input
  }

  getLanguageSelect() {
    Array.from(getLanguages()).map((l) => this.children.language_select.children.input.addOption(l, l))
    return this.children.language_select
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

    return new TextComponent({ text: message.type })
  }

  getMessages() {
    this.children.messages.setStyle('text-align', 'right')
    return this.children.messages
  }
}
