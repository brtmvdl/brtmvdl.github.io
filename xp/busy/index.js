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
  state = {
    tasks: [],
    notified_at: null,
  }

  children = {
    input: new nInputText(),
    button: new nButton(),
    list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getForm())
    this.append(this.getTasksList())
    this.notifyMe('Am i doing?')
  }

  getTitle() {
    const title = new nH1()
    title.setText('Busy')
    return title
  }

  getForm() {
    const flex = new nFlex()
    flex.append(this.getInput())
    flex.append(this.getButton())
    return flex
  }

  getInput() {
    return this.children.input
  }

  getButton() {
    this.children.button.setText('save')
    this.children.button.on('click', () => {
      this.appendTask(this.children.input.getValue())
      this.updateList()
      this.clearInput()
    })
    return this.children.button
  }

  appendTask(title) {
    this.state.tasks.push({ title, datetime: Date.now() })
  }

  updateList() {
    this.children.list.clear()
    this.state.tasks.map(({ title, datetime }) => {
      const flex = new nFlex()
      flex.append(new TextHTML(title))
      flex.append(this.getDateTimeHTML(datetime))
      this.children.list.append(flex)
    })
  }

  clearInput() {
    this.children.input.setValue('')
  }

  notifyMe(text) {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((p) => {
        if (p === 'granted') {
          if (!Local.get(['notified']))
            setInterval(() => this.notifyMe(text), 1000 * 60 * 5)
          new Notification(text)
          Local.set(['notified'], Date.now())
        }
      })
    }
  }

  getDateTimeHTML(datetime = Date.now()) {
    const date = new Date(datetime)
    const text = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return new TextHTML(text)
  }

  getTasksList() {
    return this.children.list
  }
}
