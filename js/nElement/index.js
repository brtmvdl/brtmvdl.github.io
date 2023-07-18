
export class nElement {
  container = document.createElement('div')
  element = document.createElement('div')

  constructor() {
    // element
    this.element = document.createElement(this.getTagName())
    this.element.classList.add(`el-${this.getName()}`)

    // container
    this.container = document.createElement(this.getContainerName())
    this.container.classList.add(`ct-${this.getName()}`)
  }

  getName() {
    return 'nelement'
  }

  getVersion() {
    return this.version = '1.0.0-alpha.20230709'
  }

  getTagName() {
    return 'div'
  }

  getContainerName() {
    return 'div'
  }

  hasContainer() {
    return true
  }

  //

  onCreate() {
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
    el.onCreate()
    this.element.append(el.onRender())
    return this
  }

  onRender() {
    if (this.hasContainer()) {
      this.container.append(this.element)
      return this.container
    }

    return this.element
  }
}

export class nAnchor extends nElement {
  getName() {
    return 'a'
  }

  getTagName() {
    return 'a'
  }
}

export class nArea extends nElement {
  getName() {
    return 'area'
  }

  getTagName() {
    return 'area'
  }
}

export class nArticle extends nElement {
  getName() {
    return 'article'
  }

  getTagName() {
    return 'article'
  }
}

export class nAside extends nElement {
  getName() {
    return 'aside'
  }

  getTagName() {
    return 'aside'
  }
}

export class nAudio extends nElement {
  getName() {
    return 'audio'
  }

  getTagName() {
    return 'audio'
  }
}

export class nB extends nElement {
  getName() {
    return 'b'
  }

  getTagName() {
    return 'b'
  }
}

export class nBase extends nElement {
  getName() {
    return 'base'
  }

  getTagName() {
    return 'base'
  }
}

export class nBasefont extends nElement {
  getName() {
    return 'basefont'
  }

  getTagName() {
    return 'basefont'
  }
}

export class nBlockquote extends nElement {
  getName() {
    return 'blockquote'
  }

  getTagName() {
    return 'blockquote'
  }
}

export class nBr extends nElement {
  getName() {
    return 'br'
  }

  getTagName() {
    return 'br'
  }
}

export class nButton extends nElement {
  getName() {
    return 'button'
  }

  getTagName() {
    return 'button'
  }
}

export class nCanvas extends nElement {
  getName() {
    return 'canvas'
  }

  getTagName() {
    return 'canvas'
  }
}

export class nCaption extends nElement {
  getName() {
    return 'caption'
  }

  getTagName() {
    return 'caption'
  }
}

export class nCode extends nElement {
  getName() {
    return 'code'
  }

  getTagName() {
    return 'code'
  }
}

export class nCol extends nElement {
  getName() {
    return 'col'
  }

  getTagName() {
    return 'col'
  }
}

export class nColgroup extends nElement {
  getName() {
    return 'colgroup'
  }

  getTagName() {
    return 'colgroup'
  }
}

export class nData extends nElement {
  getName() {
    return 'data'
  }

  getTagName() {
    return 'data'
  }
}

export class nDatalist extends nElement {
  getName() {
    return 'datalist'
  }

  getTagName() {
    return 'datalist'
  }
}

export class nDd extends nElement {
  getName() {
    return 'dd'
  }

  getTagName() {
    return 'dd'
  }
}

export class nDel extends nElement {
  getName() {
    return 'del'
  }

  getTagName() {
    return 'del'
  }
}

export class nDetails extends nElement {
  getName() {
    return 'details'
  }

  getTagName() {
    return 'details'
  }
}

export class nDialog extends nElement {
  getName() {
    return 'dialog'
  }

  getTagName() {
    return 'dialog'
  }
}

export class nDl extends nElement {
  getName() {
    return 'dl'
  }

  getTagName() {
    return 'dl'
  }
}

export class nDt extends nElement {
  getName() {
    return 'dt'
  }

  getTagName() {
    return 'dt'
  }
}

export class nEm extends nElement {
  getName() {
    return 'em'
  }

  getTagName() {
    return 'em'
  }
}

export class nEmbed extends nElement {
  getName() {
    return 'embed'
  }

  getTagName() {
    return 'embed'
  }
}

export class nFieldSet extends nElement {
  getName() {
    return 'fieldset'
  }

