import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class HeaderComponent extends HTML {
  state = {
    title: '',
  }

  constructor(title = '') {
    super()
    this.state.title = title
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
  }

  getTitleHTML() {
    const html = new HTML()
    html.setText(this.state.title)
    html.setStyle('padding', '1rem')
    html.setStyle('font-size', '2rem')
    return html
  }
}
