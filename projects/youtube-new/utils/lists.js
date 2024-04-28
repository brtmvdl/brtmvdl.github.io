import { getRoutinesList } from './routines.js'

export const getMethodsList = () => Array.from([
  new ApiRequest('Youtube API'),
  new ApiRequest('Videos:list', 'GET', '/videos', ['part', 'chart', 'id', 'myRating']),
  new ApiRequest('Videos:getRating', 'GET', '/videos/getRating', ['id']),
])
