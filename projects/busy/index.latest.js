import { HTML, nH1, nInputText, nFlex } from '../../assets/js/libs/frontend/index.js'

const app = HTML.fromId('app')

const title = new nH1()
title.setText('Busy')
title.setStyle('text-align', 'center')
title.setStyle('margin-bottom', '1rem')
app.append(title)

const input = new nFlex()
app.append(input)

const inputText = new nInputText()
inputText.setPlaceholder('what am i doing?')
inputText.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 16) #000000')
input.append(inputText)

const list = []

const inputButton = new HTML()
inputButton.setStyle('margin-left', '1rem')
inputButton.setStyle('padding', '0.5rem')
inputButton.setText('Go!')
inputButton.addEventListener('click', () => {
  const itemName = inputText.getValue()
  inputText.clear()

  const item = {
    name: itemName,
    on: true,
    started: Date.now(),
  }

  const index = list.findIndex(({ name }) => name == itemName)
  index === -1 ? list.push(item) : (list[index] = item)
})
input.append(inputButton)

const listEl = new HTML()
app.append(listEl)

const calcTime = (start, end) => Math.floor((start - end) / 1000).toString()

const padString = (txt = '', alg = 1, pad = ' ') => {
  while (txt.length < alg) txt = pad + txt
  return txt
}

const textTime = (time = 0) => {
  return [Math.floor(time / 60), time % 60]
    .map(i => padString(i.toString(), 2, '0'))
    .join(':')
}

const renderList = () => {
  const now = Date.now()

  listEl.clear()

  list.forEach((item, ix) => {
    if (!item.name) return

    const itemEl = new nFlex()
    itemEl.setStyle('padding', '0.5rem 0rem')

    const textEl = new HTML()
    textEl.setText(item.name)
    itemEl.append(textEl)

    if (item.on) {
      const timeEl = new HTML()
      timeEl.setText(textTime(calcTime(now, item.started)))
      timeEl.addEventListener('click', () => list[ix].on = false)
      itemEl.append(timeEl)
    } else {
      const buttonEl = new HTML()
      buttonEl.setText('Start')
      buttonEl.addEventListener('click', () => list[ix].on = true)
      itemEl.append(buttonEl)
    }

    listEl.append(itemEl)
  })

  setTimeout(renderList, 1000)
}

renderList()
