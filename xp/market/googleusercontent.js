const redirect_uri = window.location.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-ggec4nkejph9i6ciabt1hbuaoee6jmtq.apps.googleusercontent.com",
  // "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "redirect_uris": [
    "http://localhost:8080/xp/market/"
  ],
  "javascript_origins": [
    "http://localhost:8080"
  ]
}
