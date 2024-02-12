const redirect_uri = window.location.toString()

export const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"

export const API_KEY = ""

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-r4t617erjqspc36a7s8tvudj25ni87uv.apps.googleusercontent.com",
  // "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "https://brtmvdl.github.io/xp/google/",
    "http://localhost:8080/xp/google/"
  ],
  "javascript_origins": [
    "https://brtmvdl.github.io",
    "http://localhost:8080"
  ]
} 
