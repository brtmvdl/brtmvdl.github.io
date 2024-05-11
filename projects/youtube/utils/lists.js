import { RequestModel } from '../models/request.model.js'

export const getMethodsList = () => Array.from([
  new RequestModel('Youtube API', null, '/'),
  new RequestModel('Videos: list ', 'GET', '/videos', { query: ['id'] }),
  new RequestModel('Videos: insert', 'POST', '/videos'),
])
