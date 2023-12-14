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
  "client_id": "387615697147-ae61ofb1tnqaks4a9repv15bf54mpqp7.apps.googleusercontent.com",
  "redirect_uris": [
    "https://brtmvdl.surge.sh/login/google.html",
    "http://127.0.0.1:8080/login/google.html",
    "https://brtmvdl.surge.sh",
    "http://127.0.0.1:8080",
  ],
  "javascript_origins": [
    "http://127.0.0.1:8080",
    "https://brtmvdl.surge.sh"
  ]
}
