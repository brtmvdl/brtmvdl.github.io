const redirect_uri = window.location.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-hnne4d033cuc34725botc4sui7f6f454.apps.googleusercontent.com",
  // "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "http://localhost:8080/xp/market/"
  ],
  "javascript_origins": [
    "http://localhost:8080"
  ]
}
