import { API_KEY } from './config.js'

const initConfig = {
  'apiKey': API_KEY,
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
}

const listChannels = () =>
  gapi.client.youtube.channels
    .list({ part: 'statistics', forUsername: 'brtmvdl' })
    .execute((res) => console.log('youtube.channels', res))

const start = () => gapi.client.init(initConfig).then(listChannels)

gapi.load('client', start)
