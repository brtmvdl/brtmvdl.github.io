import { qrcode } from '../../assets/js/utils/functions.js'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'

const urlParam = (param) => (new URL(window.location)).searchParams.get(param)

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth + 'px'
canvas.height = window.innerHeight + 'px'
const ctx = canvas.getContext('2d')
document.body.append(canvas)

const update = () => {
  requestAnimationFrame(update)
}

requestAnimationFrame(update)

const peer = new Peer()

peer.on('open', () => {
  const conn = peer.connect(urlParam('id'))

  conn.on('open', (open) => {
    console.log({ open })

    conn.on('data', (data) => {
      console.log({ data })
    })

    conn.on('close', (close) => {
      console.log({ close })
    })

    conn.on('error', (error) => {
      console.log({ error })
    })

    conn.send({ header: 'hello', body: null })
  })

})
