import { RequestModel } from '../../../assets/js/models/request.model.js'

export const getRequestList = () => Array.from([
  new RequestModel('Youtube API'),
  new RequestModel('Videos: list', 'GET', '/youtube/v3/videos', [], ['part', 'chart']),
  new RequestModel('Videos: insert', 'POST', '/upload/youtube/v3/videos'),
])
