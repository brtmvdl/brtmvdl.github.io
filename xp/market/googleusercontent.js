const redirect_uri = window.location.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-iklgjv3bl81i9u88ujn1rgh3lnffko7d.apps.googleusercontent.com",
  // "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "https://brtmvdl.github.io/xp/market/",
    "http://localhost:8080/xp/market/",
  ],
  "javascript_origins": [
    "https://brtmvdl.github.io",
    "http://localhost:8080"
  ]
}
