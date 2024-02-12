import { HTML, nH1, nInputText, nButton, nFlex } from '@brtmvdl/frontend'
import * as Local from '../../assets/js/utils/local.js'

class TextHTML extends HTML {
  text = null

  constructor(text = '') {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
  }
}

export class Page extends HTML {
  children = {
    input: new nInputText(),
    button: new nButton(),
    list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getTitle())
    this.append(this.getForm())
    this.append(this.getTasksList())
    this.notifyMe('Am i doing?')
    this.updateList()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    setInterval(() => this.notifyMe(text), 1000 * 60 * 5)
  }

  getTitle() {
    const title = new nH1()
    title.setStyle('margin', '0rem')
    title.setText('Busy')
    return title
  }

  getForm() {
    const flex = new nFlex()
    flex.setStyle('margin', '1rem 0rem 0rem 0rem')
    flex.append(this.getInput().setContainerStyle('width', '80%'))
    flex.append(this.getButton().setContainerStyle('width', '20%'))
    return flex
  }

  getInput() {
    this.children.input.setStyle('width', '100%')
    return this.children.input
  }

  getButton() {
    this.children.button.setStyle('width', '100%')
    this.children.button.setText('save')
    this.children.button.on('click', () => {
      this.appendTask(this.children.input.getValue())
      this.updateList()
      this.clearInput()
    })
    return this.children.button
  }

  appendTask(title) {
    if (title) {
      Local.add(['tasks'], { title, datetime: Date.now() })
    }
  }

  updateList() {
    this.children.list.clear()
    Local.get(['tasks'], []).map(({ title, datetime }) => {
      const flex = new nFlex()
      flex.append(new TextHTML(title))
      flex.append(this.getDateTimeHTML(datetime))
      this.children.list.prepend(flex)
    })
  }

  clearInput() {
    this.children.input.setValue('')
  }

  notifyMe(text) {
    Notification.requestPermission().then((p) => new Notification(text))
  }

  getDateTimeHTML(datetime = Date.now()) {
    const date = new Date(datetime)
    const text = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return new TextHTML(text)
  }

  getTasksList() {
    this.children.list.setStyle('margin', '1rem 0rem 0rem 0rem')
    return this.children.list
  }
}
