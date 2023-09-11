const uri = new URL(window.location)
uri.pathname = 'googlelogin.html'
uri.hash = ''

const redirect_uri = uri.toString()

export const GOOGLE = {
  redirect_uri,
  "response_type": "token",
  "scope": "https://www.googleapis.com/auth/userinfo.email",
  "client_id": "1031890350456-sl94mlca7btduj30o84bm1buhufm38uj.apps.googleusercontent.com",
  "project_id": "apiv1-398718",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  // "client_secret": "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",
  "redirect_uris": [
    "http://brtmvdl.surge.sh",
    "http://127.0.0.1:8787",
    "http://127.0.0.1:8787/googlelogin.html",
    "https://brtmvdl.surge.sh/googlelogin.html"
  ],
  "javascript_origins": [
    "http://brtmvdl.surge.sh",
    "http://127.0.0.1:8787"
  ]
}
