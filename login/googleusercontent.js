const url = new URL(window.location)
url.pathname = "login/google.html"
url.hash = ''

const redirect_uri = url.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/userinfo.email",
  "project_id": "apiv1-398721",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "client_id": "635151893278-a7hdtv7ipfdvhpljhbvids5cnc70ebrv.apps.googleusercontent.com",
  "redirect_uris": [
    "https://brtmvdl.surge.sh/login/google.html",
    "http://127.0.0.1:8080/login/google.html",
    "http://brtmvdl.surge.sh",
    "http://127.0.0.1:8080",
  ],
  "javascript_origins": [
    "http://127.0.0.1:8080",
    "https://brtmvdl.surge.sh"
  ]
}
