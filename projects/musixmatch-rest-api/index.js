import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { ImageLinkComponent } from '../../assets/js/components/image.link.component.js'
import { EndpointsComponent } from '../../assets/js/components/endpoints.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { InputsComponent } from './components/inputs.component.js'
import { TextModel } from '../../assets/js/models/text.model.js'
import * as API from '../../assets/js/utils/api.js'

import { getRequestModelList } from './lists.js'

export class Page extends PaddingComponent {
  children = {
    form: new EndpointsComponent(getRequestModelList(), new InputsComponent()),
    messages: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    return new TwoColumnsComponent({
      html1: new ImageLinkComponent({ src: './logo.png', href: 'https://developer.musixmatch.com/' }),
      html2: new HTML(),
    })
  }

  getBody() {
    return new TwoColumnsComponent({
      html1: this.getForm(),
      html2: this.getMessages()
    })
  }

  getForm() {
    this.children.form.addEventListener('send', ({ value }) => this.onFormSend(value))
    return this.children.form
  }

  onFormSend(data) {
    console.log('on form send', { data })
    API.rest.musixmatch.v1.call(data.endpoint.method, data.endpoint.url, data.query)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  addMessage(message = new TextModel()) {
    this.children.messages.append(new TextComponent(message))
  }

  getMessages() {
    this.children.messages.setStyle('text-align', 'right')
    return this.children.messages
  }
}
