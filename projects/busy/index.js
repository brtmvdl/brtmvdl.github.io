import { HTML, nH1, nFlex } from '../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { datetime2str } from '../../assets/js/utils/str.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PaddingComponent {
  children = {
    input: new InputComponent({ placeholder: 'what am i doing?' }),
    button: new ButtonComponent({ text: 'save', onclick: () => this.onButtonClick() }),
    list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'busy' }))
    this.append(this.getForm())
    this.append(this.getTasksList())
    this.updateList()
  }

  setEvents() {
    setInterval(() => this.notifyMe(text), 1000 * 60 * 5)
  }

  getForm() {
    const flex = new nFlex()
    flex.append(this.getInput().setContainerStyle('width', '79%'))
    flex.append(this.getButton().setContainerStyle('width', '20%'))
    return flex
  }

  getInput() {
    return this.children.input
  }

  getButton() {
    this.children.button.setStyle('width', '100%')
    return this.children.button
  }

  onButtonClick() {
    this.appendTask(this.children.input.children.input.getValue())
    this.updateList()
    this.clearInput()
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
      flex.append(new TextComponent({ text: title }))
      flex.append(new TextComponent({ text: datetime2str(datetime) }))
      this.children.list.prepend(flex)
    })
  }

  clearInput() {
    this.children.input.children.input.setValue('')
  }

  notifyMe(text) {
    Notification.requestPermission().then((p) => new Notification(text))
  }

  getTasksList() {
    this.children.list.setStyle('margin', '1rem 0rem 0rem 0rem')
    return this.children.list
  }
}
