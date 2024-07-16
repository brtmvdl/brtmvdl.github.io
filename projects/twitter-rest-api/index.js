import { HTML, nInputTextGroup, nButton } from '../../assets/js/libs/frontend/index.js'

import { FormComponent } from '../../assets/js/components/form.component.js'

// https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code

export class Page extends HTML {
  children = {
    ResponseType: new nInputTextGroup(),
    ClientId: new nInputTextGroup(),
    RedirectUri: new nInputTextGroup(),
    Scope: new nInputTextGroup(),
    State: new nInputTextGroup(),
    CodeChallenge: new nInputTextGroup(),
    CodeChallengeMethod: new nInputTextGroup(),
    SubmitButton: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getForm())
  }

  getTitle() {
    const title = new HTML()
    title.setText('Twitter')
    return title
  }

  getForm() {
    const form = new FormComponent()
    form.setAction('https://twitter.com/i/oauth2/authorize')
    form.append(this.getResponseType())
    form.append(this.getClientId())
    form.append(this.getRedirectUri())
    form.append(this.getScope())
    form.append(this.getState())
    form.append(this.getCodeChallenge())
    form.append(this.getCodeChallengeMethod())
    form.append(this.getSubmitButton())
    return form
  }

  getResponseType() {
    this.children.ResponseType.children.label.setText('Response Type')
    this.children.ResponseType.children.input.setValue('code')
    return this.children.ResponseType
  }

  getClientId() {
    this.children.ClientId.children.label.setText('Client Id')
    this.children.ClientId.children.input.setValue('this.children.ClientId')
    return this.children.ClientId
  }

  getRedirectUri() {
    this.children.RedirectUri.children.label.setText('Redirect Uri')
    this.children.RedirectUri.children.input.setValue(window.location.toString())
    return this.children.RedirectUri
  }

  getScope() {
    this.children.Scope.children.label.setText('Scope')
    this.children.Scope.children.input.setValue('tweet.read users.read offline.access')
    return this.children.Scope
  }

  getState() {
    this.children.State.children.label.setText('State')
    this.children.State.children.input.setValue('state')
    return this.children.State
  }

  getCodeChallenge() {
    this.children.CodeChallenge.children.label.setText('Code Challenge')
    this.children.CodeChallenge.children.input.setValue('challenge')
    return this.children.CodeChallenge
  }

  getCodeChallengeMethod() {
    this.children.CodeChallengeMethod.children.label.setText('Code Challenge Method')
    this.children.CodeChallengeMethod.children.input.setValue('plain')
    return this.children.CodeChallengeMethod
  }

  getSubmitButton() {
    this.children.SubmitButton.setText('Submit')
    return this.children.SubmitButton
  }
}
