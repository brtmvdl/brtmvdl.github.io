const redirect_uri = window.location.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-3nnghavlpeocc53s0cbktfda7omq1h81.apps.googleusercontent.com",
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
