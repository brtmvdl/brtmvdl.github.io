import { HTML, nH2, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    login: new nButton(),
    list_tweets: new nButton(),
    make_tweet: new nButton(),
    followers: new nButton(),
    following: new nButton(),
    follow: new nButton(),
    unfollow: new nButton(),
    responses: new HTML(),
  }

  onCreate() {
    this.append(this.getTitle())
    this.append(this.getLoginButton())
    this.append(this.getListTweetsButton())
    this.append(this.getMakeTweetButton())
    this.append(this.getFollowersButton())
    this.append(this.geFollowingButton())
    this.append(this.getFollowButton())
    this.append(this.getUnfollowButton())
    this.append(this.getResponses())
  }

  getTitle() {
    const title = new nH2()
    return title.setText('Twitter App')
  }

  getLoginButton() {
    this.children.login.setText('login')
    this.children.login.on('click', () => this.onLoginButtonClick())
    return this.children.login
  }

  onLoginButtonClick() {
    console.log('onLoginButtonClick')
  }

  getListTweetsButton() {
    this.children.list_tweets.setText('list tweets')
    this.children.list_tweets.on('click', () => this.onListTweetsButton())
    return this.children.list_tweets
  }

  onListTweetsButton() {
    console.log('onListTweetsButton')
  }

  getMakeTweetButton() {
    this.children.make_tweet.setText('make tweet')
    this.children.make_tweet.on('click', () => this.onMakeTweetButton())
    return this.children.make_tweet
  }

  onMakeTweetButton() {
    console.log('onMakeTweetButton')
  }

  getFollowersButton() {
    this.children.followers.setText('followers')
    this.children.followers.on('click', () => this.onFollowersButton())
    return this.children.followers
  }

  onFollowersButton() {
    console.log('onFollowersButton')
  }

  geFollowingButton() {
    this.children.following.setText('following')
    this.children.following.on('click', () => this.onFollowingButton())
    return this.children.following
  }

  onFollowingButton() {
    console.log('onFollowingButton')
  }

  getFollowButton() {
    this.children.follow.setText('follow')
    this.children.follow.on('click', () => this.onFollowButton())
    return this.children.follow
  }

  onFollowButton() {
    console.log('onFollowButton')
  }

  getUnfollowButton() {
    this.children.unfollow.setText('unfollow')
    this.children.unfollow.on('click', () => this.onUnfollowButton())
    return this.children.unfollow
  }

  onUnfollowButton() {
    console.log('onUnfollowButton')
  }

  getResponses() {
    return this.children.responses
  }
}
