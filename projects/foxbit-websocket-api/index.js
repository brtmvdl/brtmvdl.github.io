import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { MessagesComponent } from './components/messages.component.js'
import { HeaderComponent } from './components/header-component.js'
import { FormComponent } from './components/form.component.js'

export class Page extends HTML {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent({ link: 'https://docs.foxbit.com.br/ws/v2/' }))
    this.append(this.getContent())
  }

  getContent() {
    const flex = new nFlex()
    flex.append(this.getForm())
    flex.append(this.getMessages())
    return flex
  }

  getForm() {
    return this.children.form
  }

  getMessages() {
    return this.children.messages
  }
}