  getTagName() {
    return 'fieldset'
  }
}

export class nFigCaption extends nElement {
  getName() {
    return 'figcaption'
  }

  getTagName() {
    return 'figcaption'
  }
}

export class nFigure extends nElement {
  getName() {
    return 'figure'
  }

  getTagName() {
    return 'figure'
  }
}

export class nFooter extends nElement {
  getName() {
    return 'footer'
  }

  getTagName() {
    return 'footer'
  }
}

export class nForm extends nElement {
  getName() {
    return 'form'
  }

  getTagName() {
    return 'form'
  }
}

export class nH1 extends nElement {
  getName() {
    return 'h1'
  }

  getTagName() {
    return 'h1'
  }
}

export class nH2 extends nElement {
  getName() {
    return 'h2'
  }

  getTagName() {
    return 'h2'
  }
}

export class nH3 extends nElement {
  getName() {
    return 'h3'
  }

  getTagName() {
    return 'h3'
  }
}

export class nH4 extends nElement {
  getName() {
    return 'h4'
  }

  getTagName() {
    return 'h4'
  }
}

export class nH5 extends nElement {
  getName() {
    return 'h5'
  }

  getTagName() {
    return 'h5'
  }
}

export class nH6 extends nElement {
  getName() {
    return 'h6'
  }

  getTagName() {
    return 'h6'
  }
}

export class nHead extends nElement {
  getName() {
    return 'head'
  }

  getTagName() {
    return 'head'
  }
}

export class nHeader extends nElement {
  getName() {
    return 'header'
  }

  getTagName() {
    return 'header'
  }
}

export class nHr extends nElement {
  getName() {
    return 'hr'
  }

  getTagName() {
    return 'hr'
  }
}

export class nI extends nElement {
  getName() {
    return 'i'
  }

  getTagName() {
    return 'i'
  }
}

export class nIframe extends nElement {
  getName() {
    return 'iframe'
  }

  getTagName() {
    return 'iframe'
  }
}

export class nImg extends nElement {
  getName() {
    return 'img'
  }

  getTagName() {
    return 'img'
  }
}

export class nInput extends nElement {
  getName() {
    return 'input'
  }

  getTagName() {
    return 'input'
  }
}

export class nIns extends nElement {
  getName() {
    return 'ins'
  }

  getTagName() {
    return 'ins'
  }
}

export class nLabel extends nElement {
  getName() {
    return 'label'
  }

  getTagName() {
    return 'label'
  }
}

export class nLegend extends nElement {
  getName() {
    return 'legend'
  }

  getTagName() {
    return 'legend'
  }
}

export class nLi extends nElement {
  getName() {
    return 'li'
  }

  getTagName() {
    return 'li'
  }
}

export class nLink extends nElement {
  getName() {
    return 'link'
  }

  getTagName() {
    return 'link'
  }
}

export class nMain extends nElement {
  getName() {
    return 'main'
  }

  getTagName() {
    return 'main'
  }
}

export class nMap extends nElement {
  getName() {
    return 'map'
  }

  getTagName() {
    return 'map'
  }
}

export class nMark extends nElement {
  getName() {
    return 'mark'
  }

  getTagName() {
    return 'mark'
  }
}

export class nMeta extends nElement {
  getName() {
    return 'meta'
  }

  getTagName() {
    return 'meta'
  }
}

export class nMeter extends nElement {
  getName() {
    return 'meter'
  }

  getTagName() {
    return 'meter'
  }
}

export class nNav extends nElement {
  getName() {
    return 'nav'
  }

  getTagName() {
    return 'nav'
  }
}

export class nNoScript extends nElement {
  getName() {
    return 'noscript'
  }

  getTagName() {
    return 'noscript'
  }
}

export class nObject extends nElement {
  getName() {
    return 'object'
  }

  getTagName() {
    return 'object'
  }
}

export class nOl extends nElement {
  getName() {
    return 'ol'
  }

  getTagName() {
    return 'ol'
  }
}

export class nOptGroup extends nElement {
  getName() {
    return 'optgroup'
  }

  getTagName() {
    return 'optgroup'
  }
}

export class nOption extends nElement {
  getName() {
    return 'option'
  }

  getTagName() {
    return 'option'
  }
}

export class nOutput extends nElement {
  getName() {
    return 'output'
  }

