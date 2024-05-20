import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'
import { FormComponent } from './components/form.component.js'

export class Page extends HTML {
  children = {
    form: new FormComponent(),
    results: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent('News API'))
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
