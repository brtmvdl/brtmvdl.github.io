import { createNewPeer } from '../../assets/js/utils/peer.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'

const app = document.getElementById('app')

const state = {
  id: getURLSearchParam('id'),
  conn: null,
}

const peer = createNewPeer('snake')

peer.on('open', () => state.conn = peer.connect(state.id))

const keys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']

const onKeyUp = (key) => { if (keys.join(' ').includes(key)) state.conn?.send(key) }

window.addEventListener('keyup', ({ key }) => onKeyUp(key))

Array.from(keys).map((key) => {
  const btn = document.createElement('button')

  btn.innerText = key

  btn.onclick = function () { state.conn.send(key) }

  app.appendChild(btn)
})
