import { qrcode } from '../../assets/js/utils/functions.js'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'

// functions

const getControlsUrl = (id, ix = 0) => {
  const url = new URL(window.location)
  url.pathname = '/projects/truco/controls.html'
  url.searchParams.set('id', id)
  url.searchParams.set('ix', ix)
  return url.toString()
}

const createQrcodeImage = (id) => {
  const controls_url = getControlsUrl(id)
  console.log(controls_url)
  const image = document.createElement('img')
  image.src = qrcode(controls_url)
  image.style.position = 'fixed'
  image.style.bottom = '1rem'
  image.style.left = '1rem'
  image.style.zIndex = '1'
  document.body.append(image)
}

// game

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth + 'px'
canvas.height = window.innerHeight + 'px'
const ctx = canvas.getContext('2d')
document.body.append(canvas)

const update = () => {
  requestAnimationFrame(update)
}

requestAnimationFrame(update)

// connections

const peer = new Peer()

peer.on('open', () => createQrcodeImage(peer.id))

peer.on('connection', (conn) => {
  conn.on('open', (open) => {
    console.log({ open })
  })

  conn.on('data', (data) => {
    console.log({ data })
  })

  conn.on('close', (close) => {
    console.log({ close })
  })

  conn.on('error', (error) => {
    console.log({ error })
  })

})
