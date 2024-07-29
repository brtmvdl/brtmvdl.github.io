import { createNewPeer } from '../../assets/js/utils/peer.js'

const random = (n, m = 0) => Math.floor(Math.random() * n) + m

const state = {
  players: {},
  fruits: [{ x: random(9), y: random(9) }],
}

const size = (n = 1) => n * 40

const app = document.getElementById('app')

const cv = document.createElement('canvas')
cv.height = '' + size(10)
cv.width = '' + size(10)
app.appendChild(cv)

const ctx = cv.getContext('2d')

const reset = () => {
  ctx.clearRect(0, 0, size(10), size(10))
}

const drawPlayers = () => {
  for (const id in state.players) {
    ctx.fillStyle = '#000000'
    if (id == peer._id) ctx.fillStyle = '#ff9900'
    const player = state.players[id]
    ctx.fillRect(...[player.x, player.y, 1, 1].map(size))
  }
}

const drawFruits = () => {
  for (const id in state.fruits) {
    ctx.fillStyle = '#ff0000'
    const fruit = state.fruits[id]
    ctx.fillRect(...[fruit.x, fruit.y, 1, 1].map(size))
  }
}

const addPlayer = (id) => {
  state.players[id] = { x: random(9), y: random(9) }
}

const loop = () => {
  reset()
  drawPlayers()
  drawFruits()
  requestAnimationFrame(loop)
}

const getFruitCollision = (id) => {
  const player = state.players[id]
  for (const id in state.fruits) {
    const fruit = state.fruits[id]
    if (fruit.x == player.x && fruit.y == player.y) return fruit
  }
  return null
}

const removeFruit = () => { state.fruits = [] }

const addFruit = () => state.fruits.push({ x: random(9), y: random(9) })

const keysFunctions = {
  ArrowDown: (id) => state.players[id].y += state.players[id].y == 9 ? 0 : 1,
  ArrowRight: (id) => state.players[id].x += state.players[id].x == 9 ? 0 : 1,
  ArrowUp: (id) => state.players[id].y -= state.players[id].y == 0 ? 0 : 1,
  ArrowLeft: (id) => state.players[id].x -= state.players[id].x == 0 ? 0 : 1,
}

const movePlayer = (player, move) => {
  const fn = keysFunctions[move]
  if (fn) fn(player); else console.log('no key')

  const collision = getFruitCollision(player)
  if (collision) {
    removeFruit(collision)
    addFruit()
  }
}

const peer = createNewPeer('snake', true)

peer.on('open', () => loop())

peer.on('connection', (conn) => {
  addPlayer(conn.id)
  conn.on('data', (move) => movePlayer(conn.id, move))
})