  getTagName() {
    return 'output'
  }
}

export class nP extends nElement {
  getName() {
    return 'p'
  }

  getTagName() {
    return 'p'
  }
}

export class nPicture extends nElement {
  getName() {
    return 'picture'
  }

  getTagName() {
    return 'picture'
  }
}

export class nPre extends nElement {
  getName() {
    return 'pre'
  }

  getTagName() {
    return 'pre'
  }
}

export class nProgress extends nElement {
  getName() {
    return 'progress'
  }

  getTagName() {
    return 'progress'
  }
}

export class nQ extends nElement {
  getName() {
    return 'q'
  }

  getTagName() {
    return 'q'
  }
}

export class nS extends nElement {
  getName() {
    return 's'
  }

  getTagName() {
    return 's'
  }
}

export class nScript extends nElement {
  getName() {
    return 'script'
  }

  getTagName() {
    return 'script'
  }
}

export class nSection extends nElement {
  getName() {
    return 'section'
  }

  getTagName() {
    return 'section'
  }
}

export class nSelect extends nElement {
  getName() {
    return 'select'
  }

  getTagName() {
    return 'select'
  }
}

export class nSmall extends nElement {
  getName() {
    return 'small'
  }

  getTagName() {
    return 'small'
  }
}

export class nSource extends nElement {
  getName() {
    return 'source'
  }

  getTagName() {
    return 'source'
  }
}

export class nSpan extends nElement {
  getName() {
    return 'span'
  }

  getTagName() {
    return 'span'
  }
}

export class nStrong extends nElement {
  getName() {
    return 'strong'
  }

  getTagName() {
    return 'strong'
  }
}

export class nStyle extends nElement {
  getName() {
    return 'style'
  }

  getTagName() {
    return 'style'
  }
}

export class nSub extends nElement {
  getName() {
    return 'sub'
  }

  getTagName() {
    return 'sub'
  }
}

export class nSummary extends nElement {
  getName() {
    return 'summary'
  }

  getTagName() {
    return 'summary'
  }
}

export class nSup extends nElement {
  getName() {
    return 'sup'
  }

  getTagName() {
    return 'sup'
  }
}

export class nSvg extends nElement {
  getName() {
    return 'svg'
  }

  getTagName() {
    return 'svg'
  }
}

export class nTable extends nElement {
  getName() {
    return 'table'
  }

  getTagName() {
    return 'table'
  }
}

export class nTbody extends nElement {
  getName() {
    return 'tbody'
  }

  getTagName() {
    return 'tbody'
  }
}

export class nTd extends nElement {
  getName() {
    return 'td'
  }

  getTagName() {
    return 'td'
  }
}

export class nTemplate extends nElement {
  getName() {
    return 'template'
  }

  getTagName() {
    return 'template'
  }
}

export class nTextArea extends nElement {
  getName() {
    return 'textarea'
  }

  getTagName() {
    return 'textarea'
  }
}

export class nTFoot extends nElement {
  getName() {
    return 'tfoot'
  }

  getTagName() {
    return 'tfoot'
  }
}

export class nTh extends nElement {
  getName() {
    return 'th'
  }

  getTagName() {
    return 'th'
  }
}

export class nTHead extends nElement {
  getName() {
    return 'thead'
  }

  getTagName() {
    return 'thead'
  }
}

export class nTime extends nElement {
  getName() {
    return 'time'
  }

  getTagName() {
    return 'time'
  }
}

export class nTitle extends nElement {
  getName() {
    return 'title'
  }

  getTagName() {
    return 'title'
  }
}

export class nTr extends nElement {
  getName() {
    return 'tr'
  }

  getTagName() {
    return 'tr'
  }
}

export class nTrack extends nElement {
  getName() {
    return 'track'
  }

  getTagName() {
    return 'track'
  }
}

export class nU extends nElement {
  getName() {
    return 'u'
  }

  getTagName() {
    return 'u'
  }
}

export class nUl extends nElement {
  getName() {
    return 'ul'
  }

  getTagName() {
    return 'ul'
  }
}

export class nVar extends nElement {
  getName() {
    return 'var'
  }

  getTagName() {
    return 'var'
  }
}

export class nVideo extends nElement {
  getName() {
    return 'video'
  }

  getTagName() {
    return 'video'
  }
}

// datetime = 2023/07/17 11:50
