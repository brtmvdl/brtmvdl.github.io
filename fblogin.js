import { Frontend, nButton } from '@brtmvdl/frontend'
const app = Frontend.fromId('app')

const title = new nH1()
title.setText('Facebook JavaScript SDK')

const getLoginStatusButton = new nButton()
getLoginStatusButton.setText('Get Login Status')
getLoginStatusButton.on('click', () => FB.getLoginStatus(function (response) { console.log({ response }) }))
app.append(getLoginStatusButton)

const loginButton = new nButton()
loginButton.setText('Login')
loginButton.on('click', () => FB.login(function (response) { console.log({ response }) }))
app.append(loginButton)
