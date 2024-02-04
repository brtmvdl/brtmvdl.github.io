const redirect_uri = window.location.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/youtube.upload",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-gfff17mn81lfjb6pplvtjgell6q7c9k7.apps.googleusercontent.com",
  "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "https://brtmvdl.github.io/xp/youtube/",
    "http://localhost"
  ],
  "javascript_origins": [
    "https://brtmvdl.github.io",
    "http://localhost"
  ]
}
