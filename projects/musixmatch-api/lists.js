import { RequestModel } from '../../assets/js/models/request.model.js'

const url = (path = '') => `http://api.musixmatch.com/ws/1.1/${path}`


export const getMethodsList = () => Array.from([
  new RequestModel('chart.artists.get', url('chart.artists.get'), [], []),
  new RequestModel('chart.tracks.get', url('chart.tracks.get'), [], []),
  new RequestModel('track.search', url('track.search'), [], []),
  new RequestModel('track.get', url('track.get'), [], []),
  new RequestModel('track.lyrics.get', url('track.lyrics.get'), [], []),
  new RequestModel('track.lyrics.post', url('track.lyrics.post'), [], []),
  new RequestModel('track.lyrics.mood.get', url('track.lyrics.mood.get'), [], []),
  new RequestModel('track.snippet.get', url('track.snippet.get'), [], []),
  new RequestModel('track.subtitle.get', url('track.subtitle.get'), [], []),
  new RequestModel('track.richsync.get', url('track.richsync.get'), [], []),
  new RequestModel('track.lyrics.translation.get', url('track.lyrics.translation.get'), [], []),
  new RequestModel('track.subtitle.translation.get', url('track.subtitle.translation.get'), [], []),
  new RequestModel('music.genres.get', url('music.genres.get'), [], []),
  new RequestModel('matcher.lyrics.get', url('matcher.lyrics.get'), [], []),
  new RequestModel('matcher.track.get', url('matcher.track.get'), [], []),
  new RequestModel('matcher.subtitle.get', url('matcher.subtitle.get'), [], []),
  new RequestModel('artist.get', url('artist.get'), [], []),
  new RequestModel('artist.search', url('artist.search'), [], []),
  new RequestModel('artist.albums.get', url('artist.albums.get'), [], []),
  new RequestModel('artist.related.get', url('artist.related.get'), [], []),
  new RequestModel('album.get', url('album.get'), [], []),
  new RequestModel('album.tracks.get', url('album.tracks.get'), [], []),
  new RequestModel('tracking.url.get', url('tracking.url.get'), [], []),
  new RequestModel('catalogue.dump.get', url('catalogue.dump.get'), [], []),
  new RequestModel('work.post', url('work.post'), [], []),
  new RequestModel('work.validity.post', url('work.validity.post'), [], []),
])
