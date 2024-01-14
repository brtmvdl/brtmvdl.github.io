import API from './js/api.js'
import { nElement, nFlex, nH1, nH2, nImage, nButton } from './js/nElement.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', '#000000')
header.setStyle('padding', '1rem')
app.append(header)

const title = new nH1()
title.setText('Games')
title.setStyle('color', '#FFFFFF')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
app.append(body)

const list = new nElement()
list.setStyle('margin', '1rem auto')
// list.setStyle('width', '40rem')
body.append(list)

class GameApp {
  image = null
  name = null
  price = 0
  link = null

  constructor({ image, name, price, link }) {
    this.image = image
    this.name = name
    this.price = price
    this.link = link
  }

  getDomElement() {
    const dom = new nFlex()
    dom.setStyle('margin', '0rem 0rem 1rem 0rem')
    dom.setStyle('background-color', '#000000')
    dom.setStyle('color', '#FFFFFF')
    dom.setStyle('padding', '1rem')

    const left = new nElement()
    left.setContainerStyle('width', '40%')
    dom.append(left)

    const image = new nImage()
    image.src(this.image)
    left.append(image)

    const right = new nElement()
    right.setContainerStyle('width', '60%')
    dom.append(right)

    const name = new nH2()
    name.setText(this.name)
    name.setStyle('padding', '0rem 0rem 1rem 0rem')
    right.append(name)

    const action = new nFlex()
    right.append(action)

    const price = new nElement()
    price.setText(this.getPrice())
    price.setStyle('padding', '1rem 0rem 0rem 0rem')
    action.append(price)

    const button = new nButton()
    button.setText('Go!')
    //
    button.setStyle('background-color', '#000000')
    button.setStyle('color', '#FFFFFF')
    //
    button.on('click', () => window.location = this.link)
    button.on('mouseenter', () => {
      button.setStyle('background-color', '#FFFFFF')
      button.setStyle('color', '#000000')
    })
    button.on('mouseleave', () => {
      button.setStyle('background-color', '#000000')
      button.setStyle('color', '#FFFFFF')
    })
    action.append(button)

    return dom
  }

  getPrice() {
    return `R$ ${this.price.toFixed(2).replace('.', ',')}`
  }
}

API.listGames().then((res) => res.get('list')
  .map((g) => list
    .append((new GameApp(g)).getDomElement())
  )
)
