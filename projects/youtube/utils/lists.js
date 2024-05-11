import { RequestModel } from '../models/request.model.js'

export const getRequestList = () => Array.from([
  new RequestModel('Youtube API', null, '/'),
  new RequestModel('Videos: list', 'GET', '/youtube/v3/videos', { query: ['part', 'chart'] }),
  new RequestModel('Videos: insert', 'POST', '/upload/youtube/v3/videos'),
])
