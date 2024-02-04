import { HTML } from '@brtmvdl/frontend'

import { InputTextGroupComponent } from './input-text-group.js'

export class DefaultInputsList extends HTML {
  children = {
    timestamp: new InputTextGroupComponent('timestamp'),
    api_key: new InputTextGroupComponent('api_key'),
    signature: new InputTextGroupComponent('signature'),
  }

  onCreate() {
    super.onCreate()
    this.setTimestamp()
    this.setApiKey()
    this.setSignature()
  }

  setTimestamp() {
    setInterval(() => { this.children.timestamp.children.input.setValue(Date.now()) }, 1000)
    this.children.timestamp.children.input.setAttr('disabled', true)
  }

  setApiKey() {
    this.children.api_key.children.input.setAttr('type', 'password')
  }

  setSignature() {
    this.children.signature.children.input.setAttr('type', 'password')
  }

  getComponent(name = '') {
    const component = this.children[name]
    if (!component) return this.getDefaultComponent()
    return component
  }

  getDefaultComponent() {
    const component = new HTML()
    component.setText('no component')
    return component
  }
}
