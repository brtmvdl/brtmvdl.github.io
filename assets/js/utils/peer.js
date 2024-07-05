import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { qrcode } from './functions.js'

export const getPeerConnection = () => { }

export const createControlsUrl = (project, id) => {
  const url = new URL(window.location)
  url.pathname = `/projects/${project}/controls.html?id=${id}`
  return url.toString()
}

export const createQrcodeImage = (url) => {
  console.log('url', (url).replace('%3F', '?'))
  const image = document.createElement('img')
  image.src = qrcode(url)
  image.style.position = 'fixed'
  image.style.left = '1rem'
  image.style.bottom = '1rem'
  document.body.append(image)
}

export const createNewPeer = (project, qrcode = false) => {
  const peer = new Peer()

  peer.on('connection', (conn) => {
    console.log('peer connection', { peer, conn })

    conn.on('open', (open) => {
      console.log('conn open', { peer, conn, open })
    })

    conn.on('close', (close) => {
      console.log('conn close', { peer, conn, close })
    })

    conn.on('error', (error) => {
      console.log('conn error', { peer, conn, error })
    })

    conn.on('data', (data) => {
      console.log('conn data', { peer, conn, data })
    })
  })

  peer.on('open', (open) => {
    console.log('peer open', { peer, open })
    if (qrcode) createQrcodeImage(createControlsUrl(project, peer.id))
  })

  peer.on('error', (error) => {
    console.log('peer error', { peer, error })
  })

  peer.on('close', (close) => {
    console.log('peer close', { peer, close })
  })

  return peer
}
