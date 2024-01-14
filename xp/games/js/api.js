import Ajax from './ajax.js'

import Logger from './logger.js'

const API = {
  log: new Logger('API'),
  listGames: () => {
    API.log.info('listGames', {})
    return Ajax.get(['/api/v1/games/list/index.json'])
  },
}

export default API
