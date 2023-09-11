import { Frontend, nButton, nH1 } from '@brtmvdl/frontend'

const app = Frontend.fromId('app')

const title = new nH1()
title.setText('Google OAuth 2.0 Login')
app.append(title)

const getLoginStatusButton = new nButton()
getLoginStatusButton.setText('Get Login Status')
app.append(getLoginStatusButton)

const loginButton = new nButton()
loginButton.setText('Login')
app.append(loginButton)
