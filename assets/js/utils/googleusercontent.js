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
  "client_id": "387615697147-eefdeuk5mgaadcrnap1c4dl7j1rqn0sg.apps.googleusercontent.com",
  // "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "https://brtmvdl.github.io/pages/login/",
    "https://brtmvdl.github.io/login/",
    "http://localhost:8000/pages/login/",
    "http://localhost:8080/login/"
  ],
  "javascript_origins": [
    "https://brtmvdl.github.io",
    "http://localhost:8080"
  ]
}
