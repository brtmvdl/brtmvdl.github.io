// 

const url = (url, query = {}) => {
  const nUrl = new URL(url)
  Object.keys(query).map((q) => nUrl.searchParams.set(q, query[q]))
  return nUrl.toString()
}

export const rest = {
  musixmatch: {
    v1: {
      call: (method, path, params = {}) => fetch(url('https://api.musixmatch.com/ws/1.1/' + path, params), { method, mode: 'no-cors' }).then((res) => res.json())
    }
  }
}
