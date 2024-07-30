import { HTML } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ImageComponent } from '../../assets/js/components/image.component.js'
import { createNewPeer, getControlsUrl } from '../../assets/js/utils/peer.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { qrcode } from '../../assets/js/utils/functions.js'
import { random } from '../../assets/js/utils/math.js'

class CanvasComponent extends HTML {
  getName() { return 'canvas-component' }
  getTagName() { return 'canvas' }
  getContext() { return this.element.getContext('2d') }
}

export class Page extends PaddingComponent {
  children = {
    canvas: new CanvasComponent(),
    qrcode: new HTML(),
  }

  state = {
    peer: this.createNewPeer(),
    ctx: null,
    players: {},
    fruits: [{ x: random(9), y: random(9) }],
    moves: {
      ArrowDown: (id) => this.state.players[id].y += this.state.players[id].y == 9 ? 0 : 1,
      ArrowRight: (id) => this.state.players[id].x += this.state.players[id].x == 9 ? 0 : 1,
      ArrowUp: (id) => this.state.players[id].y -= this.state.players[id].y == 0 ? 0 : 1,
      ArrowLeft: (id) => this.state.players[id].x -= this.state.players[id].x == 0 ? 0 : 1,
    }
  }

  onCreate() {
    super.onCreate()
    this.append(this.getCanvas())
    this.append(this.getQRCode())
  }

  createNewPeer() {
    const peer = createNewPeer('snake')
    peer.on('open', (open) => this.onPeerOpen(open))
    peer.on('connection', (conn) => {
      this.addPlayer(conn.peer)
      conn.on('data', (move) => this.movePlayer(conn.peer, move))
    })
    return peer
  }

  onPeerOpen() {
    this.setQRCode()
    this.runAnimationFrame()
  }

  getSize(n) { return n * 40 }

  getCanvas() {
    this.state.ctx = this.children.canvas.getContext()
    this.children.canvas.setAttr('height', this.getSize(10))
    this.children.canvas.setAttr('width', this.getSize(10))
    return this.children.canvas
  }

  getQRCode() { return this.children.qrcode }

  setQRCode() {
    this.children.qrcode.clear()
    const url = getControlsUrl('snake', this.state.peer.id)
    const link = new LinkComponent({ href: url })
    const image = new ImageComponent({ src: qrcode(url) })
    image.setContainerStyle('max-width', '10rem')
    link.append(image)
    this.children.qrcode.append(link)
  }

  reset() { this.state.ctx.clearRect(0, 0, this.getSize(10), this.getSize(10)) }

  drawPlayers() {
    for (const id in this.state.players) {
      this.state.ctx.fillStyle = '#000000'
      const player = this.state.players[id]
      this.state.ctx.fillRect(...[player.x, player.y, 1, 1].map(this.getSize))
    }
  }

  drawFruits() {
    for (const id in this.state.fruits) {
      this.state.ctx.fillStyle = '#ff0000'
      const fruit = this.state.fruits[id]
      this.state.ctx.fillRect(...[fruit.x, fruit.y, 1, 1].map(this.getSize))
    }
  }

  addPlayer(id) { this.state.players[id] = { x: random(9), y: random(9) } }

  runAnimationFrame() {
    this.reset()
    this.drawPlayers()
    this.drawFruits()
    requestAnimationFrame(() => this.runAnimationFrame())
  }

  getFruitCollision(playerId) {
    const player = this.state.players[playerId]
    for (const id in this.state.fruits) {
      const fruit = this.state.fruits[id]
      if (fruit.x == player.x && fruit.y == player.y) return fruit
    }
    return null
  }

  removeFruit() { this.state.fruits = [] }

  addFruit() { this.state.fruits.push({ x: random(9), y: random(9) }) }

  movePlayer(player, move) {
    const fn = this.state.moves[move]
    if (fn) fn(player)
    const collision = this.getFruitCollision(player)
    if (collision) {
      this.removeFruit(collision)
      this.addFruit()
    }
  }
}
