import { HTML, nButton, nInputTextGroup } from '@brtmvdl/frontend'

import { API_KEY, CLIENT_ID } from './config.js'

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
    .then((res) => console.log('Sign-in successful', res))
    .catch((err) => console.error('Error signing in', err))
}

function loadClient() {
  gapi.client.setApiKey(API_KEY)

  return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then((res) => console.log('GAPI client loaded for API', res))
    .catch((err) => console.error('Error loading GAPI client for API', err))
}

function execute() {
  const broadcastId = broadcastIdInput.children.input.getValue()

  if (!broadcastId) return console.error('no broadcast id')

  return gapi.client.youtube.liveBroadcasts.bind({
    id: broadcastId,
    part: ['id', 'snippet', 'contentDetails', 'status']
  })
    .then((res) => console.log('Response', res),)
    .catch((err) => console.error('Execute error', err))
}

const load = () => gapi.load('client:auth2', () => gapi.auth2.init({ client_id: CLIENT_ID }))

// // //

const app = HTML.fromId('app')

const broadcastIdInput = new nInputTextGroup()
broadcastIdInput.children.input.setText('BROADCAST ID')
app.append(broadcastIdInput)

const [] = [
  { title: 'load', fn: load },
  { title: 'auth2 getAuthInstance', fn: authenticate },
  { title: 'client load', fn: loadClient },
  { title: 'liveBroadcasts bind', fn: execute },
].map(({ title, fn = (() => { }) } = {}) => {
  const button = new nButton()
  button.setText(title)
  button.on('click', () => fn())
  app.append(button)
})
