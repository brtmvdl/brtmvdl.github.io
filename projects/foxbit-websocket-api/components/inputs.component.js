import { InputComponent } from '../../../assets/js/components/input.component.js'

import * as Components from '../../../assets/js/components/inputs.component.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    OMSId: new InputComponent('OMSId', 1),
    InstrumentId: new InputComponent('InstrumentId'),
    AccountId: new InputComponent('AccountId'),
    TimeInForce: new InputComponent('TimeInForce'),
    ClientOrderId: new InputComponent('ClientOrderId'),
    OrderIdOCO: new InputComponent('OrderIdOCO'),
    UseDisplayQuantity: new InputComponent('UseDisplayQuantity'),
    Side: new InputComponent('Side'),
    Quantity: new InputComponent('Quantity'),
    OrderType: new InputComponent('OrderType'),
    PegPriceType: new InputComponent('PegPriceType'),
    LimitPrice: new InputComponent('LimitPrice'),
    ClOrderId: new InputComponent('ClOrderId'),
    OrderId: new InputComponent('OrderId'),
    ProductId: new InputComponent('ProductId'),
    Amount: new InputComponent('Amount'),
    MakerTaker: new InputComponent('MakerTaker'),
    Depth: new InputComponent('Depth'),
    Limit: new InputComponent('Limit'),
    Interval: new InputComponent('Interval'),
    FromDate: new InputComponent('FromDate'),
    ToDate: new InputComponent('ToDate'),
    MarketId: new InputComponent('MarketId'),
    StartIndex: new InputComponent('StartIndex'),
    Count: new InputComponent('Count'),
    IncludeLastCount: new InputComponent('IncludeLastCount'),
    IntrumentId: new InputComponent('IntrumentId'),
  }
}
