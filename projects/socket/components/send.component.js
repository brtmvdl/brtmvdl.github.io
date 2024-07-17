import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

export class SendComponent extends HTML {
  children = {
    text: new nInput(),
    send: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    return new TwoColumnsComponent({
      html1: this.getTextInput(),
      html2: this.getSendButton(),
      widths: ['78%', '20%'],
    })
  }

  getTextInput() {
    this.children.text.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.text.setStyle('padding', 'calc(1rem / 4)')
    this.children.text.setStyle('width', '100%')
    this.children.text.setPlaceholder('text')
    return this.children.text
  }

  getSendButton() {
    this.children.send.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.children.send.setStyle('padding', 'calc(1rem / 4)')
    this.children.send.setStyle('width', '100%')
    this.children.send.setText('send')
    this.children.send.addEventListener('click', () => this.onSendButtonClick())
    return this.children.send
  }

  onSendButtonClick() {
    this.dispatch('send', this.children.text.getValue())
  }
}
