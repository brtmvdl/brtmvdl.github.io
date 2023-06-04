import { nElement, nH1, nH2, nHR, nLink } from './js/nElement.js'
import { Experience } from './js/experience.js'

import experiences from './libs/experiences.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0rem')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', '#000000')
header.setStyle('color', '#FFFFFF')
header.setStyle('padding', '1rem')
app.append(header)

const title = new nH1()
title.setText('brtmvdl')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
body.setStyle('margin', '1rem auto')
body.setStyle('width', '40rem')
app.append(body)

const experiencesEl = new nElement()
body.append(experiencesEl)

experiences
  .map((xp = {}) => new Experience(xp))
  .sort((xp1, xp2) => xp2.title.localeCompare(xp1.title))
  .map((xp) => experiencesEl.append(xp.getListItem()))
