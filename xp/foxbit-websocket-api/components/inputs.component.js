import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
    OMSId: new InputTextGroupComponent('OMSId', 1),
    InstrumentId: new InputTextGroupComponent('InstrumentId'),
    AccountId: new InputTextGroupComponent('AccountId'),
    TimeInForce: new InputTextGroupComponent('TimeInForce'),
    ClientOrderId: new InputTextGroupComponent('ClientOrderId'),
    OrderIdOCO: new InputTextGroupComponent('OrderIdOCO'),
    UseDisplayQuantity: new InputTextGroupComponent('UseDisplayQuantity'),
    Side: new InputTextGroupComponent('Side'),
    Quantity: new InputTextGroupComponent('Quantity'),
    OrderType: new InputTextGroupComponent('OrderType'),
    PegPriceType: new InputTextGroupComponent('PegPriceType'),
    LimitPrice: new InputTextGroupComponent('LimitPrice'),
    ClOrderId: new InputTextGroupComponent('ClOrderId'),
    OrderId: new InputTextGroupComponent('OrderId'),
    ProductId: new InputTextGroupComponent('ProductId'),
    Amount: new InputTextGroupComponent('Amount'),
    MakerTaker: new InputTextGroupComponent('MakerTaker'),
    Depth: new InputTextGroupComponent('Depth'),
    Limit: new InputTextGroupComponent('Limit'),
    Interval: new InputTextGroupComponent('Interval'),
    FromDate: new InputTextGroupComponent('FromDate'),
    ToDate: new InputTextGroupComponent('ToDate'),
    MarketId: new InputTextGroupComponent('MarketId'),
    StartIndex: new InputTextGroupComponent('StartIndex'),
    Count: new InputTextGroupComponent('Count'),
    IncludeLastCount: new InputTextGroupComponent('IncludeLastCount'),
    IntrumentId: new InputTextGroupComponent('IntrumentId'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
