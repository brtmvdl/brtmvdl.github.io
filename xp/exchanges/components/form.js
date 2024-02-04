import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.js'
import { DefaultInputsList } from './default-inputs-list.js'
import { SelectGroupComponent } from './select-group.js'
import { ButtonComponent } from './button.js'
import { getDefaultInputsList, getEndpointsList, getEndpointInputsList } from '../utils/lists.js'
import { InputsList } from './inputs-list.js'

export class FormHTML extends HTML {
  children = {
    exchanges: new SelectGroupComponent('exchanges'),
    default_inputs: new HTML(),
    endpoint: new SelectGroupComponent('endpoint'),
    endpoint_inputs: new HTML(),
    send: new ButtonComponent(),
    backup: new InputTextGroupComponent('Backup Server (wss)'),
    default_inputs_list: new DefaultInputsList(),
    inputs_list: new InputsList(),
  }

  onCreate() {
    this.append(this.getExchangesSelect())
    this.append(this.getDefaultInputsHTML())
    this.append(this.getEndpointsSelect())
    this.append(this.getEndpointInputsHTML())
    this.append(this.getSendButton())
    this.append(this.getBackupUrlInput())
  }

  getExchangesSelect() {
    this.children.exchanges.children.label.setText('Exchange')
    Array.from(['---', 'foxbit', 'binance']).map((exchange) => this.children.exchanges.children.select.addOption(exchange, exchange))
    this.children.exchanges.on('change', () => this.onExchangesSelectChange())
    return this.children.exchanges
  }

  onExchangesSelectChange() {
    const exchange = this.children.exchanges.getValue()
    this.setDefaultInputs(exchange)
    this.setEndpoints(exchange)
  }

  setDefaultInputs(exchange) {
    this.children.default_inputs.clear()
    getDefaultInputsList()[exchange]?.map((input) => this.children.default_inputs.append(this.children.default_inputs_list.getComponent(input)))
  }

  setEndpoints(exchange) {
    this.children.endpoint.children.select.clear()
    this.children.endpoint_inputs.clear()
    getEndpointsList()[exchange]?.map((endpoint) => this.children.endpoint.children.select.addOption(endpoint, endpoint))
  }

  getDefaultInputsHTML() {
    return this.children.default_inputs
  }

  getEndpointsSelect() {
    this.children.endpoint.children.select.on('change', () => this.onEndpointChange())
    return this.children.endpoint
  }

  onEndpointChange() {
    this.setEndpointInputs(
      this.children.exchanges.children.select.getValue(),
      this.children.endpoint.children.select.getValue(),
    )
  }

  setEndpointInputs(exchange, endpoint) {
    this.children.endpoint_inputs.clear()
    getEndpointInputsList()?.[exchange]?.[endpoint].map((input) => this.children.endpoint_inputs.append(this.children.inputs_list.getInput(input)))
    console.log('setEndpointInputs', { endpoint })
  }

  getEndpointInputsHTML() {
    return this.children.endpoint_inputs
  }

  getSendButton() {
    this.children.send.setText('send')
    this.children.send.on('click', () => console.log('click'))
    return this.children.send
  }

  getBackupUrlInput() {
    this.children.backup.children.label.setText('Backup Server (wss)')
    return this.children.backup
  }
}
