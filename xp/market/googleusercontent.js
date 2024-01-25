const redirect_uri = window.location.toString()

export const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"

export const API_KEY = ""

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/drive",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-bukeb7o5pi8b3932fpq3nfaer70a51j5.apps.googleusercontent.com",
  "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "http://localhost:8080/xp/market/"
  ],
  "javascript_origins": [
    "http://localhost:8080"
  ]
}
