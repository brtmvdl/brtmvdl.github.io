import { Peer } from '../../../assets/js/libs/peerjs/index.js'
import { qrcode } from './functions.js'

const image = document.createElement('img')

class MyPeer extends Peer {
  removeQRCode() {
    document.body.removeChild(image)
  }
}

export const getPeerConnection = () => { }

export const getControlsUrl = (project, id) => {
  const url = new URL(window.location)
  url.pathname = `/projects/${project}/controls.html?id=${id}`
  url.search = ''
  return (url.toString()).replace('%3F', '?')
}

export const createControlsLink = (project, id) => {
  const _url = getControlsUrl(project, id)
  image.src = qrcode(_url)
  const link = document.createElement('a')
  link.style.position = 'fixed'
  link.style.bottom = '1rem'
  link.style.left = '1rem'
  link.target = '_blank'
  link.href = _url
  link.append(image)
  document.body.append(link)
}

export const createNewPeer = (project, qrcode = false) => {
  const peer = new MyPeer()

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
    if (qrcode) createControlsLink(project, peer.id)
  })

  peer.on('error', (error) => {
    console.log('peer error', { peer, error })
  })

  peer.on('close', (close) => {
    console.log('peer close', { peer, close })
  })

  return peer
}
