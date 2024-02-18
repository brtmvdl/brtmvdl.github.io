import { HTML, nSelect, nButton, nInputTextGroup, nLink } from '@brtmvdl/frontend'
import { getInBrowserMethodsList, getMethodsList, getParamsList, getUserDataStreamMethodsList, getWebSocketMethodsList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    method: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
    links: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.children.inputs.children.apiKey)
    this.append(this.children.inputs.children.secretKey)
    this.append(this.getSaveButton())
    this.append(this.children.links)
  }

  setEvents() {
    this.on('messages', (data) => this.onMessages(data))
  }

  onMessages({ value: messages } = {}) {
    const type = 'application/json'
    const lastModified = Date.now()
    const blob = new Blob([JSON.stringify(messages)], { type })
    const filename = `${lastModified}.json`
    const file = new File([blob], filename, { type, lastModified })
    this.children.links.append(this.createDownloadLink(filename, file))
  }

  createDownloadLink(filename, file) {
    const link = new nLink()
    link.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    link.setStyle('border-radius', 'calc(1rem / 2)')
    link.setStyle('margin', 'calc(1rem / 2) 0rem')
    link.setStyle('border', '#000000 solid 1px')
    link.setStyle('box-sizing', 'border-box')
    link.setStyle('display', 'inline-block')
    link.setStyle('text-align', 'center')
    link.setStyle('cursor', 'pointer')
    link.setStyle('color', '#000000')
    link.setStyle('font', 'inherit')
    link.setStyle('width', '100%')
    link.setAttr('download', filename)
    link.setText(filename)
    link.href(URL.createObjectURL(file))
    return link
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getEndpointSelect() {
    getMethodsList().map((endpoint) => this.children.method.addOption(endpoint, endpoint))
    this.children.method.on('change', () => this.onMethodSelectChange())
    return this.children.method
  }

  onMethodSelectChange() {
    this.children.params.clear()
    getParamsList()[this.getMethodValue()]?.map((component) => this.children.params.append(this.children.inputs.getComponent(component)))
  }

  getParamsHTML() {
    return this.children.params
  }

  getSendButton() {
    const button = new ButtonComponent()
    button.setText('send')
    button.on('click', () => this.onSendButtonClick())
    return button
  }

  onSendButtonClick() {
    const method = this.getMethodValue()
    this.dispatchEvent('submit', { method, params: this.getParamsValues(method) })
  }

  getMethodValue() {
    return this.children.method.getValue()
  }

  getParamsValues(method = '') {
    const values = Array.from(getParamsList()[method])?.map((input) => ([input, this.children.inputs.getValue(input)]))

    let params = Array.from([])

    if (getWebSocketMethodsList().indexOf(method) !== -1) {
      values.push(['apiKey', this.children.inputs.getValue('apiKey')])
      values.push(['timestamp', Date.now()])
      params = values.sort(([a], [b]) => a.localeCompare(b))
      params.push(['signature', this.getSignatureValue(this.children.inputs.getValue('secretKey'), params)])
    } else {
      params = values.sort(([a], [b]) => a.localeCompare(b))
    }

    return params.reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }

  getSignatureValue(key, params) {
    return sha256.hmac(key, params.map(([name, value]) => `${name}=${value}`).join('&'))
  }

  getSaveButton() {
    const button = new ButtonComponent()
    button.setText('save as json')
    button.on('click', () => this.dispatchEvent('save'))
    return button
  }
}
