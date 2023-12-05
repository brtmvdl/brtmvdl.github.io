import { HTML, nButton, nInputTextGroup } from '@brtmvdl/frontend'

import { API_KEY, DISCOVERY_DOCS, CLIENT_ID } from './config.js'

const listChannels = (forUsername, part = 'statistics') => new Promise((s) =>
  gapi.client.youtube.channels.list({ part, forUsername }).execute(s)
)

const start = () => gapi.client.init({ 'apiKey': API_KEY, 'discoveryDocs': DISCOVERY_DOCS })

const gapiLoad = () => new Promise((s) => gapi.load('client', s))

// //

const app = HTML.fromId('app')

const usernameInput = new nInputTextGroup()
usernameInput.children.label.setText('username')
app.append(usernameInput)

const listChannelsButton = new nButton()
listChannelsButton.setText('list channels')
listChannelsButton.on('click', () => {
  listChannels(usernameInput.children.input.getValue())
    .then(console.log).catch(console.error)
})
app.append(listChannelsButton)

// //

gapiLoad().then(() => start()).then((res) => console.log('res', res))

const loginButton = new nButton()
loginButton.setText('login')
loginButton.on('click', () => gapi.auth2.authorize({ client_id: CLIENT_ID }).execute(console.log))

gapi.auth2.authorize({ scope: 'youtube', client_id: CLIENT_ID }, console.log)
