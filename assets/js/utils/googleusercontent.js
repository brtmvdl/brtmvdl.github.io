
export const scope = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtubepartner',
  'https://www.googleapis.com/auth/youtube.force-ssl',
].join(' ')

export const response_type = 'token'

export const client_id = '387615697147-stog5jmu38kqlagk9jdd2ragvh0vh55q.apps.googleusercontent.com'

export const project_id = 'brtmvdl'

export const auth_uri = 'https://accounts.google.com/o/oauth2/auth'

export const token_uri = 'https://oauth2.googleapis.com/token'

export const auth_provider_x509_cert_url = 'https://www.googleapis.com/oauth2/v1/certs'

export const redirect_uris = [
  'https://brtmvdl.github.io/pages/login/',
  'http://localhost:8080/pages/login/',
]

export const javascript_origins = [
  'https://brtmvdl.github.io',
  'http://localhost:8080',
]

export const redirect_uri = redirect_uris[1]

export const GOOGLE = { scope, response_type, client_id, project_id, auth_uri, token_uri, auth_provider_x509_cert_url, redirect_uri }
