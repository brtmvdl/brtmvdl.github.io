import { web } from './googleusercontent.json'

export const api_key = ''

export const scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl'

export const discovery = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'

export const response_type = 'token'

export const client_id = web.client_id

export const project_id = web.project_id

export const auth_uri = web.auth_uri

export const token_uri = web.token_uri

export const auth_provider_x509_cert_url = web.auth_provider_x509_cert_url

export const redirect_uris = web.redirect_uris

export const javascript_origins = web.javascript_origins

export const redirect_uri = redirect_uris.find((url) => (new URL(window.location)).host == (new URL(url)).host)

export const GOOGLE = { scope, response_type, client_id, project_id, auth_uri, token_uri, auth_provider_x509_cert_url, redirect_uri }
