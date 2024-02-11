import { io } from 'socket.io-client'
import { HTML } from '@brtmvdl/frontend'
import { buttons } from './constants.js'

const socket = io('http://0.0.0.0:8000')

socket.on('connection', (socket) => console.log('connection', Date.now(), socket.id))

const app = HTML.fromId('app')

const buttonsHTML = new HTML()
app.append(buttonsHTML)

buttons.map(({ text }) => {
  const button = new HTML()
  button.setText(text)
  button.setStyle('background-color', '#000000')
  button.setStyle('color', '#ffffff')
  button.setStyle('padding', '1rem')
  button.setStyle('margin', '1rem')
  button.on('click', () => socket.emit('message', { type: 'button_click', payload: { text } }))
  buttonsHTML.append(button)
})
