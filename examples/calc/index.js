import { nElement, nFlex, nH1, nInputTextGroup, nSelectGroup } from '../../js/nElement.js'
import * as COLORS from '../../libs/colors.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0rem')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', COLORS.BLACK)
header.setStyle('color', COLORS.WHITE)
header.setStyle('padding', '1rem')
app.append(header)

const title = new nH1()
title.setText('Calc')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
body.setStyle('margin', '1rem auto')
body.setStyle('width', '40rem')
app.append(body)
