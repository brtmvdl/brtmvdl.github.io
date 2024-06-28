import { EndpointModel } from '../../../assets/js/models/endpoint.model.js'

export const getEndpointsList = () => Array.from([
  new EndpointModel('Youtube API'),
  new EndpointModel('Videos: list', 'GET', 'https://www.googleapis.com/youtube/v3/videos', [], ['part', 'chart']),
]).map((endpoint, ix) => { if (ix != 0) endpoint.query.push('key'); return endpoint })
