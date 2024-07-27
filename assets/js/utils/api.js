import * as GOOGLE from './googleusercontent.js'

import { request } from './ajax.js'

const url = (url, query = {}) => {
  const nUrl = new URL(url)
  Object.keys(query).map((q) => nUrl.searchParams.set(q, query[q]))
  return nUrl.toString()
}

export const urls = {
  youtube: (pathname, params = {}) => url('https://www.googleapis.com/youtube/v3/' + pathname, params)
}

export const rest = {
  musixmatch: {
    v1: {
      call: (method, path, params = {}) => request(method, url('https://api.musixmatch.com/ws/1.1/' + path, params), {}, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Request-Headers': '*' })
    }
  },
  newsapi: {
    v2: {
      call: (path, params = {}) => request('GET', url('https://newsapi.org/v2/' + path, params)),
    }
  },
  youtube: {
    v3: {
      liveBroadcasts: {
        insert: (params = {}, body = {}) => request('POST', urls.youtube('liveBroadcasts', params), body, { Authorization: `Bearer ${GOOGLE.api_key}` }),
      }
    }
  }
}
