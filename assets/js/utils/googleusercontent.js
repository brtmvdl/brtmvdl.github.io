
export const api_key = 'AIzaSyAxNbjWoeI9au0TOecALQEv2BPCx7kpIb0'

export const scope = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtubepartner',
  'https://www.googleapis.com/auth/youtube.force-ssl',
].join(' ')

export const discovery = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'

export const response_type = 'token'

export const client_id = '387615697147-ioro8q5q9cht4mfeon55jh9aom5hve94.apps.googleusercontent.com'

export const project_id = 'brtmvdl'

export const auth_uri = 'https://accounts.google.com/o/oauth2/auth'

export const token_uri = 'https://oauth2.googleapis.com/token'

export const auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs'

export const redirect_uris = [
  'http://localhost:8080/pages/login/',
  'https://brtmvdl.github.io/pages/login/',
  'http://localhost:8080/projects/screen-capture-api/index.html',
  'https://brtmvdl.github.io/projects/screen-capture-api/index.html',
]

export const javascript_origins = [
  'https://brtmvdl.github.io',
  'http://localhost:8080',
]

export const redirect_uri = redirect_uris.find((url) => (new URL(window.location)).host == (new URL(url)).host)

export const GOOGLE = { scope, response_type, client_id, project_id, auth_uri, token_uri, auth_provider_x509_cert_url, redirect_uri }
