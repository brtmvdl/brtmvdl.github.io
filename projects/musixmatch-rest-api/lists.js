import { RequestModel } from '../../assets/js/models/request.model.js'

const url = (path) => path

export const getRequestModelList = () => Array.from([
  new RequestModel('Musixmatch'),
  new RequestModel('chart.artists.get', 'GET', url('chart.artists.get'), [], ['country', 'page', 'page_size', 'format'], []),
  new RequestModel('chart.tracks.get', 'GET', url('chart.tracks.get'), [], ['country', 'page', 'page_size', 'chart_name', 'f_has_lyrics'], []),
  new RequestModel('track.search (q_track)', 'GET', url('track.search'), [], ['q_track', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.search (q_artist)', 'GET', url('track.search'), [], ['q_artist', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.search (q_lyrics)', 'GET', url('track.search'), [], ['q_lyrics', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.search (q_track_artist)', 'GET', url('track.search'), [], ['q_track_artist', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.search (q_writer)', 'GET', url('track.search'), [], ['q_writer', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.search (q)', 'GET', url('track.search'), [], ['q', 'quorum_factor', 'page', 'page_size'], []),
  new RequestModel('track.get', 'GET', url('track.get'), [], ['commontrack_id', 'track_isrc'], []),
  new RequestModel('track.lyrics.get', 'GET', url('track.lyrics.get'), [], ['track_id', 'commontrack_id'], []),
  new RequestModel('track.lyrics.mood.get', 'GET', url('track.lyrics.mood.get'), [], ['commontrack_id', 'track_isrc'], []),
  new RequestModel('track.snippet.get', 'GET', url('track.snippet.get'), [], ['track_id'], []),
  new RequestModel('track.subtitle.get', 'GET', url('track.subtitle.get'), [], ['commontrack_id', 'subtitle_format', 'f_subtitle_length', 'f_subtitle_length_max_deviation'], []),
  new RequestModel('track.richsync.get', 'GET', url('track.richsync.get'), [], ['track_id', 'f_richsync_length', 'f_richsync_length_max_deviation'], []),
  new RequestModel('track.lyrics.translation.get', 'GET', url('track.lyrics.translation.get'), [], ['selected_language', 'min_completed', 'commontrack_id', 'track_id', 'track_isrc', 'track_mbid'], []),
  new RequestModel('track.subtitle.translation.get', 'GET', url('track.subtitle.translation.get'), [], ['selected_language', 'min_completed', 'commontrack_id', 'track_isrc', 'f_subtitle_length', 'f_subtitle_length_max_deviation'], []),
  new RequestModel('music.genres.get', 'GET', url('music.genres.get'), [], ['q_track', 'q_artist', 'track_isrc'], []),
  new RequestModel('matcher.lyrics.get', 'GET', url('matcher.lyrics.get'), [], ['q_track', 'q_artist', 'track_isrc'], []),
  new RequestModel('matcher.track.get', 'GET', url('matcher.track.get'), [], ['q_track', 'q_artist', 'q_album'], []),
  new RequestModel('matcher.subtitle.get', 'GET', url('matcher.subtitle.get'), [], ['q_track', 'q_artist', 'f_subtitle_length', 'f_subtitle_length_max_deviation', 'track_isrc'], []),
  new RequestModel('artist.get', 'GET', url('artist.get'), [], ['artist_id', 'artist_mbid'], []),
  new RequestModel('artist.search', 'GET', url('artist.search'), [], ['q_artist', 'f_artist_id', 'f_artist_mbid', 'page', 'page_size', 'formatDecide'], []),
  new RequestModel('artist.albums.get', 'GET', url('artist.albums.get'), [], ['artist_id', 'artist_mbid', 'g_album_name', 'page', 'page_size'], []),
  new RequestModel('artist.related.get', 'GET', url('artist.related.get'), [], ['artist_id', 'artist_mbid', 'page', 'page_size', 'format'], []),
  new RequestModel('album.get', 'GET', url('album.get'), [], ['album_id'], []),
  new RequestModel('album.tracks.get', 'GET', url('album.tracks.get'), [], ['album_id', 'album_mbid', 'f_has_lyrics', 'page', 'page_size'], []),
  new RequestModel('tracking.url.get', 'GET', url('tracking.url.get'), [], ['domain', 'format'], []),
  new RequestModel('catalogue.dump.get', 'GET', url('catalogue.dump.get'), [], [], []),
]).map((r, ix) => { if (ix != 0) r.query.push('apikey'); return r })

export const getMethod = (method) => getMethodsList().find(({ name }) => name == method)

export const getMethodQuery = (method) => getMethod(method)?.query
