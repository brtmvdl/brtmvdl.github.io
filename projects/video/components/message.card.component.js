import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'

export class MessageCardComponent extends HTML {
  state = {
    header: '',
    message: '',
    footer: '',
  }

  constructor(header, message, footer) {
    super()
    this.state.header = header
    this.state.message = message
    this.state.footer = footer
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    Array.from(['header', 'message', 'footer']).map((s) => this.append(new MessageComponent(this.state[s])))
  }

  setStyles() {
    this.setStyle('border', 'calc(1rem / 8) solid #eeeeee')
    this.setStyle('margin', '0rem 0rem 1rem 0rem')
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
