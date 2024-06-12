import { HTML, nFlex } from '@brtmvdl/frontend'

export class MessageCardComponent extends HTML {
  state = { header: '', messages: [], }

  constructor(header, ...messages) {
    super()
    this.state.header = header
    this.state.messages = messages
  }

  onCreate() {
    super.onCreate()
    this.setStyle('border', 'calc(1rem / 8) solid #eeeeee')
    this.setStyle('border-radius', '1rem')
    this.append(new MessageComponent(this.state.header))
    Array.from(this.state.messages).map((message) => this.append(new MessageComponent(message)))
    const datetime = new Date()
    this.append(new MessageComponent(datetime.toISOString(), datetime.toString()))
  }
}

class MessageComponent extends HTML {
  state = {
    text: '',
    title: '', 
  }

  constructor(text, title = '') {
    super()
    this.state.text = text
    this.state.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.state.text)
    this.setAttr('title', this.state.title)
    this.setStyle('padding', '1rem')
  }
}
