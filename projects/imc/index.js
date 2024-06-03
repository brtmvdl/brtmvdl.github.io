import { HTML } from '@brtmvdl/frontend'
import { Calc } from './calc.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new Calc())
  }
}
