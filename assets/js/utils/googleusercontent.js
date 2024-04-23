export const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

export const API_KEY = ''

export const response_type = 'token'

export const scope = 'https://www.googleapis.com/auth/spreadsheets'

export const project_id = 'brtmvdl'

export const token_uri = 'https://oauth2.googleapis.com/token'

export const auth_uri = 'https://accounts.google.com/o/oauth2/auth'

export const client_id = ''

export const client_secret = ''

export const auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs'

export const redirect_uris = [
  'https://brtmvdl.github.io/login/',
  'http://localhost:8000/login/'
]

export const javascript_origins = [
  'https://brtmvdl.github.io',
  'http://localhost:8080'
]

export const redirect_uri = redirect_uris.find(uri => uri.indexOf(window.location.hostname) != -1)

export const GOOGLE = { response_type, scope, project_id, token_uri, auth_uri, client_id, auth_provider_x509_cert_url, redirect_uri, javascript_origins }
