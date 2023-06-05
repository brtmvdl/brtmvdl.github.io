
export class nElement {
  container = document.createElement('div')
  element = document.createElement('div')

  options = {
    element: {
      tagName: 'div',
    },
    container: {
      tagName: 'div',
      append: true,
    },
    component: {
      name: 'component',
    }
  }

  constructor(options) {
    this.options = {
      ...this.options,
      ...options,
    }

    this.build()
  }

  build() {
    if (this.options.element.tagName) {
      this.element = document.createElement(this.options.element.tagName)
    }

    if (this.options.container.tagName) {
      this.container = document.createElement(this.options.container.tagName)
    }

    if (this.options.component.name) {
      this.element.classList.add(`el-${this.options.component.name}`)
      this.container.classList.add(`ct-${this.options.component.name}`)
    }

    this.setStyle('margin', '0')
    this.setStyle('padding', '0')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  static fromElement(el = document.createElement('')) {
    const component = new nElement()
    component.element = el
    return component
  }

  static fromId(id) {
    return nElement.fromElement(document.getElementById(id))
  }

  addContainerClass(value) {
    this.container.classList.add(value)
    return this
  }

  addClass(value) {
    this.element.classList.add(value)
    return this
  }

  removeClass(value) {
    this.element.classList.remove(value)
    return this
  }

  toggleClass(value) {
    if (this.element.classList.contains(value)) {
      this.removeClass(value)
    } else {
      this.addClass(value)
    }

    return this
  }

  setId(value = '') {
    this.element.id = value

    return this
  }

  setContainerStyle(name, value) {
    this.container.style[name] = value
    return this
  }

  getContainerStyle(name) {
    return this.container.style[name]
  }

  setStyle(name, value) {
    this.element.style[name] = value
    return this
  }

  getStyle(name) {
    return this.element.style[name]
  }

  setAttr(name, value) {
    this.element.setAttribute(name, value)
    return this
  }

  getAttr(name) {
    return this.element.getAttribute(name)
  }

  setText(value) {
    this.element.innerText = value
    return this
  }

  getText() {
    return this.element.innerText
  }

  on(name, value) {
    this.element.addEventListener(name, value.bind(this))
    return this
  }

  once(name, value) {
    this.element.addEventListener(name, value.bind(this), { once: true })
    return this
  }

  setData(name, value) {
    this.element.dataset[name] = value
    return this
  }

  getData(name) {
    return this.element.dataset[name]
  }

  clear() {
    while (this.element.children.length > 0) {
      this.element.children.item(0).remove()
    }

    return this
  }

  addData(key, value = '') {
    this.element.dataset[key] = value

    return this
  }

  append(el = new nElement()) {
    this.element.append(el.render())
    return this
  }

  render() {
    if (this.options.container.append) {
      this.container.append(this.element)
      return this.container
    } else {
      return this.element
    }
  }
}

export class nH1 extends nElement {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.setStyle('font-weight', 'bold')
    this.setStyle('font-size', '3em')
  }
}

export class nH2 extends nElement {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.setStyle('font-weight', 'bold')
    this.setStyle('font-size', '2em')
  }
}

export class nText extends nElement {
  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'text' },
    })
  }
}

export class nPre extends nElement {
  constructor() {
    super({
      element: { tagName: 'pre' },
      component: { name: 'pre' },
    })
  }
}

export class nNumber extends nElement {
  num = 0

  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'number' },
    })

    this.setNumber(this.num)
  }

  setText() {
    throw new Error('Can not do this.')
  }

  setNumber(num) {
    this.num = num
    super.setText(this.num)
    return this
  }

  add(num = 1) {
    this.num += num
    super.setText(this.num)
    return this
  }

  sub(num = 1) {
    this.num -= num
    super.setText(this.num)
    return this
  }
}

