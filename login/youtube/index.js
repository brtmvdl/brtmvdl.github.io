import { HTML, nButton } from '@brtmvdl/frontend'

import * as GoogleUserContent from './googleusercontent.js'

const scope = 'https://www.googleapis.com/auth/youtube.force-ssl'

const client_id = GoogleUserContent.default.web.client_id

const client_secret = GoogleUserContent.default.web.client_secret

const scheduledStartTime = ''

const title = 'Pomodoro test 1'

const privacyStatus = ''

function authenticate() {
  return gapi.auth2.getAuthInstance().signIn({ scope })
    .then(() => console.log('Sign-in successful'))
    .catch(err => console.error('Error signing in', err))
}

function loadClient() {
  gapi.client.setApiKey(client_secret)

  return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(() => console.log('GAPI client loaded for API'))
    .catch((err) => console.error('Error loading GAPI client for API', err))
}

function execute() {
  return gapi.client.youtube.liveBroadcasts.insert({
    'resource': {
      'contentDetails': { },
      'snippet': { title, scheduledStartTime, privacyStatus }
    }
  })
    .then((res) => console.log('Response', res))
    .catch((err) => console.error('Execute error', err))
}

gapi.load('client:auth2', () => gapi.auth2.init({ client_id }))

//

const authenticateButton = new nButton()
authenticateButton.setText('authorize and load')
authenticateButton.on('click', () => authenticate().then(loadClient))

const executeButton = new nButton()
executeButton.setText('execute')
executeButton.on('click', () => execute())
