import { HTML } from '@brtmvdl/frontend'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { FormComponent } from './components/form.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'

export class Page extends PaddingComponent {
  children = {
    form: new FormComponent(),
    results: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'news rest api' }))
    this.append(this.getForm())
    this.append(this.getResultsHTML())
  }

  getForm() {
    this.children.form.on('result', ({ value }) => console.log({ value }))
    this.children.form.on('error', ({ value: error }) => console.error(error))
    return this.children.form
  }

  getResultsHTML() {
    return this.children.results
  }
}
