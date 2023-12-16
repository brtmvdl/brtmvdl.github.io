import { HTML, nButton } from '@brtmvdl/frontend'

import * as API from './api.js'

const app = HTML.fromId('app')

const title = new HTML()
title.setText('Share on LinkedIn API')
app.append(title)

const button = new nButton()
app.append(button.setText('userinfo'))
button.on('click', () => API.userinfo().then(console.log).catch(console.error))
