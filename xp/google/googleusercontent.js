const url = new URL(window.location)
url.pathname = "login/google.html"
url.hash = ""

const redirect_uri = url.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "project_id": "brtmvdl",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "387615697147-uqui8oke9g48nqlqnmov7onslgrucobd.apps.googleusercontent.com",
  "client_secret": "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",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
}
