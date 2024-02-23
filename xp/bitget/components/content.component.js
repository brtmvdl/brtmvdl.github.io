import { HTML, nFlex } from '@brtmvdl/frontend'

export class ContentComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    const left = new HTML()
    left.setText('left')
    return left
  }

  getRight() {
    const right = new HTML()
    right.setText('right')
    return right
  }
}