export class nButton extends nElement {
  constructor() {
    super({
      element: { tagName: 'button' },
      component: { name: 'button' },
    })

    this.setStyle('border', 'none')
    this.setStyle('font', 'inherit')
    this.setStyle('outline', 'none')
    this.setStyle('padding', '1em')
    this.setStyle('cursor', 'pointer')
    this.setStyle('font-weight', 'bold')
  }
}

export class nLink extends nElement {
  constructor() {
    super({
      element: { tagName: 'a' },
      component: { name: 'link' },
    })

    this.setStyle('text-decoration', 'none')
    this.setStyle('color', 'inherit')
  }

  href(href) {
    this.setAttr('href', href)
    return this
  }
}

export class nFlex extends nElement {
  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.setStyle('display', 'flex')
    this.setStyle('justify-content', 'space-between')
  }

  // flex-wrap: wrap;

  flexWrap(wrap = 'wrap') {
    this.setStyle('flex-wrap', wrap)

    return this
  }
}

export class nLabel extends nElement {
  constructor() {
    super({
      component: { name: 'label' },
    })

    this.setStyle('margin-bottom', '0.5em')
    this.setStyle('padding-top', '0.5em')
    this.setStyle('padding-botton', '0.5em')
  }
}

export class Valuable extends nElement {
  maxlength = undefined

  setMaxLength(value) {
    this.element.maxlength = this.maxlength = value
    return this
  }

  setName(value) {
    this.element.name = value
    return this
  }

  getName() {
    return this.element.name || ''
  }

  getValue() {
    return this.element.value
  }

  setValue(value) {
    this.element.value = value
    return this
  }

  setPlaceholder(value) {
    this.element.placeholder = value
    return this
  }

  getPlaceholder() {
    return this.element.placeholder || ''
  }

}

export class nInputText extends Valuable {
  constructor() {
    super({
      component: { name: 'input-text' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'text')

    this.setContainerStyle('display', 'inline-block')
    this.setContainerStyle('width', '100%')

    this.setStyle('font', 'inherit')
    this.setStyle('padding', '0.5em')
    this.setStyle('width', '100%')
  }
}

export class nInputNumber extends Valuable {
  constructor() {
    super({
      component: { name: 'input-number' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'number')
    this.setStyle('font', 'inherit')
    this.setStyle('padding', '0.5em')
  }
}

export class nInputDate extends nElement {
  flex = new nFlex

  day = new nInputNumber
  month = new nInputNumber
  year = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-date' }
    })

    this.flex.append(this.makeInput(this.day))
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.makeInput(this.month))
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.makeInput(this.year))

    this.append(this.flex)
  }

  makeInput(input) {
    input.setStyle('width', '100%')
    return input
  }

  makeSeparator(text) {
    const sep = new nText()

    sep.setContainerStyle('width', '1em')
    sep.setStyle('width', '1em')

    sep.setStyle('text-align', 'center')
    sep.setStyle('padding-top', '0.5em')
    sep.setStyle('padding-botton', '0.5em')

    sep.setText(text)

    return sep
  }

  getValue() {
    return [
      this.day.getValue(),
      this.month.getValue(),
      this.year.getValue(),
    ].map((value) => value.toString()).join(' ')
  }

  setValue(value = '') {
    const [day, month, year] = value.split(' ')
    this.day.setValue(day)
    this.month.setValue(month)
    this.year.setValue(year)
    return this
  }
}

export class nInputTime extends nElement {
  flex = new nFlex

  hour = new nInputNumber
  minutes = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-time' }
    })

    this.flex.append(this.makeInput(this.hour))

    const sep = new nElement()
    sep.setText(':')

    sep.setContainerStyle('width', '1em')

    sep.setStyle('padding-botton', '0.5em')
    sep.setStyle('padding-top', '0.5em')
    sep.setStyle('text-align', 'center')
    sep.setStyle('width', '1em')
    this.flex.append(sep)

    this.flex.append(this.makeInput(this.minutes))

    this.append(this.flex)
  }

  makeInput(input) {
    input.setStyle('width', '100%')
    return input
  }

  getValue() {
    return [
      this.hour.getValue(),
      this.minutes.getValue(),
    ].map((str) => str.toString()).join(' ')
  }

  setValue(value = '') {
    const [hour, minutes] = value.split(' ')
    this.hour.setValue(hour)
    this.minutes.setValue(minutes)
    return this
  }
}

