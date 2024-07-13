# google api javascript client

https://github.com/google/google-api-javascript-client/blob/master/docs/start.md

## authenticate

```js
gapi.load('client:auth2', () => { gapi.auth2.init({ client_id: CLIENT_ID, }) })
```

```js
gapi.auth2.getAuthInstance().signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
```

```js
gapi.client.setApiKey(API_KEY)
```

```js
gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
```

## create broadcast

```js
gapi.client.youtube.liveBroadcasts.insert()
```

## create stream

```js
gapi.client.youtube.liveStreams.insert()
```

## bind broadcast

```js
gapi.client.youtube.liveBroadcasts.bind()
```

## Go Live

```js
navigator.mediaDevices.getUserMedia()
```

## transition to live

```js
gapi.client.youtube.liveBroadcasts.transition()
```
