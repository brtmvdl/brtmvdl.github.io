import { nElement, nFlex, nH1 } from './js/nElement.js'
import { Experience } from './js/experience.js'
import { Social } from './js/social.js'

import experiences from './libs/experiences.js'
import socials from './libs/socials.js'

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

const socialsEl = new nFlex()
body.append(socialsEl)

socials
  .map((s = {}) => new Social(s))
  .sort((s1, s2) => s2.title.localeCompare(s1.title))
  .map((s) => socialsEl.append(s.getListItem()))

const experiencesEl = new nElement()
body.append(experiencesEl)

experiences
  .map((xp = {}) => new Experience(xp))
  .sort((xp1, xp2) => xp2.title.localeCompare(xp1.title))
  .map((xp) => experiencesEl.append(xp.getListItem()))
