import { HTML, nFlex } from '@brtmvdl/frontend'

export class TwoColumnsComponent extends nFlex {
  getName() { return 'two-columns-component' }

  children = {
    html1: new HTML(),
    html2: new HTML(),
  }

  constructor({ html1 = new HTML(), html2 = new HTML() }={}) {
    super()
    this.children.html1 = html1
    this.children.html2 = html2
  }

  onCreate() {
    this.append(this.children.html1.setContainerStyle('width', '20%'))
    this.append(this.children.html2.setContainerStyle('width', '79%'))
  }
}
