import { nElement, nH1, nH2, nHR, nLink } from './js/nElement.js'
import experiences from './libs/experiences.js'
import months from './libs/months.js'

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

experiences.map(({
  title = '',
  image = '',
  link = '',
  type = '',
  dates = [],
}) => {
  const xpEl = new nElement()
  xpEl.addData('type', type)
  xpEl.setStyle('padding', '1rem 0rem')

  if (link) {
    const linkEl = new nLink()
    linkEl.href(link)

    const imageEl = new nElement()
    imageEl.setText(image)
    linkEl.append(imageEl)

    xpEl.append(linkEl)
  } else {
    const imageEl = new nElement()
    imageEl.setText(image)
    xpEl.append(imageEl)
  }

  const titleEl = new nH2()
  titleEl.setText(title)
  xpEl.append(titleEl)

  if (dates && dates.length) {
    const dateEl = new nElement()
    dateEl.setText(dates.map(([y, m]) => [y, months(m)].join(' / ')).join(' - '))
    xpEl.append(dateEl)
  }

  xpEl.append(new nHR())
  experiencesEl.append(xpEl)
})