export class nError extends nElement {
  constructor() {
    super({
      component: { name: 'error' },
    })

    this.setStyle('color', 'red')
    this.setStyle('padding-top', '0.5em')
    this.setStyle('padding-botton', '0.5em')
  }
}

export class nCenter extends nElement {
  constructor() {
    super({ component: { name: 'center' } })

    this.setStyle('margin', '0 auto')
    this.setStyle('width', '42em')
  }
}

export class nInputTextGroup extends nElement {
  label = new nLabel
  input = new nInputText
  error = new nError

  constructor() {
    super({
      component: { name: 'input-text-group' }
    })

    const id = Date.now()

    this.label.setAttr('for', id)
    this.append(this.label)

    this.input.setAttr('id', id)
    // this.input.setContainerStyle('width', '100%')
    // this.input.setStyle('width', '100%')
    this.append(this.input)

    this.append(this.error)
  }
}

export class nHR extends nElement {
  constructor() {
    super({
      element: { tagName: 'hr' },
      component: { name: 'hr' }
    })

    this.setStyle('border-bottom', '1px solid #000000')
    this.setStyle('margin', '1em 0em 0em')
  }
}

export class nImage extends nElement {
  constructor() {
    super({
      element: { tagName: 'img' },
      component: { name: 'image' }
    })

    this.setStyle('width', '100%')

    this.alt()
  }

  src(value) {
    this.element.src = value

    return this
  }

  alt(value = 'image') {
    this.element.alt = value

    return this
  }
}

export class nTable extends nElement {
  thead = new nThead()
  tbody = new nTbody()

  constructor() {
    super({
      element: { tagName: 'table' },
      component: { name: 'table' }
    })

    this.append(this.thead)
    this.append(this.tbody)
  }

  addInHead(element = new nElement) {
    this.thead.append(element)
    return this
  }

  addInHead(element = new nElement) {
    this.tbody.append(element)
    return this
  }
}

export class nThead extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'thead' },
      component: { name: 'thead' }
    })
  }
}

export class nTbody extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'tbody' },
      component: { name: 'tbody' }
    })
  }
}

export class nTr extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'tr' },
      component: { name: 'tr' }
    })
  }
}

export class nTd extends nElement {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'td' },
      component: { name: 'td' }
    })
  }
}

export class nForm extends nElement {
  constructor() {
    super({
      element: { tagName: 'form' },
      component: { name: 'form' }
    })
  }

  setAction(value = '?#') {
    this.element.action = value
    return this
  }

  getAction() {
    return this.element.action || ''
  }
}

export class nOption extends Valuable {
  constructor() {
    super({
      container: { append: false },
      element: { tagName: 'option' },
      component: { name: 'option' }
    })

    this.setStyle('font', 'inherit')
  }
}

export class nSelect extends Valuable {
  constructor() {
    super({
      element: { tagName: 'select' },
      component: { name: 'select' }
    })

    this.setStyle('font', 'inherit')
  }

  addOption(key, value = '') {
    const options = new nOption()
    options.setValue(key)
    options.setText(value)
    return this.append(options)
  }
}

export class nSelectGroup extends Valuable {
  label = new nLabel
  select = new nSelect
  error = new nError

  constructor() {
    super({
      component: { name: 'select-group' }
    })

    this.setStyle('font', 'inherit')

    const id = Date.now()

    this.label.setAttr('for', id)
    this.append(this.label)

    this.select.setAttr('id', id)
    this.append(this.select)

    this.append(this.error)
  }
}
