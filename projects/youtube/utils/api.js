import { MessageModel } from '../models/messages.model.js'

export const sendMessage = (message = new MessageModel()) => {
  const { query, headers, body, request } = message
  const { method, pathname } = request
  const searchParams = new URLSearchParams(query)
  return fetch(`https://www.googleapis.com${pathname}?${searchParams.toString()}`, { method, query, headers, body }).then((res) => res.json())
    .catch((err) => console.error(err))
}
