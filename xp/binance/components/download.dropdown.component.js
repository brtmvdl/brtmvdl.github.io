import { HTML, nFlex, nButton } from '@brtmvdl/frontend'

export class DownloadDropdownComponent extends HTML {
  children = {
    list: new HTML(),
  }

  state = {
    opened: false,
    downloads: [],
    list: [],
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
    this.append(this.getListHTML())
    this.closeList()
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getDownloadButton())
    flex.append(this.getArrowButton())
    return flex
  }

  getDownloadButton() {
    return this.createButton('download', (() => this.onDownloadButtonClick('download')), 'first')
  }

  onDownloadButtonClick() {
    this.dispatchEvent('download')
  }

  getArrowButton() {
    return this.createButton('v', (() => this.onArrowButtonClick()), 'last')
  }

  createButton(text, onclick = (() => { }), pos = 'none') {
    const button = new HTML()
    button.setText(text)
    button.on('click', () => onclick())
    button.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    button.setStyle('border-radius', [`calc(${pos == 'first' ? 1 : 0}rem / 2)`, `calc(${pos == 'last' ? 1 : 0}rem / 2)`, `calc(${pos == 'last' ? 1 : 0}rem / 2)`, `calc(${pos == 'first' ? 1 : 0}rem / 2)`].join(' '))
    button.setStyle('margin', ['0px', '0px', '0px', `${pos != 'first' ? -1 : 0}px`].join(' '))
    button.setStyle('padding', ['calc(1rem / 2)', 'calc(1rem / 1)',].join(' '))
    button.setStyle('border', '#000000 solid 1px')
    button.setStyle('box-sizing', 'border-box')
    button.setStyle('cursor', 'pointer')
    button.setStyle('color', '#000000')
    return button
  }

  onArrowButtonClick() {
    this.toogleList()
  }

  toogleList() {
    this.state.opened ? this.closeList() : this.openList()
  }

  closeList() {
    this.children.list.setStyle('display', 'none')
    this.state.opened = false
  }

  openList() {
    this.children.list.setStyle('display', 'inline-block')
    this.state.opened = true
  }

  getListHTML() {
    this.children.list.setContainerStyle('position', 'relative')
    this.children.list.setStyle('border-radius', 'calc(1rem / 4)')
    this.children.list.setStyle('margin', '1rem 0rem 0rem 0rem')
    this.children.list.setStyle('background-color', '#ffffff')
    this.children.list.setStyle('border', '#000000 solid 1px')
    this.children.list.setStyle('box-sizing', 'border-box')
    this.children.list.setStyle('position', 'absolute')
    this.children.list.setStyle('padding', '1rem')
    this.children.list.setStyle('width', '100%')
    return this.children.list
  }
}
