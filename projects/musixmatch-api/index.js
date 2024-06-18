import { HTML, nFlex, nButton } from '@brtmvdl/frontend'
import { ImageLinkComponent } from './components/image.link.component.js'
import { SelectComponent } from '.././../assets/js/components/select.component.js'
import { getMethodsList } from './lists.js'

export class Page extends HTML {
  children = {
    inputs: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
  }

  getHeaderComponent() {
    const flex = new nFlex()
    flex.append(this.getHeaderLeftComponent().setContainerStyle('width', '20%'))
    return flex
  }

  getHeaderLeftComponent() {
    const logo = new ImageLinkComponent('./logo.png', 'https://developer.musixmatch.com/')
    logo.setStyle('margin', '1rem')
    return logo
  }

  getBodyComponent() {
    const flex = new nFlex()
    flex.append(this.getBodyLeftComponent().setContainerStyle('width', '20%'))
    flex.append(this.getBodyRightComponent().setContainerStyle('width', '80%'))
    return flex
  }

  getBodyLeftComponent() {
    const html = new HTML()
    html.append(this.getMethodsSelect())
    html.append(this.getParametersInputs())
    html.append(this.getSendButton())
    return html
  }

  getMethodsSelect() {
    const select = new SelectComponent()
    // Array.from(getMethodsList()).map((m) => select.children.select.addOption(m, m))
    return select
  }

  getParametersInputs() {
    return this.children.inputs
  }

  getSendButton() {
    return new nButton()
  }

  getBodyRightComponent() {
    const html = new HTML()
    html.setText('body right')
    return html
  }
}
