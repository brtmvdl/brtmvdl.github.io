import { HTML, nFlex, nLink } from '@brtmvdl/frontend'
import * as COLORS from '../colors.js'
import { links } from '../constants.js'

class nModal extends HTML {
  state = {
    open: false,
    title: '',
  }

  onCreate() {
    this.setContainerStyle('background-color', COLORS.BLACK_1)
    this.setContainerStyle('color', COLORS.WHITE_1)
    this.setContainerStyle('position', 'fixed')
    this.setContainerStyle('height', '100vh')
    this.setContainerStyle('width', '100vw')
    this.setContainerStyle('z-index', '100')
    this.setContainerStyle('top', '-100%')
  }

  open() {
    this.setContainerStyle('top', '-0%')
    this.state.open = true

    return this
  }

  close() {
    this.setContainerStyle('top', '-100%')
    this.state.open = false

    return this
  }

  toggle() {
    this.state.open ? this.close() : this.open()

    return this
  }

  getHeader(text = 'nModal') {
    const flex = new nFlex()

    const title = new HTML()
    title.setText(text)
    flex.append(title)

    const closeButton = new HTML()
    closeButton.setText('x')
    closeButton.on('click', () => this.close())
    flex.append(closeButton)

    return flex
  }

  getContent() {
    return new HTML()
  }

  getFooter() {
    return new HTML()
  }
}

class nMenu extends nModal {
  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getContent())
    this.append(this.getFooter())
  }

  getContent() {
    const content = new HTML()

    links.map(({ text, href }) => {
      const link = new nLink()
      link.setStyle('color', 'inherit')
      link.setText(text)
      link.href(href)
      content.append(link)
    })

    return content
  }
}

class nSearch extends nModal {
  onCreate() {
    super.onCreate()
  }
}

export class TopBar extends HTML {
  children = {
    title: new nLink(),
    menu: new nMenu(),
    search: new nSearch(),
  }

  state = {
    text: '',
    href: '',
  }

  constructor({ text = 'exchanges', href = '/' } = {}) {
    super()

    this.state.text = text
    this.state.href = href
  }

  onCreate() {
    this.setContainerStyle('margin-bottom', '1rem')
    this.setStyle('background-color', COLORS.BLACK_1)
    this.append(this.getFlex())
    this.append(this.getMenu())
    this.append(this.getSearch())
  }

  createButton(name, ev = (() => { })) {
    const html = new HTML()
    html.setText(name)
    html.setContainerStyle('padding', '1rem')
    html.on('click', () => ev({}))
    return html
  }

  getMenuButton() {
    return this.createButton('menu', () => this.children.menu.toggle())
  }

  getTitle() {
    this.children.title.setStyle('color', COLORS.WHITE_1)
    this.children.title.setStyle('text-align', 'center')
    this.children.title.setContainerStyle('padding', '1rem')

    this.children.title.setText(this.state.text)
    this.children.title.href(this.state.href)

    return this.children.title
  }

  getSearchButton() {
    return this.createButton('search', () => this.children.search.toggle())
  }

  getFlex() {
    const flex = new nFlex()
    flex.setStyle('color', COLORS.WHITE_1)
    flex.append(this.getMenuButton())
    flex.append(this.getTitle())
    flex.append(this.getSearchButton())
    return flex
  }

  getMenu() {
    return this.children.menu
  }

  getSearch() {
    return this.children.search
  }
}
